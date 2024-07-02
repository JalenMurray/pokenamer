import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@aws-amplify/ui-react/styles.css';
// import ConfigureAmplifyClientSide from './utils/ConfigureAmplify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokeNamer',
  description: 'Pokemon Naming Themes and Tracker',
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ConfigureAmplifyClientSide /> */}
      <body className={inter.className}>
        {children}
        {/* <QueryClientProvider client={queryClient}></QueryClientProvider> */}
      </body>
    </html>
  );
}
