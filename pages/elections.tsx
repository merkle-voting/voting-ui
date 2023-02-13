import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import ElectionCard from '../components/ElectionCard';
import DefaultLayout from '../components/layouts/defaultLayout';
import { CardGrid } from '../components/styled/CardGrid';
import { PaddedContainer } from '../components/styled/PaddedContainer';
import useGetElections from '../hooks/useElections';

const Elections = () => {
    const theme = useTheme();

    const [elections, setElections] = useState<any[] | undefined>(undefined);
    const { getElections } = useGetElections();

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
                <title>Elections - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PaddedContainer>
                    <CardGrid columns={4}>
                        {elections &&
                            elections
                                .filter((item) => item.isActivated)
                                .map((item, index) => <ElectionCard key={index} data={item} isAdmin={false} />)}
                    </CardGrid>
                </PaddedContainer>
            </main>
        </>
    );
};

Elections.Layout = DefaultLayout;
export default Elections;
