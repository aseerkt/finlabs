import Head from 'next/head';
import Image from 'next/image';

export const Home = (): JSX.Element => (
  <div>
    <Head>
      <title>Finlabs</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <footer>
      <a
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by{' '}
        <Image src='/vercel.svg' alt='Vercel Logo' height={'32'} width={'64'} />
      </a>
    </footer>
  </div>
);

export default Home;
