import Head from 'next/head';
import { useTheme } from 'styled-components';

import ElectionCard from '../components/ElectionCard';
import DefaultLayout from '../components/layouts/defaultLayout';
import { CardGrid } from '../components/styled/CardGrid';
import { PaddedContainer } from '../components/styled/PaddedContainer';

const Elections = () => {
    const theme = useTheme();
    return (
        <>
            <Head>
                <title>Elections - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PaddedContainer>
                    <CardGrid columns={4}>
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
                </PaddedContainer>
            </main>
        </>
    );
};

Elections.Layout = DefaultLayout;
export default Elections;
