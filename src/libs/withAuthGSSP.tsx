import { User } from '@/models/User';
import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type IncomingGSSP<P> = (
  ctx: GetServerSidePropsContext,
  user: User
) => Promise<P>;

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{
  [key: string]: any;
}>;

function withAuthServerSideProps(
  incomingGSSP?: IncomingGSSP<WithAuthServerSidePropsResult> | null
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<WithAuthServerSidePropsResult> => {
    const res = await axios.get('/users', {
      headers: { cookie: ctx.req.headers.cookie },
    });
    const user = res?.data?.user;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(ctx, user);

      if ('props' in incomingGSSPResult) {
        return { props: { ...incomingGSSPResult.props, user } };
      }

      if ('redirect' in incomingGSSPResult) {
        return { redirect: { ...incomingGSSPResult.redirect } };
      }

      if ('notFound' in incomingGSSPResult) {
        return { notFound: incomingGSSPResult.notFound };
      }
    }

    return {
      props: {
        user,
      },
    };
  };
}

export default withAuthServerSideProps;
