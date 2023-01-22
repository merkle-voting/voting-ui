import { Sora } from '@next/font/google';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';

const sora = Sora({ subsets: ['latin'] });
const theme: DefaultTheme = {
    colors: {
        bg: '#ffffff',
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
  background-color: ${theme.colors.bg};
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
    // Use the layout defined at the page level, if available
    const Layout = Component.Layout || Fragment;
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div className={sora.className}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </ThemeProvider>
    );
}
