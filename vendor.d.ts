import { PrismaClient } from '@prisma/client';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }

    interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      POSTGRES_PRISMA_URL: string;
    }
  }
}

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
    name: string;
  }

  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      name: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number;
    username: string;
    email: string;
    name: string;
  }
}
