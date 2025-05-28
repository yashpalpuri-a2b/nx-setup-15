/**
 * Tenant-specific theme provider
 * This provider applies tenant-specific theming to the application
 */
'use client';

import { ReactNode, useEffect } from 'react';
import { useTenant } from '../context/tenant-context';

/**
 * Theme interface
 */
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  logoUrl?: string;
}

/**
 * Predefined themes for each tenant
 */
const themes: Record<string, Theme> = {
  default: {
    primaryColor: '#0f172a',
    secondaryColor: '#64748b',
    accentColor: '#3b82f6',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    fontFamily: 'Inter, sans-serif',
    logoUrl: '/tenants/default/logo.svg',
  },
  tenant1: {
    primaryColor: '#2563eb',
    secondaryColor: '#93c5fd',
    accentColor: '#1e40af',
    backgroundColor: '#eff6ff',
    textColor: '#1e3a8a',
    fontFamily: 'Inter, sans-serif',
    logoUrl: '/tenants/tenant1/logo.svg',
  },
  tenant2: {
    primaryColor: '#16a34a',
    secondaryColor: '#86efac',
    accentColor: '#166534',
    backgroundColor: '#f0fdf4',
    textColor: '#14532d',
    fontFamily: 'Inter, sans-serif',
    logoUrl: '/tenants/tenant2/logo.svg',
  },
  tenant3: {
    primaryColor: '#9333ea',
    secondaryColor: '#d8b4fe',
    accentColor: '#7e22ce',
    backgroundColor: '#f5f3ff',
    textColor: '#581c87',
    fontFamily: 'Inter, sans-serif',
    logoUrl: '/tenants/tenant3/logo.svg',
  },
};

/**
 * Theme provider props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component
 * @param props The component props
 * @returns The theme provider component
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { tenant, isLoading } = useTenant();
  const theme = themes[tenant.id] || themes.default;
  
  useEffect(() => {
    if (isLoading) return;
    
    // Apply theme as CSS variables
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--${kebabCase(key)}`, value);
      }
    });
    
    // Set data attribute for CSS selectors
    root.dataset.tenant = tenant.id;
    
  }, [theme, tenant.id, isLoading]);
  
  return <>{children}</>;
}

/**
 * Convert camelCase to kebab-case
 * @param str The string to convert
 * @returns The kebab-case string
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Hook to get the current theme
 * @returns The current theme
 */
export function useTheme(): Theme {
  const { tenant } = useTenant();
  return themes[tenant.id] || themes.default;
}