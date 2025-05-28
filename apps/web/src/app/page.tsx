'use client';

import { useTenant, useTheme, useConfig, FeatureFlag } from '@nx-workspace/multi-tenant';
import { TenantLogo } from '@nx-workspace/ui';
import { UserDataExample, TenantDataExample } from '@nx-workspace/data-access';
import Link from 'next/link';

export default function Home() {
  const { tenant } = useTenant();
  const theme = useTheme();
  const config = useConfig();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.backgroundColor }}>
      <header className="p-4" style={{ backgroundColor: theme.primaryColor, color: 'white' }}>
        <div className="container mx-auto flex items-center justify-between">
          <TenantLogo showName={true} nameClassName="text-white text-xl" />
          <nav>
            <Link 
              href="/dashboard" 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors"
            >
              Go to Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>
            Tenant Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Tenant Details</h3>
              <ul className="space-y-2">
                <li><strong>ID:</strong> {tenant.id}</li>
                <li><strong>Name:</strong> {tenant.name}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Theme Colors</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(theme).map(([key, value]) => {
                  if (typeof value === 'string' && key.includes('Color')) {
                    return (
                      <div key={key} className="flex items-center">
                        <div 
                          className="w-6 h-6 rounded mr-2" 
                          style={{ backgroundColor: value }}
                        ></div>
                        <span>{key}: {value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>
            Feature Flags
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(config.features).map(([key, enabled]) => (
              <div 
                key={key} 
                className="p-3 rounded-lg border"
                style={{ 
                  borderColor: theme.secondaryColor,
                  backgroundColor: enabled ? 'rgba(0, 255, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{key}</span>
                  <span 
                    className={`px-2 py-1 rounded text-xs ${enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FeatureFlag feature="advancedReporting">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>
              Advanced Reporting
            </h2>
            <p>This section is only visible if the advancedReporting feature is enabled.</p>
          </div>
        </FeatureFlag>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>
            React Query Examples
          </h2>
          <div className="space-y-6">
            <UserDataExample />
            <TenantDataExample />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: theme.primaryColor }}>
            Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">API Configuration</h3>
              <ul className="space-y-2">
                <li><strong>Base URL:</strong> {config.api.baseUrl}</li>
                <li><strong>Timeout:</strong> {config.api.timeout}ms</li>
                <li><strong>Retry Attempts:</strong> {config.api.retryAttempts}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Limits</h3>
              <ul className="space-y-2">
                <li><strong>Max Users:</strong> {config.maxUsers}</li>
                <li><strong>Max Vehicles:</strong> {config.maxVehicles}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 mt-8" style={{ backgroundColor: theme.primaryColor, color: 'white' }}>
        <div className="container mx-auto">
          <p>Support: {config.supportEmail} {config.supportPhone ? `| ${config.supportPhone}` : ''}</p>
        </div>
      </footer>
    </div>
  );
}
