// Export middleware
export { tenantMiddleware } from './lib/middleware/tenant-middleware';

// Export tenant context
export {
  TenantProvider,
  useTenant,
  type TenantInfo,
} from './lib/context/tenant-context';

// Export theme provider
export {
  ThemeProvider,
  useTheme,
  type Theme,
} from './lib/theme/theme-provider';

// Export config provider
export {
  ConfigProvider,
  useConfig,
  useFeature,
  FeatureFlag,
  type FeatureFlags,
  type ApiConfig,
  type TenantConfig,
} from './lib/config/config-provider';

// Export multi-tenant provider (combines all providers)
export { MultiTenantProvider } from './lib/multi-tenant';
