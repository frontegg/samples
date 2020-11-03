import React, { useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '@frontegg/react-auth';

const isSSR = typeof window === 'undefined';

function Logout() {

  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });
  return <div>
    <Head>
      <title>Logout</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </div>;
}

export default Logout;
