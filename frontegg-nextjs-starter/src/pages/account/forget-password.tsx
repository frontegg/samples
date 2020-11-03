import React from 'react';
import Head from 'next/head';
import { ForgotPasswordPage } from '@frontegg/react-auth';

const isSSR = typeof window === 'undefined';

function ForgotPassword() {
  return <div>
    <Head>
      <title>ForgotPassword</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {!isSSR && <ForgotPasswordPage />}
  </div>;
}

export default ForgotPassword;
