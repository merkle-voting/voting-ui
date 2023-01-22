import Head from 'next/head';

import Header from '../../components/Header';
import AdminLayout from '../../components/layouts/adminLayout';

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Admin - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header adminPageTitle="Dashboard" />
            <main></main>
        </>
    );
};

Dashboard.Layout = AdminLayout;
export default Dashboard;
