import { cn } from '../lib/utils';

interface TestButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TestButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className 
}: TestButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant styles
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === 'primary',
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === 'secondary',
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === 'outline',
        },
        // Size styles
        {
          "h-8 px-3 text-sm": size === 'sm',
          "h-10 px-4 text-sm": size === 'md',
          "h-12 px-6 text-base": size === 'lg',
        },
        className
      )}
    >
      {children}
    </button>
  );
} 