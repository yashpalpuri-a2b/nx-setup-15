import { NextResponse } from 'next/server';

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// Mock user data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
];

// Authentication placeholder - would be replaced with actual auth implementation
const checkAuth = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  
  // This is a placeholder - in a real app, you'd validate JWT tokens, session cookies, etc.
  return {
    isAuthenticated: !!authHeader,
    isAdmin: authHeader?.includes('admin') ?? false,
    user: authHeader ? { id: '1', name: 'Authenticated User' } : null
  };
};

// GET handler to fetch all users
export async function GET(request: Request) {
  // Authentication check
  const { isAuthenticated, isAdmin } = checkAuth(request);
  
  // Optional: Restrict access based on authentication
  // In a real app, you might want to check authentication before returning sensitive data
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Authentication required to access users' },
      { status: 401 }
    );
  }

  // Optional: Role-based access control
  // Restrict certain operations to admin users
  // if (!isAdmin) {
  //   return NextResponse.json(
  //     { error: 'Admin access required' },
  //     { status: 403 }
  //   );
  // }

  try {
    // For demo purposes, we'll return all users
    // In a real app, you might want to paginate results
    return NextResponse.json({
      users,
      count: users.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler to create a new user
export async function POST(request: Request) {
  // Authentication check
  const { isAuthenticated, isAdmin } = checkAuth(request);
  
  // Require authentication for creating users
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Authentication required to create users' },
      { status: 401 }
    );
  }

  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }
    
    // Create a new user (in a real app, this would be saved to a database)
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: data.role || 'user', // Default role
    };
    
    // Add to our mock users array (this is just for demonstration)
    // In a real app, you would save to a database
    users.push(newUser);
    
    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}