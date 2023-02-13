import { ArrowRightShort } from '@styled-icons/bootstrap';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

import { SERVER_ROOT_URL } from '../constants/url';
import { useVotingContract } from '../hooks/useContract';
import { useCountdown } from '../hooks/useCountdown';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { IElection } from '../types';
import { calculateGasMargin } from '../utils';
import Button from './styled/Button';
import Flex from './styled/Flex';

const DynamicVoter = dynamic(() => import('./Voters'), {
    ssr: false,
});
const CardWrapper = styled.div`
    width: 18rem;
    height: 6.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors.gray};
    box-shadow: 1px 2px 3px 4px #eeeeee;
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
    &:hover {
        transform: scale(1.02);
    }
`;

const StyledArrow = styled(ArrowRightShort)`
    width: 1.5rem;
    height: 1.2rem;
    color: ${(props) => props.theme.colors.green};
`;

const VoteCount = styled.span`
    font-size: 0.7rem;
`;

const CardTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
`;

const CountDown = styled.span`
    font-size: 0.7rem;
    color: ${(props) => props.theme.colors.green};
    white-space: nowrap;
`;

const ActivateButton = styled(Button)`
    display: block;
    margin-left: auto;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.green};
    padding: 0.3rem 1.5rem;
`;

const ElectionCard: FC<{ data: IElection; isAdmin?: boolean }> = ({ data, isAdmin }) => {
    const router = useRouter();
    const isAdminFromHook = useIsAdmin();

    const { id, title, candatesId, startingTime, endingTime, durationInseconds, isActivated, candidatesVotes } = data;
    const totalVote = candidatesVotes.reduce((total, current) => total + current, 0);
    const votingContract = useVotingContract(true);

    const [merkleRoot, setMerkleRoot] = useState<string | null>(null);

    const getMerkleRoot = useCallback(async () => {
        try {
            const rootResponse = await fetch(`${SERVER_ROOT_URL}/root/${id}`);
            const rootData = await rootResponse.json();
            if (!rootData.success) {
                return console.error(rootData.message);
            }
            setMerkleRoot(rootData.root);
        } catch (error) {
            console.error('error getting root: ', error);
        }
    }, [id]);

    useEffect(() => {
        getMerkleRoot();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activate = useCallback(async () => {
        try {
            if (id === undefined || !merkleRoot)
                throw new Error('no merkle root found. Please wait while it is being fetched!');
            if (!votingContract) throw new Error('Voting contract not gotten!');
            if (!isAdminFromHook) throw new Error("You are not the admin, you should'nt be here!");

            const estimatedGas = await votingContract.estimateGas.activateElection(id, merkleRoot);

            const activateElectionTransaction = await votingContract.activateElection(id, merkleRoot, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
            await activateElectionTransaction.wait();

            toast(`Election with ID: ${id} succcessfuly activated`, {
                duration: 4000,
                position: 'top-center',
                style: { backgroundColor: '#a3f26f' },
                icon: '👏',
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });

            router.reload();
        } catch (error: any) {
            toast(
                `An Error occured: ${
                    error.message ? String(error.message).substring(0, 150) : 'please check the console'
                }`,
                {
                    duration: 4000,
                    position: 'top-center',
                    style: { backgroundColor: '#f19c9c' },
                    icon: '❌',
                    iconTheme: {
                        primary: '#000',
                        secondary: '#fff',
                    },
                    ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                }
            );
            console.error('error activating election: ', error);
        }
    }, [id, isAdminFromHook, merkleRoot, router, votingContract]);

    const [days, hours, minutes, seconds] = useCountdown(moment(endingTime).valueOf());

    const timeElapsed = days + hours + minutes + seconds <= 0;

    const notYetStarted = new Date().getTime() < startingTime.valueOf();

    return (
        <CardWrapper onClick={() => isActivated && router.push(`/election/${id}`)}>
            <Flex justifyContent="space-between" alignItems="flex-start">
                <VoteCount>{`${totalVote} votes`}</VoteCount>
                {isActivated && <StyledArrow />}
            </Flex>
            <CardTitle>{title}</CardTitle>
            <Flex alignItems="flex-end">
                {!timeElapsed ? (
                    isAdmin && !isActivated ? (
                        <ActivateButton type="button" onClick={activate}>
                            Activate
                        </ActivateButton>
                    ) : notYetStarted ? (
                        <Flex width="100%" margin="1rem 0 0 0">
                            <CountDown>Starts by: {startingTime.format('YYYY-MM-DD HH:mm')}</CountDown>
                        </Flex>
                    ) : (
                        <Flex width="100%" justifyContent="space-between" margin="1rem 0 0 0">
                            {/* <DynamicVoter /> */}
                            <CountDown>Voting currently ongoing</CountDown>
                            <CountDown>Ends in {`${hours}:${minutes}:${seconds}`}</CountDown>
                        </Flex>
                    )
                ) : (
                    <CountDown>Ended</CountDown>
                )}
            </Flex>
        </CardWrapper>
    );
};

export default ElectionCard;
