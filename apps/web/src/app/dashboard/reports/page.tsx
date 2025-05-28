'use client';

import { useState } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';
import { 
  Home,
  BarChart,
  FileText,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

// Mock data for reports
const reportTypes = [
  { id: 'trips', name: 'Trip Reports', icon: <FileText size={20} /> },
  { id: 'usage', name: 'Usage Analytics', icon: <BarChart size={20} /> },
  { id: 'performance', name: 'Performance Metrics', icon: <BarChart size={20} /> },
  { id: 'financial', name: 'Financial Summary', icon: <FileText size={20} /> },
];

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Completed Trips',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#4f46e5',
    },
    {
      label: 'Cancelled Trips',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: '#ef4444',
    }
  ]
};

export default function ReportsPage() {
  const { tenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState('trips');
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-05-31'
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleReportTypeChange = (reportId: string) => {
    setSelectedReport(reportId);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download a report
    console.log(`Exporting ${selectedReport} report for ${tenant.name} from ${dateRange.start} to ${dateRange.end}`);
    alert('Report export started. The file will be downloaded when ready.');
  };

  return (
    <div className="space-y-6">
        {/* Header with breadcrumbs and actions */}
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link href="/dashboard" className="hover:text-foreground">
                <Home size={14} className="inline mr-1" />
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-foreground">
                <BarChart size={14} className="inline mr-1" />
                Reports
              </span>
            </div>
            <h1 className="text-2xl font-bold">Reports</h1>
          </div>
          <button 
            onClick={handleExportReport}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
        
        {/* Report filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <div className="flex flex-wrap gap-2">
                {reportTypes.map(report => (
                  <button
                    key={report.id}
                    onClick={() => handleReportTypeChange(report.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      selectedReport === report.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{report.icon}</span>
                    {report.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={14} className="inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                id="start"
                name="start"
                value={dateRange.start}
                onChange={handleDateRangeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <label htmlFor="end" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={14} className="inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                id="end"
                name="end"
                value={dateRange.end}
                onChange={handleDateRangeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="flex items-end">
              <button 
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 w-full justify-center"
              >
                <Filter size={16} className="mr-2" />
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Report content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">
              {reportTypes.find(r => r.id === selectedReport)?.name} for {tenant.name}
            </h2>
            <p className="text-sm text-gray-500">
              {dateRange.start} to {dateRange.end}
            </p>
          </div>
          
          <div className="p-4">
            {/* This would be a real chart in a production app */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">
                  Chart visualization would appear here.
                </p>
                <p className="text-sm text-gray-400">
                  Using data from {selectedReport} report type
                </p>
              </div>
            </div>
            
            {/* Summary metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Trips</p>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-green-500">+12.5% from previous period</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Avg. Trip Duration</p>
                <p className="text-2xl font-bold">24 min</p>
                <p className="text-xs text-red-500">-2.1% from previous period</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs text-green-500">+1.8% from previous period</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">$45,289</p>
                <p className="text-xs text-green-500">+8.3% from previous period</p>
              </div>
            </div>
            
            {/* Data table */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trips
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cancelled
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                    <tr key={month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {month} 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.floor(Math.random() * 300) + 100}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mockChartData.datasets[0].data[index]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mockChartData.datasets[1].data[index]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(Math.floor(Math.random() * 10000) + 5000).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}