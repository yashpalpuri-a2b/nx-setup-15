'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar/sidebar';
import { Header } from '@nx-workspace/ui';

interface DashboardLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export function DashboardLayout({ children, onSearch }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="border-b border-border p-4 bg-background">
          <Header onSearch={onSearch} />
        </header>
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;