import { UserDataExample } from './components/user-data-example';
import { TenantDataExample } from './components/tenant-data-example';

/**
 * Main DataAccess component that showcases React Query usage
 */
export function DataAccess() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Data Access with React Query</h1>
      
      <div className="space-y-8">
        <UserDataExample />
        <TenantDataExample />
      </div>
    </div>
  );
}

// Export example components
export { UserDataExample } from './components/user-data-example';
export { TenantDataExample } from './components/tenant-data-example';

export default DataAccess;
