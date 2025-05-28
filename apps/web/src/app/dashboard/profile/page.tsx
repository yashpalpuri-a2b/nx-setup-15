'use client';

import { useState } from 'react';
import { useTenant } from '@nx-workspace/multi-tenant';
import { 
  Home,
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Camera,
  Shield
} from 'lucide-react';
import Link from 'next/link';

// Mock user data
const mockUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Administrator',
  department: 'Operations',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  joinDate: '2023-05-15',
  lastLogin: '2025-05-21T08:30:00Z',
  twoFactorEnabled: true,
  notificationPreferences: {
    email: true,
    sms: false,
    inApp: true
  }
};

export default function ProfilePage() {
  const { tenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [formState, setFormState] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    department: mockUser.department,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: mockUser.twoFactorEnabled,
    notificationPreferences: { ...mockUser.notificationPreferences }
  });
  const [activeTab, setActiveTab] = useState('personal');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., notificationPreferences.email)
      const [parent, child] = name.split('.');
      setFormState(prev => {
        if (parent === 'notificationPreferences') {
          return {
            ...prev,
            notificationPreferences: {
              ...prev.notificationPreferences,
              [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            }
          };
        }
        return prev;
      });
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the profile to the backend
    console.log('Saving profile:', formState);
    // Show success message
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
        {/* Header with breadcrumbs */}
        <div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Link href="/dashboard" className="hover:text-foreground">
              <Home size={14} className="inline mr-1" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">
              <User size={14} className="inline mr-1" />
              Profile
            </span>
          </div>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        
        {/* Profile content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Profile header */}
          <div className="bg-primary/5 p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 border-b">
            <div className="relative">
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-sm text-gray-500">{mockUser.role} at {tenant.name}</p>
              <p className="text-sm text-gray-500">Member since {new Date(mockUser.joinDate).toLocaleDateString()}</p>
            </div>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <button 
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'personal' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User size={16} className="inline mr-2" />
                Personal Information
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'security' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Shield size={16} className="inline mr-2" />
                Security
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'notifications' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bell size={16} className="inline mr-2" />
                Notifications
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        <User size={14} className="inline mr-1" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        <Mail size={14} className="inline mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        <Phone size={14} className="inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formState.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700">User ID</p>
                        <p className="text-sm text-gray-500">{mockUser.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Role</p>
                        <p className="text-sm text-gray-500">{mockUser.role}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Member Since</p>
                        <p className="text-sm text-gray-500">{new Date(mockUser.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Last Login</p>
                        <p className="text-sm text-gray-500">{new Date(mockUser.lastLogin).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">Change Password</h3>
                    
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        <Lock size={14} className="inline mr-1" />
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formState.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        <Lock size={14} className="inline mr-1" />
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formState.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        <Lock size={14} className="inline mr-1" />
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium border-b pb-2">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="twoFactorEnabled"
                        name="twoFactorEnabled"
                        checked={formState.twoFactorEnabled}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="twoFactorEnabled" className="text-sm font-medium text-gray-700">
                        Enable two-factor authentication
                      </label>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Two-factor authentication adds an extra layer of security to your account. 
                      In addition to your password, you'll need to enter a code that we'll send to your phone.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium border-b pb-2">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notificationPreferences.email"
                        name="notificationPreferences.email"
                        checked={formState.notificationPreferences.email}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="notificationPreferences.email" className="text-sm font-medium text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notificationPreferences.sms"
                        name="notificationPreferences.sms"
                        checked={formState.notificationPreferences.sms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="notificationPreferences.sms" className="text-sm font-medium text-gray-700">
                        SMS Notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notificationPreferences.inApp"
                        name="notificationPreferences.inApp"
                        checked={formState.notificationPreferences.inApp}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="notificationPreferences.inApp" className="text-sm font-medium text-gray-700">
                        In-App Notifications
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
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
    </div>
  );
}

// Bell component for notifications tab
function Bell(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}