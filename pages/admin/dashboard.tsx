import Head from 'next/head';
import styled from 'styled-components';

import ElectionCard from '../../components/ElectionCard';
import Header from '../../components/Header';
import AdminLayout from '../../components/layouts/adminLayout';
import Container from '../../components/styled/Container';

const PageWrapper = styled.div`
    width: 100%;
`;

const ContentContainer = styled(Container)`
    margin-top: 4rem;
    padding: 0;
`;

const CardGrid = styled.div`
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    max-height: 80vh;
`;

const Dashboard = () => {
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
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                            <ElectionCard />
                        </CardGrid>
                    </ContentContainer>
                </main>
            </PageWrapper>
        </>
    );
};

Dashboard.Layout = AdminLayout;
export default Dashboard;
