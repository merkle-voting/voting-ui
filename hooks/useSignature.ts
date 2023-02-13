import { Web3Provider } from '@ethersproject/providers';

export interface IParams {
    provider: Web3Provider | undefined;
    account: string | undefined;
}

const useSignature = (params: IParams) => {
    const { provider, account } = params;
    const sign = async (message: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return provider?.getSigner(account).signMessage(message);
        } catch (error: any) {
            throw error;
        }
    };

    return { sign };
};

export default useSignature;
