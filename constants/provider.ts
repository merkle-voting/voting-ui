import { StaticJsonRpcProvider } from '@ethersproject/providers';

import { isPlain } from '../utils';
import { RPC_URLS, SUPPORTED_CHAIN_ID } from './network';

const POLLING_INTERVAL = 12000;

class AppJsonRpcProvider extends StaticJsonRpcProvider {
    private _blockCache = new Map<string, Promise<any>>();
    get blockCache() {
        // If the blockCache has not yet been initialized this block, do so by
        // setting a listener to clear it on the next block.
        if (!this._blockCache.size) {
            this.once('block', () => this._blockCache.clear());
        }
        return this._blockCache;
    }

    constructor() {
        // Including networkish allows ethers to skip the initial detectNetwork call.
        super(RPC_URLS[0], /* networkish= */ { chainId: SUPPORTED_CHAIN_ID, name: 'Avalanche Fuji Testnet' });
        this.pollingInterval = POLLING_INTERVAL;
    }

    send(method: string, params: Array<any>): Promise<any> {
        // Only cache eth_call's.
        if (method !== 'eth_call') return super.send(method, params);

        // Only cache if params are serializable.
        if (!isPlain(params)) return super.send(method, params);

        const key = `call:${JSON.stringify(params)}`;
        const cached = this.blockCache.get(key);
        if (cached) {
            return cached;
        }

        const result = super.send(method, params);
        this.blockCache.set(key, result);
        return result;
    }
}

export const RPC_PROVIDERS_MAP = { [SUPPORTED_CHAIN_ID]: new AppJsonRpcProvider() };
