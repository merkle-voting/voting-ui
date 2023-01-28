import styled from 'styled-components';

import Container from './styled/Container';

const StatsContainer = styled(Container)`
    height: 8rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors.gray};
    box-shadow: 1px 2px 3px 4px #eeeeee;
`;

const Title = styled.h1`
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const StatsWrapper = styled.div`
    /* width: 100%; */
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
`;

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    span {
        &:first-child {
            font-size: 0.8rem;
        }
        &:last-child {
            font-size: 1.2rem;
            font-weight: 700;
        }
    }
`;

const ElectionStats = () => {
    return (
        <StatsContainer>
            <Title>Nigerian 2023 general election</Title>
            <StatsWrapper>
                <Stat>
                    <span>status</span>
                    <span></span>
                </Stat>
                <Stat>
                    <span>Total Candidate</span>
                    <span>5</span>
                </Stat>
                <Stat>
                    <span>Total Voters</span>
                    <span>200,000</span>
                </Stat>
                <Stat>
                    <span>Time Remaining</span>
                    <span>02:03:43</span>
                </Stat>
            </StatsWrapper>
        </StatsContainer>
    );
};

export default ElectionStats;
