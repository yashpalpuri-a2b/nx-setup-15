'use client';

import { ReactNode } from 'react';
import { MultiTenantProvider } from '@nx-workspace/multi-tenant';
import { QueryProvider } from '@nx-workspace/data-access';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MultiTenantProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </MultiTenantProvider>
  );
}