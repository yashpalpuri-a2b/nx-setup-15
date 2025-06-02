import { TestButton } from '../components/test-button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-foreground">
            Tailwind CSS Setup ✅
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailwind CSS is now configured with ShadcnUI design tokens and ready for our domain-based UI library.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Test Components</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <TestButton variant="primary" size="sm">Primary Small</TestButton>
              <TestButton variant="primary" size="md">Primary Medium</TestButton>
              <TestButton variant="primary" size="lg">Primary Large</TestButton>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <TestButton variant="secondary" size="md">Secondary</TestButton>
              <TestButton variant="outline" size="md">Outline</TestButton>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              What's Ready:
            </h3>
            <ul className="text-left space-y-2 text-card-foreground">
              <li>• Tailwind CSS configured with ShadcnUI theme</li>
              <li>• CSS variables for light/dark mode support</li>
              <li>• Content paths prepared for domain-based UI library</li>
              <li>• Utility functions (clsx + tailwind-merge)</li>
              <li>• Test component validates the setup works</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
