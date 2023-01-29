const LOCAL_STORAGE_METAMASK_KEY = 'METAMASK';
export const getIsMetamaskConnected = () => localStorage.getItem(LOCAL_STORAGE_METAMASK_KEY);

export const setMetamaskIsConnected = (value: boolean) =>
    localStorage.setItem(LOCAL_STORAGE_METAMASK_KEY, value.toString());
