import Head from 'next/head';
import { StaticImageData } from 'next/image';
import styled, { useTheme } from 'styled-components';

import dottedMap from '../assets/dotted-nigeria-map.png';
import DefaultLayout from '../components/layouts/defaultLayout';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Flex from '../components/styled/Flex';

interface WrapperProps {
    image: StaticImageData;
}
const SizedContainer = styled(Container)`
    height: 40rem;
`;

const Wrapper = styled.div<WrapperProps>`
    width: 90%;
    margin: 2rem auto;
    padding: 0 3rem;
    height: 100%;
    background-image: url(${(props) => props.image.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const MainText = styled.h1`
    font-size: 6rem;
    color: ${(props) => props.theme.colors.black};
    font-weight: 900;
    text-align: center;
    margin-bottom: 2rem;
`;
const SubText = styled.h3`
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.green};
    font-weight: 500;
    text-align: center;
    margin-bottom: 4rem;
`;

const StyledDiv = styled.div`
    width: 100%;
    height: calc(
        100vh - 47rem
    ); // the 45 rem is the sum of the height container above it + its margin-top + height of the header
    background-color: ${(props) => props.theme.colors.lighterGreen};
`;

const ButtonWithNegativeMargin = styled(Button)`
    margin-top: -2rem;
`;

const Home = () => {
    const theme = useTheme();
    return (
        <>
            <Head>
                <title>Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <SizedContainer>
                    <Wrapper image={dottedMap}>
                        <Flex direction="column" alignItems="center">
                            <MainText>Welcome to the future of voting</MainText>
                            <SubText>
                                Merkle is built on cutting-edge technology that ensures the highest level of security
                                and transparency
                            </SubText>
                        </Flex>
                    </Wrapper>
                </SizedContainer>
                <StyledDiv>
                    <Flex justifyContent="center">
                        <ButtonWithNegativeMargin
                            borderRadius="2rem"
                            fontWeigth="500"
                            bgColor={theme.colors.lightGreen}
                            color={theme.colors.black}
                            display="inline"
                            padding="1rem 4rem"
                            fontSize="1.2rem"
                        >
                            Enter DApp
                        </ButtonWithNegativeMargin>
                    </Flex>
                </StyledDiv>
            </main>
        </>
    );
};

Home.Layout = DefaultLayout;
export default Home;
