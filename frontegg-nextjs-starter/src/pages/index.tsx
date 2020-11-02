import Head from 'next/head';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  const itemProps: any = {
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal',
  };
  return <div>
    <Head>
      <title>My App With Frontegg</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div onClick={() => {
      router.push('/account/login');
    }}>
      Testing NextJS
    </div>

  </div>;
}

export default Home;
