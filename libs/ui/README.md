# @nx-setup/ui

A modern, secure, and accessible React UI component library built with:
- **Tailwind CSS** for styling with design tokens
- **Radix UI** primitives for accessibility
- **TypeScript** for type safety and developer experience
- **Jest + Testing Library** for comprehensive testing
- **Security-first** approach with XSS prevention

## 🚀 Installation & Usage

```bash
# Internal monorepo usage with path mapping
import { Button } from '@nx-setup/ui'
```

### Basic Button Example

```tsx
import { Button } from '@nx-setup/ui'

export function MyComponent() {
  return (
    <div className="space-y-4">
      <Button>Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button size="lg" variant="destructive">
        Large Destructive Button
      </Button>
      <Button asChild>
        <a href="/link">Link as Button</a>
      </Button>
    </div>
  )
}
```

## 🛡️ Security Features

### XSS Prevention
- **Content Sanitization**: Automatic removal of `<script>` tags from string children
- **CSS Injection Protection**: Class name sanitization prevents malicious CSS
- **Safe Defaults**: All components have secure default props

### Secure Development
- **Strict TypeScript**: Comprehensive type checking prevents runtime errors
- **Explicit Exports**: Only intended APIs are exposed from the library
- **Security Testing**: Automated tests for XSS and injection vulnerabilities

## 🎨 Available Components

### Button
A versatile, accessible button component with comprehensive variant support.

**Variants:**
- `default` - Primary brand button
- `destructive` - For dangerous/delete actions  
- `outline` - Secondary outlined button
- `secondary` - Subtle secondary button
- `ghost` - Minimal hover-only button
- `link` - Text link styled as button

**Sizes:**
- `sm` - Compact button (h-9)
- `default` - Standard button (h-10)
- `lg` - Large button (h-11)
- `icon` - Square icon button (h-10 w-10)

**Props Interface:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean // Renders as Slot for composition
}
```

**Security Features:**
- XSS protection for string children
- CSS injection prevention in className
- Safe prop validation
- Memoized for performance

## 🛠️ Development

### Running Tests
```bash
# Run all UI library tests
npx nx test ui

# Run tests in watch mode
npx nx test ui --watch

# Run tests with coverage
npx nx test ui --coverage
```

### Building the Library
```bash
# Build for production
npx nx build ui

# Check build output
ls dist/libs/ui/
```

### Development Server
```bash
# Start web app with UI library
npx nx dev web

# Visit http://localhost:3000 (or 3001 if 3000 is in use)
```

## 🏗️ Architecture

### Security-First Design
```
libs/ui/src/
├── components/          # React components
│   ├── button/
│   │   ├── button.tsx      # Secure component with XSS prevention
│   │   ├── button.test.tsx # Security & functionality tests
│   │   └── index.ts        # Explicit exports only
│   └── index.ts         # Component barrel exports
├── utils/               # Utility functions
│   ├── cn.ts           # Secure class name merger with caching
│   └── index.ts        # Explicit utility exports
├── hooks/              # Future custom hooks
├── types/              # Shared TypeScript types
└── index.ts            # Main library exports (tree-shaking friendly)
```

### Performance Optimizations
- **Memoized Components**: React.memo prevents unnecessary re-renders
- **Class Name Caching**: Repeated class combinations are cached
- **Tree Shaking**: Explicit exports enable optimal bundling
- **Minimal Bundle**: No unnecessary dependencies

### Accessibility Standards
- **WCAG 2.1 AA Compliant**: All components meet accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order

## 🧪 Testing Strategy

### Comprehensive Test Coverage
```typescript
// Security tests
describe('Security', () => {
  it('should sanitize malicious script content')
  it('should prevent CSS injection through className')
})

// Functionality tests  
describe('Functionality', () => {
  it('renders with default props')
  it('handles all variants correctly')
  it('respects disabled state')
})

// Accessibility tests
describe('Accessibility', () => {
  it('has proper focus management')
  it('supports keyboard interaction')
})
```

### Test Commands
```bash
# Security tests
npx nx test ui --testNamePattern="Security"

# Functionality tests
npx nx test ui --testNamePattern="Functionality"

# Accessibility tests
npx nx test ui --testNamePattern="Accessibility"
```

## 🎯 Roadmap

### ✅ Phase 1: Foundation (Complete)
- [x] Button component with all variants and sizes
- [x] Secure utility functions (cn with XSS prevention)
- [x] Comprehensive TypeScript setup
- [x] Security-focused Jest configuration
- [x] Performance optimizations (memoization, caching)

### 🔄 Phase 2: Core Components (Next)
- [ ] Input component with validation
- [ ] Card component with composition
- [ ] Badge component with variants
- [ ] Avatar component with fallbacks

### 📋 Phase 3: Form Components
- [ ] Form wrapper with validation
- [ ] Select component with search
- [ ] Checkbox and Radio components
- [ ] Switch component

### 🧭 Phase 4: Navigation
- [ ] Navigation menu components
- [ ] Breadcrumb component
- [ ] Tabs component
- [ ] Pagination component

### 💫 Phase 5: Advanced Features
- [ ] Modal/Dialog components
- [ ] Dropdown menu components  
- [ ] Toast notification system
- [ ] Theme customization system

## 🤝 Contributing

### Adding a New Component

1. **Create component directory:**
```bash
mkdir libs/ui/src/components/new-component
```

2. **Create required files:**
```
new-component/
├── new-component.tsx      # Component implementation
├── new-component.test.tsx # Comprehensive tests
└── index.ts              # Explicit exports
```

3. **Component template:**
```typescript
import * as React from 'react'
import { cn } from '../../utils/cn'

export interface NewComponentProps {
  // Define props with security in mind
}

const NewComponent = React.memo(
  React.forwardRef<HTMLElement, NewComponentProps>(
    ({ className, children, ...props }, ref) => {
      // Implement with security and accessibility
      return (
        <div
          className={cn('base-classes', className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }
  )
)

NewComponent.displayName = 'NewComponent'
export { NewComponent }
```

4. **Update exports:**
```typescript
// src/components/index.ts
export * from './new-component'
```

### Code Standards
- **Security First**: Always sanitize user inputs and prevent XSS
- **Accessibility**: WCAG 2.1 AA compliance for all components
- **Performance**: Use React.memo and useMemo appropriately
- **Testing**: Security, functionality, and accessibility tests
- **TypeScript**: Strict type checking with explicit interfaces

### Development Workflow
1. Write security tests first
2. Implement component with XSS prevention
3. Add functionality tests
4. Ensure accessibility compliance
5. Document usage examples
6. Update exports and README

## 📊 Bundle Analysis

```bash
# Analyze bundle size
npx nx build ui --analyze

# Check for security vulnerabilities
npm audit

# TypeScript strict checks
npx tsc --noEmit --strict
```

## 📝 License

MIT License - This library is open source and secure by design.

## 🆘 Support & Security

### General Support
1. Check this README and component documentation
2. Review test files for usage examples  
3. Check existing issues in the repository
4. Create a new issue with detailed reproduction steps

### Performance Issues
1. Verify you're using the latest version
2. Check bundle analyzer output
3. Ensure proper tree-shaking configuration
4. Review component memoization usage 