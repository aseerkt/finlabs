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
    }
  }
}

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
  }

  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number;
    username: string;
    email: string;
  }
}
