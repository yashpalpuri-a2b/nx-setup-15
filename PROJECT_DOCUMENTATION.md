# Project Documentation: Nx Workspace with Azure Static Web Apps

## Project Overview

**Project Name:** A2B Phoenix UI  
**Type:** Nx Workspace with Next.js Application  
**Purpose:** Modern React-based web application ready for Azure Static Web Apps deployment  

## Technology Stack

### Core Technologies
- **Nx Workspace** (v21.0.3) - Monorepo tooling and build system
- **Next.js** (v15.2.4) - React framework with App Router
- **React** (v19.0.0) - UI library
- **TypeScript** (v5.7.2) - Type safety and development experience
- **Tailwind CSS** (v3.4.3) - Utility-first CSS framework

### UI & Styling
- **Shadcn UI** - Component library (configured and ready)
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Tailwind CSS** with custom configuration
- **CSS Variables** for theming

### Development & Testing
- **ESLint** - Code linting with custom configuration
- **Jest** - Unit testing framework
- **Playwright** - E2E testing
- **Prettier** - Code formatting
- **SWC** - Fast TypeScript/JavaScript compiler

## Project Structure

```
nx-setup/
├── .github/
│   ├── workflows/
│   │   └── azure-static-web-apps-icy-forest-0ec30e200.yml
│   └── instructions/
├── apps/
│   ├── web/                          # Main Next.js Application
│   │   ├── src/
│   │   │   ├── app/                  # Next.js App Router
│   │   │   │   ├── layout.tsx        # Root layout
│   │   │   │   ├── page.tsx          # Home page
│   │   │   │   ├── global.css        # Global styles with Tailwind
│   │   │   │   └── api/              # API routes
│   │   │   └── components/           # App-specific components
│   │   ├── public/                   # Static assets
│   │   ├── components.json           # Shadcn UI configuration
│   │   ├── next.config.js            # Next.js configuration
│   │   ├── tailwind.config.js        # Tailwind configuration
│   │   ├── project.json              # Nx project configuration
│   │   └── tsconfig.json             # TypeScript configuration
│   └── web-e2e/                      # E2E tests for web app
├── libs/
│   └── ui/                           # Shared UI component library
│       ├── src/
│       ├── project.json
│       └── README.md
├── dist/                             # Build output directory
├── node_modules/                     # Dependencies
├── .nx/                              # Nx cache and metadata
├── docs/                             # Documentation
├── .vscode/                          # VS Code configuration
├── package.json                      # Root dependencies and scripts
├── nx.json                           # Nx workspace configuration
├── tsconfig.base.json                # Base TypeScript configuration
├── eslint.config.mjs                 # ESLint configuration
├── jest.config.ts                    # Jest configuration
├── .prettierrc                       # Prettier configuration
├── .gitignore                        # Git ignore rules
└── README.md                         # Project documentation
```

## Current Azure Static Web Apps Configuration

### GitHub Actions Workflow
**File:** `.github/workflows/azure-static-web-apps-icy-forest-0ec30e200.yml`

**Configuration Details:**
- **Workflow Name:** Azure Static Web Apps CI/CD
- **Triggers:** 
  - Push to `main` branch
  - Pull requests to `main` branch
- **Build Configuration:**
  - App Location: `/` (root directory)
  - API Location: `` (empty - no API)
  - Output Location: `` (empty - using default)
- **Authentication:** Uses GitHub OIDC token and Azure Static Web Apps API token
- **Environment:** Ubuntu Latest

**Current Issues/Considerations:**
1. **Build Path Configuration:** The current setup points to root (`/`) but the actual Next.js app is in `apps/web/`
2. **Output Directory:** Not explicitly set - may need to specify `dist/apps/web` or similar
3. **Build Commands:** No custom build commands specified - relies on Azure SWA auto-detection

## Nx Workspace Configuration

### Key Configuration Files

#### `nx.json`
```json
{
  "extends": "nx/presets/npm.json",
  "plugins": [
    "@nx/next/plugin",
    "@nx/playwright/plugin", 
    "@nx/eslint/plugin",
    "@nx/jest/plugin"
  ],
  "generators": {
    "@nx/next": {
      "application": {
        "style": "tailwind",
        "linter": "eslint"
      }
    }
  }
}
```

#### Available Nx Commands
- `npx nx dev web` - Start development server
- `npx nx build web` - Build the application
- `npx nx test web` - Run unit tests
- `npx nx e2e web-e2e` - Run E2E tests
- `npx nx lint web` - Lint the code
- `npx nx serve-static web` - Serve built application

## Next.js Application Details

### App Configuration
- **Framework:** Next.js 15.2.4 with App Router
- **Nx Integration:** Uses `@nx/next` plugin for seamless integration
- **TypeScript:** Fully configured with strict mode
- **Styling:** Tailwind CSS with custom configuration

### Shadcn UI Setup
- **Configuration File:** `apps/web/components.json`
- **Style:** Default theme
- **Base Color:** Slate
- **CSS Variables:** Enabled for theming
- **Component Aliases:** `@/components` and `@/lib/utils`

### Build Output
- Nx builds the app to `dist/apps/web/` directory
- Static export compatible for Azure Static Web Apps
- Optimized for production deployment

## Dependencies Overview

### Production Dependencies
```json
{
  "@radix-ui/react-icons": "^1.3.2",
  "@radix-ui/react-slot": "^1.2.3", 
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.511.0",
  "next": "~15.2.4",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "tailwind-merge": "^3.3.0",
  "tailwindcss-animate": "^1.0.7"
}
```

### Development Dependencies
- Complete Nx toolchain with plugins
- ESLint with Next.js and React configurations
- Jest and Playwright for testing
- TypeScript with latest version
- Tailwind CSS with PostCSS

## Azure Static Web Apps Deployment Requirements

### Current Setup Analysis
1. **Repository Structure:** ✅ Compatible with Azure SWA
2. **Build Process:** ⚠️ Needs configuration for Nx workspace
3. **Static Export:** ✅ Next.js configured for static export
4. **GitHub Integration:** ✅ Workflow file exists
5. **Authentication:** ✅ OIDC and API tokens configured

### Required Modifications for Optimal Deployment

#### 1. GitHub Actions Workflow Updates
```yaml
# Recommended changes to azure-static-web-apps-icy-forest-0ec30e200.yml
app_location: "/apps/web"           # Point to Next.js app
api_location: ""                    # No API for now
output_location: "out"              # Next.js static export output
```

#### 2. Build Configuration
```bash
# Add custom build command in workflow
npm install
npx nx build web
```

#### 3. Next.js Configuration for Static Export
```javascript
// apps/web/next.config.js additions needed
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

## Development Workflow

### Local Development
1. `npm install` - Install dependencies
2. `npx nx dev web` - Start development server
3. `npx nx build web` - Build for production
4. `npx nx serve-static web` - Test production build

### Testing
1. `npx nx test web` - Unit tests
2. `npx nx e2e web-e2e` - End-to-end tests  
3. `npx nx lint web` - Code linting

### Code Generation
1. `npx nx g @nx/react:component` - Generate React components
2. `npx nx g @nx/next:page` - Generate Next.js pages
3. `npx shadcn-ui add button` - Add Shadcn UI components

## Key Features Ready for Development

1. **Modern React Stack:** Next.js 15 with App Router
2. **Type Safety:** Full TypeScript configuration
3. **UI Components:** Shadcn UI ready to use
4. **Styling System:** Tailwind CSS with theming
5. **Testing Setup:** Jest and Playwright configured
6. **Code Quality:** ESLint and Prettier configured
7. **Monorepo Benefits:** Nx workspace for scalability

## Deployment Checklist for Azure Static Web Apps

### Pre-deployment Tasks
- [ ] Update GitHub Actions workflow with correct paths
- [ ] Configure Next.js for static export
- [ ] Test local build process
- [ ] Verify environment variables setup
- [ ] Test routing and navigation

### Post-deployment Tasks  
- [ ] Configure custom domain (if needed)
- [ ] Set up Azure CDN (if needed)
- [ ] Configure authentication providers
- [ ] Set up monitoring and analytics
- [ ] Configure staging environments

## Environment Configuration

### Local Development
- Node.js version: Latest LTS recommended
- Package manager: npm (lockfile present)
- IDE: VS Code with Nx Console recommended

### Production (Azure Static Web Apps)
- Build runtime: Node.js (managed by Azure)
- Deploy location: Global CDN
- SSL: Automatic HTTPS
- Custom domains: Supported

---

**Note:** This documentation is current as of the project state and should be updated as the project evolves. For detailed Azure Static Web Apps setup discussion, focus on the workflow configuration, build process optimization, and Next.js static export configuration. 