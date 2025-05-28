import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to identify the current tenant based on the subdomain
 * @param req The Next.js request object
 * @returns The Next.js response object with tenant ID cookie set
 */
export function tenantMiddleware(req: NextRequest) {
  const tenantId = identifyTenant(req);
  
  const response = NextResponse.next();
  response.cookies.set('tenant-id', tenantId, {
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
  
  return response;
}

/**
 * Identifies the tenant based on the subdomain
 * @param req The Next.js request object
 * @returns The identified tenant ID or 'default' if none found
 */
function identifyTenant(req: NextRequest): string {
  // Extract from subdomain (e.g., tenant1.example.com)
  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  if (isValidTenant(subdomain)) {
    return subdomain;
  }
  
  // For local development, allow query param override
  const url = new URL(req.url);
  const tenantParam = url.searchParams.get('tenant');
  if (tenantParam && isValidTenant(tenantParam)) {
    return tenantParam;
  }
  
  // Default tenant
  return 'default';
}

/**
 * Checks if the tenant ID is valid
 * @param tenantId The tenant ID to check
 * @returns True if the tenant ID is valid, false otherwise
 */
function isValidTenant(tenantId: string): boolean {
  // In a real app, this would check against a database or configuration
  const validTenants = ['tenant1', 'tenant2', 'tenant3'];
  return validTenants.includes(tenantId);
}