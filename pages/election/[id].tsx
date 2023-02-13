// import { defaultAbiCoder } from '@ethersproject/abi';
// import { keccak256 } from '@ethersproject/keccak256';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

import CandidateCard from '../../components/CandidateCard';
import ElectionStats from '../../components/ElectionStats';
import DefaultLayout from '../../components/layouts/defaultLayout';
import Button from '../../components/styled/Button';
import { CardGrid } from '../../components/styled/CardGrid';
import { PaddedContainer } from '../../components/styled/PaddedContainer';
import { SERVER_ROOT_URL } from '../../constants/url';
import { useCompletionPercent } from '../../hooks/useCompletionPercent';
import { useVotingContract } from '../../hooks/useContract';
import useGetElections from '../../hooks/useElections';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { usePolls } from '../../hooks/usePolls';
import useSignature from '../../hooks/useSignature';
import { useVoted } from '../../hooks/useVoted';
import { IElection } from '../../types';
import { addHours, calculateGasMargin } from '../../utils';

const GridContainer = styled(CardGrid)`
    margin-top: 3rem;
    grid-row-gap: 2rem;
`;

const SubmitVoteButton = styled(Button)`
    display: block;
    margin-top: 2rem;
    &:disabled {
        pointer-events: none;
        background-color: #ccc;
    }
`;
const Election = () => {
    const router = useRouter();
    const { account, provider } = useWeb3React();
    const isAdmin = useIsAdmin();
    const theme = useTheme();
    const [election, setElection] = useState<undefined | IElection>();
    const [canVote, setCanVote] = useState(false);
    const [voterData, seVoterData] = useState<undefined | { hash: string; proofs: string[] }>();
    const { sign } = useSignature({ provider, account });
    const votingContract = useVotingContract(true);

    const percent = useCompletionPercent(
        election?.startingTime.valueOf() || new Date().getTime(),
        election?.endingTime.valueOf() || addHours(new Date(), 1).getTime()
    );
    const { id } = router.query;
    const voted = useVoted(account, id);
    const poll = usePolls(id);

    const { getElection } = useGetElections();
    const getVoteEligibility = useCallback(async () => {
        if (!account) {
            setCanVote(false);
            seVoterData(undefined);
            return;
        }
        try {
            const proofResponse = await fetch(`${SERVER_ROOT_URL}/voters/${id}/${account}`);
            const proofData = await proofResponse.json();
            if (!proofData.success) {
                return console.error(proofData.message);
            }
            seVoterData(proofData.data);
            setCanVote(true);
            console.log({ id, proofData });
        } catch (error) {
            console.log('error getting proof: ', error);
        }
    }, [account, id]);

    useEffect(() => {
        (async () => {
            const data = await getElection(id as string);

            setElection(data);
            getVoteEligibility();
        })();
    }, [getElection, getVoteEligibility, id]);

    const onVote = useCallback(
        async (_candidateId: number) => {
            try {
                if (!account || !voterData || !canVote) throw new Error('cannot vote in this election!');
                const messagehash = ethers.utils.solidityKeccak256(
                    ['address', 'uint256', 'uint256'],
                    [account, Number(id), _candidateId]
                );
                const signature = await sign(ethers.utils.arrayify(messagehash));

                const sumitVoteResponse = await fetch(`${SERVER_ROOT_URL}/poll/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([
                        {
                            signature,
                            candidateId: _candidateId,
                            voter: account,
                            voterHash: voterData.hash,
                            proof: voterData.proofs,
                        },
                    ]),
                });
                const sumitVoteData = await sumitVoteResponse.json();
                if (!sumitVoteData.success) throw new Error(sumitVoteData.message);
                toast(`You have successFully casted your vote for the candidate with the ID: ${_candidateId}`, {
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
                console.log('error casting vote: ', error);
            }
        },
        [account, canVote, id, sign, voterData]
    );

    const submitVote = useCallback(async () => {
        try {
            if (id === undefined) throw new Error('No id');
            if (!isAdmin) throw new Error('You are not the admin!');
            if (!votingContract) throw new Error('no contract instance found');
            if (poll.length === 0) throw new Error('no votes to submit');
            const estimatedGas = await votingContract.estimateGas.submitVotes(poll, id);
            await votingContract.submitVotes(poll, id, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
            toast(`Votes successfully submitted`, {
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
            console.error('error submitting votes: ', error);
        }
    }, [id, isAdmin, poll, votingContract]);

    return (
        <>
            <Head>
                <title>Elections - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PaddedContainer>
                    {election && (
                        <>
                            <ElectionStats
                                title={election.title}
                                total_candidate={election.candatesId.length}
                                total_voters={election.totalVotes}
                                percentage_completed={percent}
                                ending_time={moment(election.endingTime)}
                                starting_time={moment(election.startingTime)}
                            />
                            <GridContainer>
                                {election.candatesId.map((id) => (
                                    <CandidateCard
                                        key={id}
                                        cadidate_vote={election.candidatesVotes[id]}
                                        candidate_id={id}
                                        candidate_name={election.candidateNames[id]}
                                        user_can_vote={canVote}
                                        onVoteClick={onVote}
                                        percentage_completed={percent}
                                        voted={voted}
                                    />
                                ))}
                            </GridContainer>
                            {isAdmin && (
                                <SubmitVoteButton
                                    bgColor={theme.colors.lightGreen}
                                    color={theme.colors.black}
                                    disabled={poll.length === 0 || !isAdmin || percent === 100}
                                    onClick={submitVote}
                                >
                                    Submit Votes ({poll.length})
                                </SubmitVoteButton>
                            )}
                        </>
                    )}
                </PaddedContainer>
            </main>
        </>
    );
};
Election.Layout = DefaultLayout;
export default Election;
