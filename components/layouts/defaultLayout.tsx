import { NextPage } from 'next';

import Header from '../Header';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: NextPage<IDefaultLayout> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default DefaultLayout;
