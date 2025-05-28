'use client';

import { useState } from 'react';
import { useUsers, useCreateUser } from '@nx-workspace/data-access';
import { useTenant } from '@nx-workspace/multi-tenant';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Home,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  const { tenant } = useTenant();
  const { data: users, isLoading, isError, error } = useUsers();
  const createUser = useCreateUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateUser = () => {
    // In a real app, this would open a modal or navigate to a form
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user'
    };
    
    createUser.mutate(newUser);
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
                <Users size={14} className="inline mr-1" />
                Users
              </span>
            </div>
            <h1 className="text-2xl font-bold">Users</h1>
          </div>
          <button 
            onClick={handleCreateUser}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} className="mr-2" />
            Add User
          </button>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Error state */}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        )}
        
        {/* Users table */}
        {!isLoading && !isError && users && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Pencil size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No users found for {tenant.name}</p>
                <button 
                  onClick={handleCreateUser}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Plus size={16} className="mr-2" />
                  Add your first user
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}