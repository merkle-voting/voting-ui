export const RPC_URLS = [
    'https://api.avax-test.network/ext/bc/C/rpc',
    'https://rpc.ankr.com/avalanche_fuji',
    'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc',
];

export const SUPPORTED_CHAIN_ID = 43113;

export interface AddEthereumChainParameter {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}

export const addAvalancheFujiTestnet: AddEthereumChainParameter = {
    chainId: SUPPORTED_CHAIN_ID,
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
    },
    rpcUrls: RPC_URLS,
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
};
