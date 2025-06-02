import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-foreground">
            Task 2: ShadcnUI Base Setup ✅
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ShadcnUI is now configured and working with our Nx monorepo setup!
          </p>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">ShadcnUI Button Variants</h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              ✅ Task 2 Complete - What's Ready:
            </h3>
            <ul className="text-left space-y-2 text-card-foreground">
              <li>• ShadcnUI components.json configured</li>
              <li>• Required dependencies installed (@radix-ui, class-variance-authority)</li>
              <li>• Path aliases (@/) configured for imports</li>
              <li>• Button component working with all variants</li>
              <li>• Ready for Task 3: UI Library Creation</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              <strong>Next:</strong> Task 3 - Create UI Library with Domain-Based Structure (libs/ui/)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
