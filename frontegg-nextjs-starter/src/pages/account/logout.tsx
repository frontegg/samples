import React from 'react';
import Head from 'next/head';
import { withFrontegg } from '../../components/withFrontegg';

function Logout() {
  return <div>
    <Head>
      <title>Logout</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </div>;
}

export default withFrontegg(Logout);
