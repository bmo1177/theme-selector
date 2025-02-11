
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/calendar">Calendrier</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin">Connexion Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
