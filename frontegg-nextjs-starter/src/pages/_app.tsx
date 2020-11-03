import React, { Component, ElementType, useMemo } from 'react';
import Head from 'next/head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { withFrontegg } from '../components/withFrontegg';

const isSSR = typeof window === 'undefined';

interface MyAppProps {
  Component: ElementType
  pageProps: any;
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f11f4a',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default function MyApp(props: MyAppProps) {
  const { pageProps } = props;
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const Component = withFrontegg(props.Component);

  return <>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>;

}
