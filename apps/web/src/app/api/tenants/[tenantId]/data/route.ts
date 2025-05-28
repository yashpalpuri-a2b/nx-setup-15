import { NextRequest, NextResponse } from 'next/server';

// Mock tenant data
const tenantData = {
  'default': {
    name: 'Default Tenant',
    features: {
      dashboard: true,
      reports: false,
      analytics: false,
    },
    stats: {
      users: 42,
      projects: 7,
      tasks: 156,
    },
    weeklyActivity: [
      { day: 'Mon', users: 28, tasks: 67, revenue: 580 },
      { day: 'Tue', users: 32, tasks: 73, revenue: 620 },
      { day: 'Wed', users: 38, tasks: 85, revenue: 750 },
      { day: 'Thu', users: 36, tasks: 78, revenue: 710 },
      { day: 'Fri', users: 34, tasks: 72, revenue: 690 },
      { day: 'Sat', users: 22, tasks: 45, revenue: 430 },
      { day: 'Sun', users: 18, tasks: 35, revenue: 380 },
    ]
  },
  'tenant1': {
    name: 'Tenant One',
    features: {
      dashboard: true,
      reports: true,
      analytics: true,
    },
    stats: {
      users: 87,
      projects: 15,
      tasks: 342,
    },
    weeklyActivity: [
      { day: 'Mon', users: 45, tasks: 98, revenue: 1250 },
      { day: 'Tue', users: 52, tasks: 112, revenue: 1380 },
      { day: 'Wed', users: 58, tasks: 125, revenue: 1450 },
      { day: 'Thu', users: 56, tasks: 118, revenue: 1420 },
      { day: 'Fri', users: 54, tasks: 110, revenue: 1380 },
      { day: 'Sat', users: 32, tasks: 65, revenue: 850 },
      { day: 'Sun', users: 28, tasks: 55, revenue: 720 },
    ]
  },
  'tenant2': {
    name: 'Tenant Two',
    features: {
      dashboard: true,
      reports: true,
      analytics: false,
    },
    stats: {
      users: 65,
      projects: 12,
      tasks: 278,
    },
    weeklyActivity: [
      { day: 'Mon', users: 38, tasks: 82, revenue: 980 },
      { day: 'Tue', users: 42, tasks: 95, revenue: 1120 },
      { day: 'Wed', users: 48, tasks: 105, revenue: 1250 },
      { day: 'Thu', users: 46, tasks: 98, revenue: 1180 },
      { day: 'Fri', users: 44, tasks: 92, revenue: 1150 },
      { day: 'Sat', users: 26, tasks: 58, revenue: 720 },
      { day: 'Sun', users: 22, tasks: 48, revenue: 650 },
    ]
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  // Get the tenant ID from the route parameters
  // In Next.js 15.2.5, we need to await the params object
  const params_obj = await params;
  const tenantId = params_obj.tenantId;
  
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Check if tenant exists
  if (!tenantData[tenantId as keyof typeof tenantData]) {
    // If tenant doesn't exist, return a fallback with empty data
    return NextResponse.json({
      data: {
        name: `Tenant ${tenantId}`,
        features: {
          dashboard: true,
          reports: false,
          analytics: false,
        },
        stats: {
          users: 0,
          projects: 0,
          tasks: 0,
        },
        weeklyActivity: [
          { day: 'Mon', users: 0, tasks: 0, revenue: 0 },
          { day: 'Tue', users: 0, tasks: 0, revenue: 0 },
          { day: 'Wed', users: 0, tasks: 0, revenue: 0 },
          { day: 'Thu', users: 0, tasks: 0, revenue: 0 },
          { day: 'Fri', users: 0, tasks: 0, revenue: 0 },
          { day: 'Sat', users: 0, tasks: 0, revenue: 0 },
          { day: 'Sun', users: 0, tasks: 0, revenue: 0 },
        ]
      }
    });
  }
  
  // Return tenant data
  return NextResponse.json({
    data: tenantData[tenantId as keyof typeof tenantData]
  });
}