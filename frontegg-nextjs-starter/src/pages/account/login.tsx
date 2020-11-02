import React from 'react';
import Head from 'next/head';
import { withFrontegg } from '../../components/withFrontegg';

function Login() {
  return <div>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </div>;
}

export default withFrontegg(Login);
