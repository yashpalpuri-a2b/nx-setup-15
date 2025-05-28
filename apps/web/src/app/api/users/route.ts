import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const users = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager'
  },
  {
    id: 'user-3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Operator'
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Driver'
  },
  {
    id: 'user-5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'Support'
  }
];

export async function GET(request: NextRequest) {
  // In a real app, you would fetch users from a database
  // and implement pagination, filtering, etc.
  
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    users,
    count: users.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const newUser = await request.json();
    
    // In a real app, you would validate the input and save to a database
    const user = {
      id: `user-${users.length + 1}`,
      ...newUser
    };
    
    // Add the new user to our mock data
    users.push(user);
    
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
}