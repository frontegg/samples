import React from 'react';
import Head from 'next/head';
import { ResetPasswordPage } from '@frontegg/react-auth';
const isSSR = typeof window === 'undefined';
function ResetPassword() {
  return <div>
    <Head>
      <title>ForgotPassword</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {!isSSR && <ResetPasswordPage />}
  </div>;
}

export default ResetPassword;
