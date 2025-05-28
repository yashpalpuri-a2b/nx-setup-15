'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';
import { useTenantData } from '@nx-workspace/data-access';
import { BaseWidget } from './base-widget';
import { RefreshCw, BarChart2, LineChart, PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'pie';

export interface ChartWidgetProps {
  title: string;
  data: any[];
  type?: ChartType;
  xDataKey: string;
  yDataKey: string;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onRetry?: () => void;
  onChangeChartType?: (type: ChartType) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function ChartWidget({
  title,
  data,
  type = 'line',
  xDataKey,
  yDataKey,
  className = '',
  isLoading = false,
  error = null,
  onRefresh,
  onChangeChartType,
}: ChartWidgetProps) {
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
    ...(onChangeChartType
      ? [
          {
            icon: <LineChart className="h-4 w-4" />,
            label: 'Line Chart',
            onClick: () => onChangeChartType('line'),
          },
          {
            icon: <BarChart2 className="h-4 w-4" />,
            label: 'Bar Chart',
            onClick: () => onChangeChartType('bar'),
          },
          {
            icon: <PieChart className="h-4 w-4" />,
            label: 'Pie Chart',
            onClick: () => onChangeChartType('pie'),
          },
        ]
      : []),
  ];

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yDataKey} fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey={yDataKey}
                nameKey={xDataKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yDataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <BaseWidget
      title={title}
      isLoading={isLoading}
      error={error}
      actions={actions}
      className={className}
      onRetry={onRefresh}
    >
      {renderChart()}
    </BaseWidget>
  );
}

export function TenantActivityChart({ className = '' }: { className?: string }) {
  const { tenant } = useTenant();
  const { data: tenantData, isLoading, error, refetch } = useTenantData();
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<any[]>([]);

  // Memoize the chart type change handler to prevent it from being recreated on each render
  const handleChartTypeChange = useCallback((type: ChartType) => {
    setChartType(type);
  }, []);

  useEffect(() => {
    // Only update chart data when tenantData actually changes and has the expected structure
    if (tenantData?.data?.weeklyActivity) {
      // Use the weekly activity data from the API
      setChartData(tenantData.data.weeklyActivity);
    } else if (!isLoading) {
      // Fallback to empty data if API data is not available and not loading
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      setChartData(days.map(day => ({ day, users: 0, tasks: 0, revenue: 0 })));
    }
    // Only depend on the specific properties we need, not the entire tenantData object
  }, [tenantData?.data?.weeklyActivity, isLoading]);

  // Memoize the refetch callback to prevent it from being recreated on each render
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ChartWidget
      title="Weekly Activity"
      data={chartData}
      type={chartType}
      xDataKey="day"
      yDataKey="users"
      isLoading={isLoading}
      error={error as Error}
      onRefresh={handleRefetch}
      onRetry={handleRefetch}
      onChangeChartType={handleChartTypeChange}
      className={className}
    />
  );
}

export default TenantActivityChart;