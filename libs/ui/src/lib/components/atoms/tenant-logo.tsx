/**
 * TenantLogo component
 * A tenant-aware component that displays the tenant's logo
 */
'use client';

import { useTenant, useTheme } from '@nx-workspace/multi-tenant';

export interface TenantLogoProps {
  /**
   * Width of the logo in pixels
   * @default 150
   */
  width?: number;
  
  /**
   * Height of the logo in pixels
   * @default 40
   */
  height?: number;
  
  /**
   * Additional CSS classes to apply to the logo
   */
  className?: string;
  
  /**
   * Alternative text for the logo
   */
  alt?: string;
  
  /**
   * Whether to show the tenant name next to the logo
   * @default false
   */
  showName?: boolean;
  
  /**
   * CSS classes to apply to the tenant name
   */
  nameClassName?: string;
}

/**
 * TenantLogo component
 * Displays a text-based logo for the current tenant
 */
export function TenantLogo({
  width = 150,
  height = 40,
  className = '',
  alt,
  showName = false,
  nameClassName = '',
}: TenantLogoProps) {
  const { tenant } = useTenant();
  const theme = useTheme();
  
  // Get the first letter of the tenant name or ID
  const initial = tenant.name?.charAt(0) || tenant.id.charAt(0).toUpperCase();
  
  return (
    <div className="flex items-center">
      {/* Text-based logo */}
      <div 
        className={`flex items-center justify-center text-lg font-bold rounded ${className}`}
        style={{ 
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: theme.secondaryColor,
          color: theme.primaryColor,
        }}
      >
        <span className="mr-2">{initial}</span>
        <span className="text-sm font-medium">
          {tenant.id === 'default' ? 'Default' : tenant.id}
        </span>
      </div>
      
      {/* Show tenant name if requested */}
      {showName && (
        <span 
          className={`ml-2 font-medium ${nameClassName}`}
        >
          {tenant.name || tenant.id}
        </span>
      )}
    </div>
  );
}

export default TenantLogo;