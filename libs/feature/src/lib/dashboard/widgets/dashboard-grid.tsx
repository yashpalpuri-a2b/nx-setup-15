'use client';

import { ReactNode } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';

export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

export interface WidgetConfig {
  id: string;
  component: ReactNode;
  size: WidgetSize;
  minHeight?: string;
}

export interface DashboardGridProps {
  widgets: WidgetConfig[];
  className?: string;
}

export function DashboardGrid({ widgets, className = '' }: DashboardGridProps) {
  const { tenant } = useTenant();
  
  // Get grid column classes based on widget size
  const getGridColClass = (size: WidgetSize): string => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 md:col-span-2 lg:col-span-3';
      case 'full':
        return 'col-span-1 md:col-span-2 lg:col-span-4';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={`${getGridColClass(widget.size)}`}
          style={{ minHeight: widget.minHeight }}
        >
          {widget.component}
        </div>
      ))}
    </div>
  );
}

export default DashboardGrid;