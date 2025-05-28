// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

// Export the data-access component
export * from './lib/data-access';

// Export the React Query provider
export * from './lib/query/query-provider';

// Export API client
export * from './lib/api/api-client';

// Export hooks
export * from './lib/hooks/use-users';
export * from './lib/hooks/use-tenant-data';

// Export example components
export { UserDataExample } from './lib/components/user-data-example';
export { TenantDataExample } from './lib/components/tenant-data-example';
