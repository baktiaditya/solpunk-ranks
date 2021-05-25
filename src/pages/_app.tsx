import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import globalStyles from '../styles/global';
import theme from '../styles/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[globalStyles(theme)]} />

      <Head>
        <title>SolPunk Ranks</title>
        <meta name="description" content="SolPunk ranks checker" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/cropped-unknown_2.png" />
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
