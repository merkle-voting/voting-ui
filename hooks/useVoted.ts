import { useEffect, useState } from 'react';

import { useVotingContract } from './useContract';

export function useVoted(account: string | undefined, id: number | string | string | string[] | undefined) {
    const [result, setResult] = useState(false);
    const votingContract = useVotingContract(false);

    useEffect(() => {
        if (!account || !id || !votingContract) return setResult(false);
        votingContract._voted(account, id.toString()).then((res: any) => {
            setResult(res);
        });
    }, [account, id, votingContract]);

    return result;
}
