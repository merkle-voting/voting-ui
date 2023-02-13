import moment from 'moment';
import { useCallback } from 'react';

import { IElection } from '../types';
import { convertBigNumbers, convertStructOutputToObject } from '../utils';
import { useVotingContract } from './useContract';

const useGetElections = () => {
    const votingContract = useVotingContract(false);
    const getElections = useCallback(async () => {
        if (!votingContract) return;

        try {
            const electionCount = convertBigNumbers(await votingContract.electionId());

            if (!electionCount) return [];

            const electionIdArray = Array.from({ length: electionCount }, (_, i) => i);
            const electionsRaw = await Promise.all(electionIdArray.map((id) => votingContract.viewElection(id)));
            const resultsRaw = await Promise.all(electionIdArray.map((id) => votingContract.viewResults(id)));

            // const electionsObj = convertBigNumbers(convertStructOutputToObject(electionsRaw[0]));
            // const resultObj = convertBigNumbers(convertStructOutputToObject(resultsRaw[0]));

            // console.log({ electionsRaw: electionsObj, resultsRaw: resultObj });

            const elections: IElection[] = electionsRaw.map((item, index) => {
                const data = convertBigNumbers(convertStructOutputToObject(item));
                const result = convertBigNumbers(convertStructOutputToObject(resultsRaw[index]));
                return {
                    id: electionIdArray[index],
                    title: String(data.title),
                    candatesId: data.candidates as number[],
                    candidateNames: data.candidates as string[],
                    startingTime: moment(item.timeStarted * 1000),
                    endingTime: moment((item.timeStarted + item.duration) * 1000),
                    durationInseconds: Number(item.duration),
                    isActivated: Boolean(item.active),
                    candidatesVotes: result._votes as number[],
                    totalVotes: Number(item.totalVotes),
                };
            });
            // reverse it so the lattest are at the top
            return elections.reverse();
        } catch (error) {
            console.error('error getting elections: ', error);
        }
    }, [votingContract]);

    const getElection = useCallback(
        async (id: number | string): Promise<IElection | undefined> => {
            if (!votingContract || id === undefined) return;
            const electionRaw = await votingContract.viewElection(id);
            const resultsRaw = await votingContract.viewResults(id);

            const election = convertBigNumbers(convertStructOutputToObject(electionRaw));
            const result = convertBigNumbers(convertStructOutputToObject(resultsRaw));
            return {
                id,
                title: String(election.title),
                candatesId: election.candidates as number[],
                candidateNames: election.candidateNames as string[],
                startingTime: moment(election.timeStarted * 1000),
                endingTime: moment(election.endTime * 1000),
                durationInseconds: Number(election.duration),
                isActivated: Boolean(election.active),
                candidatesVotes: result._votes as number[],
                totalVotes: Number(election.totalVotes),
            };
        },
        [votingContract]
    );

    return { getElections, getElection };
};

export default useGetElections;
