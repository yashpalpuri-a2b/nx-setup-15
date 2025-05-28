'use client';

import { useTenantData } from '@nx-workspace/data-access';
import { RefreshCw } from 'lucide-react';
import { BaseWidget } from './base-widget';

export interface StatItem {
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

export interface StatsWidgetProps {
  title: string;
  stats: StatItem[];
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onRetry?: () => void;
}

export function StatsWidget({
  title,
  stats,
  className = '',
  isLoading = false,
  error = null,
  onRefresh,
}: StatsWidgetProps) {
  const actions = onRefresh
    ? [
        {
          icon: <RefreshCw className="h-4 w-4" />,
          label: 'Refresh',
          onClick: onRefresh,
        },
      ]
    : [];

  return (
    <BaseWidget
      title={title}
      isLoading={isLoading}
      error={error}
      actions={actions}
      className={className}
      onRetry={onRefresh}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-3 rounded-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              {stat.icon && <div className="text-gray-400">{stat.icon}</div>}
            </div>
            {stat.change && (
              <div
                className={`mt-2 text-sm ${
                  stat.change.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change.isPositive ? '↑' : '↓'} {Math.abs(stat.change.value)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}

export function TenantStatsWidget({ className = '' }: { className?: string }) {
  const { data, isLoading, error, refetch } = useTenantData();

  const stats: StatItem[] = [
    {
      label: 'Active Users',
      value: data?.data?.stats?.users || 0,
      change: {
        value: 12.5,
        isPositive: true,
      },
    },
    {
      label: 'Projects',
      value: data?.data?.stats?.projects || 0,
      change: {
        value: 5.2,
        isPositive: true,
      },
    },
    {
      label: 'Tasks',
      value: data?.data?.stats?.tasks || 0,
      change: {
        value: 3.1,
        isPositive: false,
      },
    },
    {
      label: 'Completion Rate',
      value: '87%',
      change: {
        value: 2.3,
        isPositive: true,
      },
    },
  ];

  return (
    <StatsWidget
      title="Key Metrics"
      stats={stats}
      isLoading={isLoading}
      error={error as Error}
      onRefresh={() => refetch()}
      onRetry={() => refetch()}
      className={className}
    />
  );
}

export default TenantStatsWidget;