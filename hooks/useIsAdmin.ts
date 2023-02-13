import { useWeb3React } from '@web3-react/core';

import { ADMIN } from '../constants/addresses';

export function useIsAdmin() {
    const { account } = useWeb3React();
    return account?.toLowerCase() === ADMIN.toLowerCase();
}
