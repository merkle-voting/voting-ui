import { useWeb3React } from '@web3-react/core';
import React from 'react';

import { web3Injected } from '../../connection';
import { setMetamaskIsConnected } from '../../connection/utils';
import { addAvalancheFujiTestnet } from '../../constant/network';
import Connected from './connected';
import Disconnected from './disconneted';

const Walletconnection = () => {
    const { isActive, account } = useWeb3React();
    const connect = async () => {
        try {
            web3Injected.activate(addAvalancheFujiTestnet);
            setMetamaskIsConnected(true);
        } catch (error) {
            console.debug(`web3-react connection error: ${error}`);
        }
    };
    return isActive && account ? <Connected account={account} /> : <Disconnected connect={connect} />;
};

export default Walletconnection;
