import Showcase from '@/components/Showcase';
import Head from 'next/head';

export const Home = (): JSX.Element => (
  <div>
    <Head>
      <title>finlabs</title>
      <meta
        name='description'
        content='Find collabs, share projects, and manage task boards among peers.'
      />
    </Head>
    <Showcase />
  </div>
);

export default Home;
