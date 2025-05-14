# Next.js TypeScript Project with Nx

## Overview

This project is a Next.js application with TypeScript, built using the Nx monorepo structure. It provides a modern web development setup with the following features:

- Next.js with App Router (App Directory)
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code linting
- Jest for unit testing
- Playwright for end-to-end testing

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd nx-workspace
npm install
```

### Development

To start the development server:

```bash
npx nx dev web
```

This will start the Next.js development server on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
nx-workspace/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── public/             # Static files
│   │   ├── src/                # Source code
│   │   │   ├── app/            # App Router pages and layouts
│   │   │   │   ├── api/        # API routes
│   │   │   │   │   ├── hello/  # Hello API endpoint
│   │   │   │   │   └── users/  # Users API endpoint
│   │   │   │   ├── layout.tsx  # Root layout
│   │   │   │   └── page.tsx    # Home page
│   │   ├── specs/              # Component tests
│   │   └── ...                 # Configuration files
│   └── web-e2e/                # End-to-end tests
└── packages/                   # Shared libraries (empty now)
```

## Available Commands

### Development

```bash
# Start development server
npx nx dev web

# Build for production
npx nx build web

# Run tests
npx nx test web

# Run e2e tests
npx nx e2e web-e2e
```

### Nx Commands

```bash
# Generate UI library
npx nx g @nx/next:library ui

# Add a component
npx nx g @nx/next:component ui/src/lib/button

# Show project details
npx nx show project web --web

# View interactive project graph
npx nx graph
```

## API Endpoints

### Hello API

- Endpoint: `/api/hello`
- Method: GET
- Description: Simple endpoint with authentication placeholders
- Response: JSON with greeting message

### Users API

- Endpoints: `/api/users`
- Methods: GET, POST
- Description: CRUD operations for users with authentication placeholders
- Response: JSON with user data

Both endpoints include authentication placeholders that can be expanded into full authentication systems in the future.

## Future Plans

This project will be extended with:

- Authentication library integration
- UI component library with Storybook
- State management
- Database integration
- Additional microservices
- CI/CD pipeline

## Development Guidelines

### Creating New Components

```bash
npx nx g @nx/next:component <component-name> --project=web
```

### Creating Libraries

```bash
npx nx g @nx/next:library <library-name>
```

### Adding API Routes

Create a new directory in `apps/web/src/app/api/<route-name>` and add a `route.ts` file with appropriate HTTP method handlers.

## Contributing

1. Follow the existing code style and structure
2. Write tests for new features
3. Update this documentation for significant changes