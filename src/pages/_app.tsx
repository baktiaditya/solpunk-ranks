import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from '../styles/global';
import theme from '../styles/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[globalStyles(theme)]} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
