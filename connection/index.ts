import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';

import { SUPPORTED_CHAIN_ID } from '../constants/network';
import { RPC_PROVIDERS_MAP } from '../constants/provider';

function onError(error: Error) {
    console.debug(`web3-react error: ${error}`);
}

export const [web3network, web3NetworkHooks] = initializeConnector<Network>(
    (actions) => new Network({ actions, urlMap: RPC_PROVIDERS_MAP, defaultChainId: SUPPORTED_CHAIN_ID })
);

export const [web3Injected, webInjectedHooks] = initializeConnector<MetaMask>(
    (actions) => new MetaMask({ actions, onError })
);
