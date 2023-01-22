declare module '@metamask/jazzicon' {
    export default function (diameter: number, seed: number): HTMLElement;
}

interface Window {
    document: any;
    ethereum?: {
        isMetaMask?: true;
        autoRefreshOnNetworkChange?: boolean;
    };
    web3?: Record<string, unknown>;
}
