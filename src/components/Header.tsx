import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Design Patterns
            </h1>
            <p className="text-sm text-muted-foreground">
              Master GL 2024-2025 - Spécification et Conception Logicielles
            </p>
          </div>
          <Button variant="outline">Connexion Admin</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;