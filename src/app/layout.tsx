import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import SessionProvider from '@/providers/SessionProvider';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const fonts = {
  inter,
};

export const metadata: Metadata = {
  title: {
    default: 'Finlabs',
    template: '%s | Finlabs',
  },
  description: 'Finlabs is where share, contribute projects and manage tasks',
};

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen font-sans bg-slate-100 antialiased',
          fonts.inter.className
        )}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
