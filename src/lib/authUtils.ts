import bcrypt from 'bcrypt';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { usernameOrEmail, password } = credentials as {
          usernameOrEmail: string;
          password: string;
        };

        const user = await prisma.user.findFirst({
          where: usernameOrEmail.includes('@')
            ? { email: usernameOrEmail }
            : { username: usernameOrEmail },
        });

        if (!user) {
          throw new Error('Incorrect username/email/password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error('Incorrect username/email/password');
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      token.id = token.id ?? user?.id;
      token.username = token.username ?? user?.username;
      return token;
    },
    session({ token, session }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
};

export const getAuthSesssion = () => getServerSession(authOptions);
