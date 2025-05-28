'use client';

import { ReactNode, useState } from 'react';
import { DashboardLayout as FeatureDashboardLayout } from '@nx-workspace/feature';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you might use this to filter data globally or make API calls
    console.log('Searching for:', query);
  };

  return (
    <FeatureDashboardLayout onSearch={handleSearch}>
      {children}
    </FeatureDashboardLayout>
  );
}