'use client';

import { useState } from 'react';
import { useTenant, useTheme } from '@nx-workspace/multi-tenant';
import { 
  Home,
  Settings,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { tenant } = useTenant();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [formState, setFormState] = useState({
    companyName: tenant.name || '',
    primaryColor: theme?.primaryColor || '#4f46e5',
    logoUrl: '/tenants/default/logo.svg',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    timezone: 'UTC',
    language: 'en-US',
    notificationsEnabled: true,
    emailNotifications: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    console.log('Saving settings:', formState);
    // Show success message
    alert('Settings saved successfully!');
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
                <Settings size={14} className="inline mr-1" />
                Settings
              </span>
            </div>
            <h1 className="text-2xl font-bold">Tenant Settings</h1>
          </div>
          <button 
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
        
        {/* Settings form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Company Information</h2>
                
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formState.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={formState.primaryColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 border border-gray-300 rounded-md shadow-sm"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={formState.primaryColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    id="logoUrl"
                    name="logoUrl"
                    value={formState.logoUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              {/* Localization Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Localization</h2>
                
                <div className="space-y-2">
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={formState.dateFormat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700">
                    Time Format
                  </label>
                  <select
                    id="timeFormat"
                    name="timeFormat"
                    value={formState.timeFormat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formState.timezone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formState.language}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-medium border-b pb-2">Notifications</h2>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notificationsEnabled"
                  name="notificationsEnabled"
                  checked={formState.notificationsEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="notificationsEnabled" className="text-sm font-medium text-gray-700">
                  Enable in-app notifications
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formState.emailNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                  Enable email notifications
                </label>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}