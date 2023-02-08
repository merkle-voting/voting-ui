import moment from 'moment';
import { useCallback } from 'react';

import { convertBigNumbers, convertStructOutputToObject } from '../utils';
import { useVotingContract } from './useContract';

const useGetElections = () => {
    const votingContract = useVotingContract(false);
    const getElections = useCallback(async () => {
        if (!votingContract) return;
        const electionCount = convertBigNumbers(await votingContract.electionId());
        if (!electionCount) return [];

        const electionIdArray = Array.from({ length: electionCount }, (_, i) => i);
        const electionsRaw = await Promise.all(electionIdArray.map((id) => votingContract.viewElection(id)));
        const resultsRaw = await Promise.all(electionIdArray.map((id) => votingContract.viewResults(id)));

        // const electionsObj = convertBigNumbers(convertStructOutputToObject(electionsRaw[0]));
        // const resultObj = convertBigNumbers(convertStructOutputToObject(resultsRaw[0]));

        // console.log({ electionsRaw: electionsObj, resultsRaw: resultObj });

        const elections = electionsRaw.map((item, index) => {
            const data = convertBigNumbers(convertStructOutputToObject(item));
            const result = convertBigNumbers(convertStructOutputToObject(resultsRaw[index]));
            console.log({ result });

            return {
                id: electionIdArray[index],
                title: data.title,
                candatesId: data.candidates,
                startingTime: moment(item.timeStarted * 1000),
                endingTime: moment((item.timeStarted + item.duration) * 1000),
                durationInseconds: item.duration,
                // merkleRoot: item.merkleRoot,
                isActivated: item.merkleRoot !== '0x0000000000000000000000000000000000000000000000000000000000000000',
                candidatesVotes: result._votes,
            };
        });
        // reverse it so the lattest are at the top
        return elections.reverse();
    }, [votingContract]);

    return getElections;
};

export default useGetElections;
