/**
 * Tenant-specific configuration provider
 * This provider supplies tenant-specific configuration options to the application
 */
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTenant } from '../context/tenant-context';

/**
 * Feature flags interface
 */
export interface FeatureFlags {
  advancedReporting: boolean;
  liveTracking: boolean;
  bookingManagement: boolean;
  userManagement: boolean;
  analytics: boolean;
  notifications: boolean;
  [key: string]: boolean;
}

/**
 * API configuration interface
 */
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

/**
 * Tenant configuration interface
 */
export interface TenantConfig {
  features: FeatureFlags;
  api: ApiConfig;
  maxUsers: number;
  maxVehicles: number;
  supportEmail: string;
  supportPhone?: string;
  [key: string]: any;
}

/**
 * Predefined configurations for each tenant
 */
const configurations: Record<string, TenantConfig> = {
  default: {
    features: {
      advancedReporting: false,
      liveTracking: true,
      bookingManagement: true,
      userManagement: true,
      analytics: false,
      notifications: true,
    },
    api: {
      baseUrl: '/api',
      timeout: 10000,
      retryAttempts: 3,
    },
    maxUsers: 10,
    maxVehicles: 25,
    supportEmail: 'support@example.com',
  },
  tenant1: {
    features: {
      advancedReporting: true,
      liveTracking: true,
      bookingManagement: true,
      userManagement: true,
      analytics: true,
      notifications: true,
    },
    api: {
      baseUrl: '/api',
      timeout: 15000,
      retryAttempts: 3,
    },
    maxUsers: 50,
    maxVehicles: 100,
    supportEmail: 'support@acme.com',
    supportPhone: '+1-555-123-4567',
  },
  tenant2: {
    features: {
      advancedReporting: false,
      liveTracking: true,
      bookingManagement: true,
      userManagement: true,
      analytics: false,
      notifications: true,
    },
    api: {
      baseUrl: '/api',
      timeout: 10000,
      retryAttempts: 3,
    },
    maxUsers: 25,
    maxVehicles: 50,
    supportEmail: 'support@globex.com',
  },
  tenant3: {
    features: {
      advancedReporting: true,
      liveTracking: true,
      bookingManagement: true,
      userManagement: true,
      analytics: true,
      notifications: true,
    },
    api: {
      baseUrl: '/api',
      timeout: 15000,
      retryAttempts: 3,
    },
    maxUsers: 100,
    maxVehicles: 200,
    supportEmail: 'support@oceanic.com',
    supportPhone: '+1-555-987-6543',
  },
};

// Create the configuration context
const ConfigContext = createContext<TenantConfig>(configurations.default);

/**
 * Configuration provider props
 */
interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * Configuration provider component
 * @param props The component props
 * @returns The configuration provider component
 */
export function ConfigProvider({ children }: ConfigProviderProps) {
  const { tenant } = useTenant();
  const config = configurations[tenant.id] || configurations.default;
  
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * Hook to use the configuration context
 * @returns The configuration context
 */
export function useConfig() {
  const context = useContext(ConfigContext);
  
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  
  return context;
}

/**
 * Hook to check if a feature is enabled
 * @param featureName The name of the feature to check
 * @returns True if the feature is enabled, false otherwise
 */
export function useFeature(featureName: keyof FeatureFlags): boolean {
  const config = useConfig();
  return config.features[featureName] || false;
}

/**
 * Feature flag component
 * @param props The component props
 * @returns The feature flag component
 */
export function FeatureFlag({ 
  feature, 
  children, 
  fallback = null 
}: { 
  feature: keyof FeatureFlags; 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  const isEnabled = useFeature(feature);
  return isEnabled ? <>{children}</> : <>{fallback}</>;
}