import { Sora } from '@next/font/google';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';

import { web3Injected, web3network, web3NetworkHooks, webInjectedHooks } from '../connection';
import useEagerlyConnect from '../hooks/useEagerlyConnect';

const connectors: [Connector, Web3ReactHooks][] = [
    [web3Injected, webInjectedHooks],
    [web3network, web3NetworkHooks],
];

const sora = Sora({ subsets: ['latin'] });
const theme: DefaultTheme = {
    colors: {
        white: '#ffffff',
        gray: '#f7f8fb',
        black: '#000000',
        green: '#00a45c',
        lightGreen: '#a3f26f',
        lighterGreen: '#e0ffcc',
    },
};

const GlobalStyle = createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin, padding, border and outline
*/
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-color: ${theme.colors.white};
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

`;

type NextPageWithLayout = NextPage & {
    Layout?: React.FC<React.PropsWithChildren<unknown>>;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    useEagerlyConnect();
    // Use the layout defined at the page level, if available
    const Layout = Component.Layout || Fragment;
    return (
        <Web3ReactProvider connectors={connectors}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <div className={sora.className}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <Toaster />
                </div>
            </ThemeProvider>
        </Web3ReactProvider>
    );
}
