import { Button } from '@nx-setup/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-foreground">
            Task 3: UI Library Creation ✅
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            UI Library is now created following Nx&apos;s domain-based approach (libs/ui/)!
          </p>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">UI Library Button Components</h2>
            
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
              ✅ Task 3 Complete - UI Library Structure:
            </h3>
            <ul className="text-left space-y-2 text-card-foreground">
              <li>• Created libs/ui/ following domain-based approach</li>
              <li>• Button component moved to @nx-setup/ui library</li>
              <li>• Utils (cn function) moved to UI library</li>
              <li>• TypeScript path mapping configured (@nx-setup/ui)</li>
              <li>• No bundler (Vite) - using TypeScript compilation only</li>
              <li>• SWC Jest configuration for better performance</li>
              <li>• Ready for Task 4: Basic Component Development</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              <strong>Next:</strong> Task 4 - Add more basic components (Input, Card, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
