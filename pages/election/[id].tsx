import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import CandidateCard from '../../components/CandidateCard';
import ElectionStats from '../../components/ElectionStats';
import DefaultLayout from '../../components/layouts/defaultLayout';
import { CardGrid } from '../../components/styled/CardGrid';
import { PaddedContainer } from '../../components/styled/PaddedContainer';

const GridContainer = styled(CardGrid)`
    margin-top: 3rem;
    grid-row-gap: 2rem;
`;
const Election = () => {
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
                    <ElectionStats />
                    <GridContainer>
                        <CandidateCard />
                        <CandidateCard />
                        <CandidateCard />
                        <CandidateCard />
                    </GridContainer>
                </PaddedContainer>
            </main>
        </>
    );
};
Election.Layout = DefaultLayout;
export default Election;
