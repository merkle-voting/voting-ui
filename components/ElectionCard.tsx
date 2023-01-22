import { ArrowRightShort } from '@styled-icons/bootstrap';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Flex from './styled/Flex';

const DynamicVoter = dynamic(() => import('./Voters'), {
    ssr: false,
});
const CardWrapper = styled.div`
    width: 15rem;
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
`;

const VoteCount = styled.span`
    font-size: 0.7rem;
`;

const CardTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
`;

const CountDown = styled.span`
    font-size: 0.8rem;
`;

const ElectionCard = () => {
    return (
        <CardWrapper>
            <Flex justifyContent="space-between" alignItems="flex-start">
                <VoteCount>7124 votes</VoteCount>
                <StyledArrow />
            </Flex>
            <CardTitle>Nigeria general election</CardTitle>
            <Flex>
                <DynamicVoter />
            </Flex>
            <CountDown>Ends in 00:02:32</CountDown>
        </CardWrapper>
    );
};

export default ElectionCard;
