/**
 * Multi-tenant provider component
 * This component combines all the multi-tenant providers into a single provider
 */
'use client';

import { ReactNode } from 'react';
import { TenantProvider, TenantInfo } from './context/tenant-context';
import { ThemeProvider } from './theme/theme-provider';
import { ConfigProvider } from './config/config-provider';

/**
 * Multi-tenant provider props
 */
interface MultiTenantProviderProps {
  children: ReactNode;
  defaultTenant?: TenantInfo;
}

/**
 * Multi-tenant provider component
 * This component combines all the multi-tenant providers into a single provider
 * for easier use in the application
 * 
 * @param props The component props
 * @returns The multi-tenant provider component
 */
export function MultiTenantProvider({
  children,
  defaultTenant,
}: MultiTenantProviderProps) {
  return (
    <TenantProvider defaultTenant={defaultTenant}>
      <ThemeProvider>
        <ConfigProvider>
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </TenantProvider>
  );
}

/**
 * Legacy component - kept for backward compatibility
 * @deprecated Use MultiTenantProvider instead
 */
export function MultiTenant() {
  return (
    <div>
      <h1>Welcome to MultiTenant!</h1>
      <p>This component is deprecated. Use MultiTenantProvider instead.</p>
    </div>
  );
}

export default MultiTenant;
