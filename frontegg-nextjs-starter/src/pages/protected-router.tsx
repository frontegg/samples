import React from 'react';
import Head from 'next/head';
const isSSR = typeof window === 'undefined';

export default function ProtectedRouter() {

  return <div>
    <Head>
      <title> Protected Content</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    My Protected Content

    {/*<ProtectedComponent>*/}
    {/*  My Protected Content*/}
    {/*</ProtectedComponent>*/}
  </div>;
}
