import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import SessionProvider from '@/providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export const fonts = {
  poppins,
};

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const session = await getServerSession();
  return (
    <html>
      <body className={cn('bg-gray-200', fonts.poppins.variable)}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
