import ProgressBar from '@ramonak/react-progress-bar';
import { Moment } from 'moment';
import styled, { useTheme } from 'styled-components';

import { useCountdown } from '../hooks/useCountdown';
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

const StartTime = styled.div`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.green};
`;

const ElectionStats: React.FC<{
    title: string;
    total_candidate: number | string;
    total_voters: number | string;
    percentage_completed: number;
    starting_time: Moment;
    ending_time: Moment;
}> = ({ title, total_candidate, total_voters, starting_time, ending_time, percentage_completed }) => {
    const { colors } = useTheme();

    const [days, hours, minutes, seconds] = useCountdown(ending_time.valueOf());

    const timeElapsed = days + hours + minutes + seconds <= 0;

    const notYetStarted = new Date().getTime() < starting_time.valueOf();
    return (
        <StatsContainer>
            <Title>{title}</Title>
            <StatsWrapper>
                <Stat>
                    <span>status</span>
                    {notYetStarted ? (
                        <StartTime>Starts by: {starting_time.format('YYYY-MM-DD HH:mm')}</StartTime>
                    ) : (
                        <ProgressBar
                            completed={Math.ceil(percentage_completed)}
                            bgColor={colors.green}
                            margin="5px 0 0 0"
                        />
                    )}
                </Stat>
                <Stat>
                    <span>Total Candidate</span>
                    <span>{total_candidate}</span>
                </Stat>
                <Stat>
                    <span>Total Voters</span>
                    <span>{total_voters}</span>
                </Stat>
                <Stat>
                    <span>Time Remaining</span>
                    <span>{!timeElapsed ? `${hours}:${minutes}:${seconds}` : 'ended'}</span>
                </Stat>
            </StatsWrapper>
        </StatsContainer>
    );
};

export default ElectionStats;
