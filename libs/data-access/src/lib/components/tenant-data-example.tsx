'use client';

import { useTenantData, useTenantFeatureData } from '../hooks/use-tenant-data';
import { useTenant } from '@nx-workspace/multi-tenant';

/**
 * Example component that demonstrates the use of React Query hooks
 * for fetching and displaying tenant-specific data
 */
export function TenantDataExample() {
  const { tenant } = useTenant();
  
  // Fetch tenant data
  const { 
    data: tenantData, 
    isLoading: isTenantDataLoading, 
    error: tenantDataError,
    refetch: refetchTenantData
  } = useTenantData();
  
  // Fetch tenant-specific feature data
  const { 
    data: dashboardFeature, 
    isLoading: isFeatureLoading,
    error: featureError
  } = useTenantFeatureData('dashboard');
  
  // Handle errors
  if (tenantDataError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <h3 className="font-bold">Error loading tenant data</h3>
        <p>{tenantDataError.message}</p>
        <button 
          onClick={() => refetchTenantData()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tenant Data Example</h2>
      
      {/* Current tenant info */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="font-medium">Current Tenant: {tenant.name || tenant.id}</div>
      </div>
      
      {/* Loading state */}
      {isTenantDataLoading ? (
        <div className="animate-pulse bg-gray-200 h-40 rounded"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tenant data */}
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Tenant Configuration</h3>
            
            {tenantData?.data && (
              <div>
                <div className="mb-2">
                  <span className="font-medium">Name:</span> {tenantData.data.name}
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">Features:</span>
                  <ul className="ml-4 mt-1">
                    {Object.entries(tenantData.data.features).map(([feature, enabled]) => (
                      <li key={feature} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${enabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <span className="font-medium">Stats:</span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {Object.entries(tenantData.data.stats).map(([stat, value]) => (
                      <div key={stat} className="bg-gray-100 p-2 rounded text-center">
                        <div className="text-lg font-bold">{value as number}</div>
                        <div className="text-xs text-gray-600">{stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Feature data */}
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Dashboard Feature</h3>
            
            {isFeatureLoading ? (
              <div className="animate-pulse bg-gray-200 h-20 rounded"></div>
            ) : featureError ? (
              <div className="text-red-600">
                Error loading feature data: {featureError.message}
              </div>
            ) : dashboardFeature ? (
              <div>
                <div className="mb-2">
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    dashboardFeature.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {dashboardFeature.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">Display Name:</span> {dashboardFeature.config.displayName}
                </div>
                
                <div>
                  <span className="font-medium">Permissions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dashboardFeature.config.permissions.map((permission: string) => (
                      <span key={permission} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}