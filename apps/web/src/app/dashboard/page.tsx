'use client';

import { useState, useEffect } from 'react';
import {
  MapViewWidget,
  MarkerData,
  DashboardGrid,
  TenantStatsWidget,
  TenantActivityChart,
  RecentActivityWidget,
  WidgetConfig
} from '@nx-workspace/feature';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timestamp, setTimestamp] = useState<string | null>(null);
  
  useEffect(() => {
    // Only update the timestamp on the client side
    setTimestamp(new Date().toLocaleString());
  }, []);

  // Get the Google Maps API key from environment variables
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Sample marker data for the map
  const vehicleMarkers: MarkerData[] = [
    {
      id: 'vehicle-1',
      position: { lat: -33.865143, lng: 151.209900 },
      title: 'Vehicle 001',
      content: (
        <div className="p-2">
          <h3 className="font-bold">Vehicle 001</h3>
          <p className="text-sm">Status: Active</p>
          <p className="text-sm">Driver: John Smith</p>
        </div>
      )
    },
    {
      id: 'vehicle-2',
      position: { lat: -33.856784, lng: 151.215297 },
      title: 'Vehicle 002',
      content: (
        <div className="p-2">
          <h3 className="font-bold">Vehicle 002</h3>
          <p className="text-sm">Status: Active</p>
          <p className="text-sm">Driver: Jane Doe</p>
        </div>
      )
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would use this to filter data or make API calls
    console.log('Searching for:', query);
  };

  // Define dashboard widgets
  const dashboardWidgets: WidgetConfig[] = [
    {
      id: 'stats',
      component: <TenantStatsWidget />,
      size: 'full',
    },
    {
      id: 'activity-chart',
      component: <TenantActivityChart />,
      size: 'medium',
      minHeight: '400px',
    },
    {
      id: 'recent-activity',
      component: <RecentActivityWidget />,
      size: 'medium',
      minHeight: '400px',
    },
    {
      id: 'map',
      component: (
        <MapViewWidget
          apiKey={googleMapsApiKey}
          markers={vehicleMarkers}
          center={{ lat: -33.865143, lng: 151.209900 }}
          zoom={13}
          height="350px"
        />
      ),
      size: 'full',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {timestamp || ''}
        </div>
      </div>
      
      <DashboardGrid widgets={dashboardWidgets} />
    </div>
  );
}