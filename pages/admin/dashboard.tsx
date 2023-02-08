import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ElectionCard from '../../components/ElectionCard';
import Header from '../../components/Header';
import AdminLayout from '../../components/layouts/adminLayout';
import { CardGrid } from '../../components/styled/CardGrid';
import Container from '../../components/styled/Container';
import useGetElections from '../../hooks/useElections';

const PageWrapper = styled.div`
    width: 100%;
`;

const ContentContainer = styled(Container)`
    margin-top: 4rem;
    padding: 0;
`;

const Dashboard = () => {
    const [elections, setElections] = useState<any[] | undefined>(undefined);
    const getElections = useGetElections();

    useEffect(() => {
        (async () => {
            const elections = await getElections();
            console.log({ elections });

            setElections(elections);
        })();
    }, [getElections]);
    return (
        <>
            <Head>
                <title>Admin - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageWrapper>
                <Header adminPageTitle="Dashboard" />
                <main>
                    <ContentContainer>
                        <CardGrid>
                            {elections &&
                                elections.map((item, index) => <ElectionCard key={index} data={item} isAdmin={true} />)}
                        </CardGrid>
                    </ContentContainer>
                </main>
            </PageWrapper>
        </>
    );
};
Dashboard.Layout = AdminLayout;
export default Dashboard;
