import Showcase from '@/components/Showcase';
import Head from 'next/head';

export const Home = (): JSX.Element => (
  <div>
    <Head>
      <title>finlabs</title>
    </Head>
    <Showcase />
  </div>
);

export default Home;
