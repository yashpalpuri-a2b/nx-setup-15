'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, User } from '../api/api-client';

// Query keys for users
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Hook to fetch all users
 */
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => apiClient.getUsers(),
    select: (data) => data.users,
    // Add retry logic for transient failures
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    // Fallback data if the API request fails
    placeholderData: {
      users: [
        { id: 'fallback-1', name: 'Fallback User 1', email: 'user1@example.com', role: 'User' },
        { id: 'fallback-2', name: 'Fallback User 2', email: 'user2@example.com', role: 'User' }
      ],
      count: 2,
      timestamp: new Date().toISOString()
    },
  });
}

/**
 * Hook to fetch a specific user by ID
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => apiClient.getUser(id),
    select: (data) => data.user,
    enabled: !!id, // Only run the query if we have an ID
    // Add retry logic for transient failures
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    // Fallback data if the API request fails
    placeholderData: {
      user: { id: 'fallback', name: 'Fallback User', email: 'fallback@example.com', role: 'User' }
    },
  });
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => 
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to create user');
        return res.json();
      }),
    onSuccess: () => {
      // Invalidate the users list query to refetch the data
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}