/**
 * Next.js middleware for multi-tenant applications
 * This middleware identifies the tenant based on the subdomain
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tenantMiddleware } from '@nx-workspace/multi-tenant/server';

/**
 * Middleware function
 * @param request The Next.js request object
 * @returns The Next.js response object
 */
export function middleware(request: NextRequest) {
  return tenantMiddleware(request);
}

/**
 * Configure middleware to run on specific paths
 */
export const config = {
  // Match all request paths except for:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - _next/data (data files)
  // - favicon.ico (favicon file)
  // - public folder files
  // - API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (data files)
     * - favicon.ico (favicon file)
     * - public folder files (static assets)
     * - API routes
     */
    '/((?!_next/static|_next/image|_next/data|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};