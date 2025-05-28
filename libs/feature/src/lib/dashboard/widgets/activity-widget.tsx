'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';
import { useUsers } from '@nx-workspace/data-access';
import { BaseWidget } from './base-widget';
import { RefreshCw, Filter } from 'lucide-react';

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  status?: 'completed' | 'pending' | 'failed';
}

export interface ActivityWidgetProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onRetry?: () => void;
  maxItems?: number;
}

export function ActivityWidget({
  title,
  activities,
  className = '',
  isLoading = false,
  error = null,
  onRefresh,
  maxItems = 5,
}: ActivityWidgetProps) {
  const [filter, setFilter] = useState<string | null>(null);
  
  const actions = [
    ...(onRefresh
      ? [
          {
            icon: <RefreshCw className="h-4 w-4" />,
            label: 'Refresh',
            onClick: onRefresh,
          },
        ]
      : []),
    {
      icon: <Filter className="h-4 w-4" />,
      label: 'Filter',
      onClick: () => setFilter(filter ? null : 'completed'),
    },
  ];

  const filteredActivities = filter
    ? activities.filter((activity) => activity.status === filter)
    : activities;

  const displayActivities = filteredActivities.slice(0, maxItems);

  return (
    <BaseWidget
      title={title}
      isLoading={isLoading}
      error={error}
      actions={actions}
      className={className}
      onRetry={onRefresh}
    >
      <div className="space-y-4">
        {displayActivities.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No recent activities found.</p>
        ) : (
          displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-0">
              <div className="flex-shrink-0">
                {activity.user.avatar ? (
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    {activity.user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-semibold">{activity.user.name}</span> {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
              {activity.status && (
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
        
        {filteredActivities.length > maxItems && (
          <div className="text-center">
            <button className="text-sm text-primary hover:text-primary-dark font-medium">
              View all activities
            </button>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}

export function RecentActivityWidget({ className = '' }: { className?: string }) {
  const { tenant } = useTenant();
  const { data: usersData, isLoading: usersLoading, error: usersError, refetch } = useUsers();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Initial empty state for server-side rendering
  useEffect(() => {
    if (usersData) {
      // Generate sample activities based on users
      // In a real app, this would come from an API
      const generateActivities = () => {
        const actions = ['created', 'updated', 'deleted', 'assigned', 'completed'];
        const targets = ['a task', 'a project', 'a document', 'a report', 'a meeting'];
        const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
        
        return (usersData || []).slice(0, 10).map((user, index) => {
          const date = new Date();
          date.setHours(date.getHours() - index);
          
          return {
            id: `activity-${index}`,
            user: {
              name: user.name,
            },
            action: actions[Math.floor(Math.random() * actions.length)],
            target: targets[Math.floor(Math.random() * targets.length)],
            // Format the date only on the client side
            timestamp: date.toLocaleString(),
            status: index % 3 === 0 ? undefined : statuses[index % statuses.length],
          };
        });
      };
      
      // Only generate activities on the client side
      setActivities(generateActivities());
    }
  }, [usersData, tenant.id]);

  return (
    <ActivityWidget
      title="Recent Activity"
      activities={activities}
      isLoading={usersLoading}
      error={usersError as Error}
      onRefresh={() => refetch()}
      onRetry={() => refetch()}
      className={className}
    />
  );
}

export default RecentActivityWidget;