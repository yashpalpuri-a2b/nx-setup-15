'use client';

import { ReactNode } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';

export interface WidgetAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface BaseWidgetProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  actions?: WidgetAction[];
  className?: string;
  onRetry?: () => void;
}

export function BaseWidget({
  title,
  children,
  isLoading = false,
  error = null,
  actions = [],
  className = '',
  onRetry,
}: BaseWidgetProps) {
  const { tenant } = useTenant();
  
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h2 className="text-lg font-semibold">{title}</h2>
        {actions.length > 0 && (
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                title={action.label}
                aria-label={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <div className="text-red-500 mb-4">
              <p className="font-semibold">Error loading data</p>
              <p className="text-sm">{error.message}</p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default BaseWidget;