'use client';

import { useUsers, useUser, useCreateUser } from '../hooks/use-users';
import { useState } from 'react';

/**
 * Example component that demonstrates the use of React Query hooks
 * for fetching and displaying user data
 */
export function UserDataExample() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Fetch all users
  const { 
    data: users, 
    isLoading: isUsersLoading, 
    error: usersError,
    refetch: refetchUsers
  } = useUsers();
  
  // Fetch a specific user when selectedUserId is set
  const { 
    data: selectedUser, 
    isLoading: isUserLoading,
    error: userError
  } = useUser(selectedUserId || '');
  
  // Mutation for creating a new user
  const { 
    mutate: createUser, 
    isPending: isCreating,
    error: createError
  } = useCreateUser();
  
  // Handle user selection
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };
  
  // Handle creating a new user
  const handleCreateUser = () => {
    createUser({
      name: 'New User',
      email: `user${Date.now()}@example.com`,
      role: 'user'
    });
  };
  
  // Handle errors
  if (usersError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <h3 className="font-bold">Error loading users</h3>
        <p>{usersError.message}</p>
        <button 
          onClick={() => refetchUsers()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Data Example</h2>
      
      {/* Loading state */}
      {isUsersLoading ? (
        <div className="animate-pulse bg-gray-200 h-40 rounded"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Users list */}
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Users List</h3>
            <ul className="space-y-2">
              {users?.map(user => (
                <li 
                  key={user.id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedUserId === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectUser(user.id)}
                >
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-xs text-gray-500">Role: {user.role}</div>
                </li>
              ))}
            </ul>
            
            {/* Create user button */}
            <button
              onClick={handleCreateUser}
              disabled={isCreating}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            >
              {isCreating ? 'Creating...' : 'Create New User'}
            </button>
            
            {createError && (
              <div className="mt-2 text-sm text-red-600">
                Error creating user: {createError.message}
              </div>
            )}
          </div>
          
          {/* Selected user details */}
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">User Details</h3>
            
            {!selectedUserId ? (
              <p className="text-gray-500">Select a user to view details</p>
            ) : isUserLoading ? (
              <div className="animate-pulse bg-gray-200 h-20 rounded"></div>
            ) : userError ? (
              <div className="text-red-600">
                Error loading user: {userError.message}
              </div>
            ) : selectedUser ? (
              <div>
                <div className="text-lg font-medium">{selectedUser.name}</div>
                <div className="text-gray-600">{selectedUser.email}</div>
                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block text-sm">
                  {selectedUser.role}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}