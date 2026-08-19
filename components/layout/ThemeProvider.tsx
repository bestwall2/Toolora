'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Metadata } from 'next';


export const metadata: Metadata = {
  verification: {
    google: 'exAAHpiMsljDHyf5dcUDz6KESuX79fZMvd1HLDsb0p0',
  },
};


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
