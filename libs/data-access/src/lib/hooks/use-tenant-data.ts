'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/api-client';
import { useTenant } from '@nx-workspace/multi-tenant';

// Query keys for tenant data
export const tenantKeys = {
  all: ['tenants'] as const,
  data: () => [...tenantKeys.all, 'data'] as const,
  tenantData: (tenantId: string) => [...tenantKeys.data(), tenantId] as const,
};

/**
 * Hook to fetch tenant-specific data
 * This hook automatically uses the current tenant from the tenant context
 */
export function useTenantData() {
  const { tenant, isLoading: isTenantLoading } = useTenant();
  
  return useQuery({
    queryKey: tenantKeys.tenantData(tenant.id),
    queryFn: () => apiClient.getTenantData(tenant.id),
    // Only run the query if we have a tenant ID and tenant loading is complete
    enabled: !!tenant.id && !isTenantLoading,
    // Add retry logic for transient failures
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    // Fallback data if the API request fails
    placeholderData: {
      data: {
        name: tenant.name || 'Unknown Tenant',
        id: tenant.id,
        features: {
          dashboard: true,
          reports: tenant.id !== 'default', // Only non-default tenants have reports
          analytics: ['tenant1', 'tenant3'].includes(tenant.id), // Only specific tenants have analytics
        },
        stats: {
          users: 0,
          projects: 0,
          tasks: 0,
        },
        weeklyActivity: [
          { day: 'Mon', users: 0, tasks: 0, revenue: 0 },
          { day: 'Tue', users: 0, tasks: 0, revenue: 0 },
          { day: 'Wed', users: 0, tasks: 0, revenue: 0 },
          { day: 'Thu', users: 0, tasks: 0, revenue: 0 },
          { day: 'Fri', users: 0, tasks: 0, revenue: 0 },
          { day: 'Sat', users: 0, tasks: 0, revenue: 0 },
          { day: 'Sun', users: 0, tasks: 0, revenue: 0 },
        ]
      }
    },
  });
}

/**
 * Hook to fetch tenant-specific data for a specific feature
 * @param featureId The ID of the feature to fetch data for
 */
export function useTenantFeatureData(featureId: string) {
  const { tenant, isLoading: isTenantLoading } = useTenant();
  
  return useQuery({
    queryKey: [...tenantKeys.tenantData(tenant.id), 'feature', featureId],
    queryFn: () =>
      fetch(`/api/tenants/${tenant.id}/features/${featureId}`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch feature data for ${featureId}`);
          return res.json();
        }),
    enabled: !!tenant.id && !!featureId && !isTenantLoading,
    // Add retry logic for transient failures
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    // Mock data for demonstration purposes
    placeholderData: {
      enabled: true,
      config: {
        displayName: `${featureId.charAt(0).toUpperCase() + featureId.slice(1)}`,
        permissions: ['read', 'write'],
      }
    },
  });
}