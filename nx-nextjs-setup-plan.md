# Nx Workspace with Next.js TypeScript Frontend Plan

## Overview

This plan outlines the creation of a basic Nx workspace with a Next.js TypeScript application called 'web' under the apps folder. This setup will serve as a foundation for a micro-frontend architecture, allowing for easy addition of more frontend applications and shared libraries later. The Next.js app will include a basic API setup using Next.js Route Handlers.

## Directory Structure

```
nx-workspace/
├── apps/
│   └── web/                # The Next.js TypeScript frontend application
│       ├── app/            # Next.js app directory (App Router)
│       │   ├── api/        # API route handlers
│       │   │   ├── hello/  # Example API endpoint
│       │   │   │   └── route.ts
│       │   │   └── users/  # Example API endpoint
│       │   │       └── route.ts
│       │   └── page.tsx    # Main page
│       ├── public/         # Static assets
│       ├── project.json
│       ├── tsconfig.json
│       └── next.config.js
├── libs/                   # Will contain shared libraries later
│   ├── ui/                 # (Future) Shared UI components
│   ├── auth/               # (Future) Authentication library
│   └── utils/              # (Future) Shared utilities
├── tools/                  # Workspace tooling
├── nx.json                 # Nx configuration
├── package.json            # Workspace dependencies
└── tsconfig.base.json      # Base TypeScript configuration
```

## Implementation Plan

### 1. Create the Nx Workspace

Use the Nx CLI to create a new workspace with the following characteristics:
- Integrated monorepo style (not standalone)
- Package-based (npm workspaces)
- No preset (custom setup)

### 2. Add the Next.js Application

Add a Next.js application with TypeScript support using Nx generators:
- Name: web
- Location: apps/web
- Configuration: App Router (latest Next.js pattern)
- CSS: Tailwind CSS (standard for modern Next.js apps)
- State management: None (will be added later as needed)
- ESLint and testing setup included

### 3. Set Up Basic API Routes

Set up API routes using Next.js App Router's Route Handlers:
- Create an api directory within the app directory
- Implement sample API endpoints (hello, users)
- Configure proper TypeScript typing for request/response handling
- Set up error handling for API routes

### 4. Configure for Future Expansion

- Configure path aliases in tsconfig.base.json for future shared libraries
- Set up the monorepo structure to support additional applications
- Ensure the Nx.json configuration is optimized for a micro-frontend approach

## Setup Commands

The implementation will require these commands:

```bash
# 1. Create the Nx workspace
npx create-nx-workspace@latest nx-workspace --preset=npm

# 2. Move into the workspace directory
cd nx-workspace

# 3. Add the necessary Nx plugins
npm install -D @nx/next

# 4. Generate the Next.js application
nx g @nx/next:app web --directory=apps/web --appDir --style=tailwind
```

## API Implementation Details

The API routes will use Next.js App Router's Route Handlers, which provide a modern way to create API endpoints:

```typescript
// apps/web/app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' });
}

// apps/web/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Mock user data (would connect to a database in a real app)
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  
  return NextResponse.json(users);
}
```

## Mermaid Diagram of Architecture

```mermaid
graph TD
    A[Nx Workspace] --> B[apps]
    A --> C[libs]
    B --> D[web - Next.js App]
    C --> E[future shared libs]
    D --> F[app directory]
    F --> L[api Routes]
    F --> M[page.tsx]
    L --> N[hello/route.ts]
    L --> O[users/route.ts]
    D --> G[public assets]
    D --> H[configs]
    E --> I[ui]
    E --> J[auth]
    E --> K[utils]