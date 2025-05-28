/**
 * Tenant context provider for multi-tenant applications
 * This context provides tenant information to all components in the application
 */
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

/**
 * Tenant information interface
 */
export interface TenantInfo {
  id: string;
  name?: string;
}

/**
 * Tenant context interface
 */
interface TenantContextType {
  tenant: TenantInfo;
  isLoading: boolean;
}

// Default tenant context
const defaultTenantContext: TenantContextType = {
  tenant: { id: 'default' },
  isLoading: true,
};

// Create the tenant context
const TenantContext = createContext<TenantContextType>(defaultTenantContext);

/**
 * Tenant provider props
 */
interface TenantProviderProps {
  children: ReactNode;
  defaultTenant?: TenantInfo;
}

/**
 * Tenant provider component
 * @param props The component props
 * @returns The tenant provider component
 */
export function TenantProvider({
  children,
  defaultTenant = { id: 'default' },
}: TenantProviderProps) {
  const [tenantContext, setTenantContext] = useState<TenantContextType>({
    tenant: defaultTenant,
    isLoading: true,
  });

  useEffect(() => {
    // Get tenant ID from cookie
    const tenantId = getCookie('tenant-id') as string || defaultTenant.id;
    
    // In a real app, you might fetch additional tenant information from an API
    const tenantInfo: TenantInfo = {
      id: tenantId,
      name: getTenantName(tenantId),
    };
    
    setTenantContext({
      tenant: tenantInfo,
      isLoading: false,
    });
  }, [defaultTenant.id]); // Only depend on the ID, not the entire object

  return (
    <TenantContext.Provider value={tenantContext}>
      {children}
    </TenantContext.Provider>
  );
}

/**
 * Hook to use the tenant context
 * @returns The tenant context
 */
export function useTenant() {
  const context = useContext(TenantContext);
  
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  
  return context;
}

/**
 * Get the tenant name from the tenant ID
 * @param tenantId The tenant ID
 * @returns The tenant name
 */
function getTenantName(tenantId: string): string {
  // In a real app, this would come from a database or configuration
  const tenantNames: Record<string, string> = {
    default: 'Default Organization',
    tenant1: 'Acme Corporation',
    tenant2: 'Globex Industries',
    tenant3: 'Oceanic Airlines',
  };
  
  return tenantNames[tenantId] || 'Unknown Organization';
}