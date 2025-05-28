'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default query options
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      refetchOnMount: true,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * React Query provider for the application
 * Provides the QueryClient to all components
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}