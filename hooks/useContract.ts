import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import VOTING_ABI from '../abis/voting.json';
import { VOTING_CONTRACT_ADDRESS } from '../constants/addresses';
import { getProviderOrSigner, isAddress } from '../utils';
export function useContract<T extends Contract = Contract>(
    address: string | undefined,
    ABI: any,
    withSignerIfPossible = true
): T | null {
    const { provider, account, chainId } = useWeb3React();

    return useMemo(() => {
        if (!address || !ABI || !provider || !chainId) return null;

        try {
            if (!isAddress(address) || address === AddressZero) {
                throw new Error(`Invalid 'address' parameter '${address}'.`);
            }
            return new Contract(
                address,
                ABI,
                getProviderOrSigner(provider, withSignerIfPossible && account ? account : undefined) as any
            );
        } catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [ABI, account, address, chainId, provider, withSignerIfPossible]) as T;
}

export function useVotingContract(withSignerIfPossible: boolean) {
    return useContract(VOTING_CONTRACT_ADDRESS, VOTING_ABI, withSignerIfPossible);
}
