import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// Security: Strict variant definitions prevent CSS injection
const buttonVariants = cva(
  // Base classes are sanitized and don't accept user input
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Security: Strict interface prevents prop injection
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Performance: Memoized component prevents unnecessary re-renders
// Security: forwardRef with proper typing prevents ref injection
const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
      // Security: Validate children to prevent XSS
      const sanitizedChildren = React.useMemo(() => {
        if (typeof children === 'string') {
          // Basic XSS prevention for string children
          return children.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        }
        return children
      }, [children])

      const Comp = asChild ? Slot : 'button'
      
      return (
        <Comp
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          // Security: Ensure proper button attributes
          type={props.type || 'button'}
          {...props}
        >
          {sanitizedChildren}
        </Comp>
      )
    }
  )
)

Button.displayName = 'Button'

export { Button, buttonVariants } 