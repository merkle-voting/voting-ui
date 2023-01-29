import { Connector } from '@web3-react/types';
import { useEffect } from 'react';

import { web3Injected, web3network } from '../connection';
import { getIsMetamaskConnected } from '../connection/utils';
async function connect(connector: Connector) {
    try {
        if (connector.connectEagerly) {
            await connector.connectEagerly();
        } else {
            await connector.activate();
        }
    } catch (error) {
        console.debug(`web3-react eager connection error: ${error}`);
    }
}

export default function useEagerlyConnect() {
    useEffect(() => {
        const connected = getIsMetamaskConnected() === 'true';
        connect(web3network);

        if (connected) {
            connect(web3Injected);
        } // The dependency list is empty so this is only run once on mount
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
