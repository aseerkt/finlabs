import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
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

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html>
      <body className={cn('bg-gray-200', fonts.poppins.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
