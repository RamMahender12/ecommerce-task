'use client';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { Toast } from '@/components/ui/Toast';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
          errorRetryCount: 2,
        }}
      >
        {children}
        <Toast />
      </SWRConfig>
    </ThemeProvider>
  );
}
