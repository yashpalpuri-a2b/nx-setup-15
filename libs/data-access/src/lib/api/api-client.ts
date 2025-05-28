/**
 * API client for making requests to the backend
 */

// Base URL for API requests
const API_BASE_URL = '/api';

/**
 * Generic fetch function with error handling
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API error: ${response.status} ${response.statusText}`
      );
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * API client object with methods for different endpoints
 */
export const apiClient = {
  /**
   * Get all users
   */
  getUsers: () => fetchApi<{ users: User[]; count: number; timestamp: string }>('/users'),

  /**
   * Get a specific user by ID
   */
  getUser: (id: string) => fetchApi<{ user: User }>(`/users/${id}`),

  /**
   * Get tenant-specific data
   */
  getTenantData: (tenantId: string) => 
    fetchApi<{ data: any }>(`/tenants/${tenantId}/data`),
};

/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}