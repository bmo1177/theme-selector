
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";

interface Student {
  name: string;
}

interface PatternCardProps {
  name: string;
  students: Student[];
  date?: string;
  status: "available" | "assigned" | "pending";
}

const patternDefinitions: Record<string, { description: string, example: string }> = {
  "Factory": {
    description: "Un patron de conception qui fournit une interface pour créer des objets dans une super-classe, tout en permettant aux sous-classes de modifier le type d'objets créés.",
    example: "Création de documents dans une application (PDF, Word, etc.)"
  },
  "Abstract Factory": {
    description: "Fournit une interface pour créer des familles d'objets liés ou dépendants sans spécifier leurs classes concrètes.",
    example: "Création de composants d'interface utilisateur pour différents systèmes d'exploitation"
  },
  // Add definitions for other patterns
};

const PatternCard = ({ name, students, date, status }: PatternCardProps) => {
  const definition = patternDefinitions[name];

  return (
    <Card className="pattern-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-heading">
            {name}
            {definition && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{name}</SheetTitle>
                    <SheetDescription className="text-left space-y-4">
                      <p>{definition.description}</p>
                      <div>
                        <strong>Exemple :</strong>
                        <p>{definition.example}</p>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}
          </CardTitle>
          <span className={`status-badge ${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {students.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Étudiants assignés :</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {students.map((student, index) => (
                <li key={index}>{student.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun étudiant assigné</p>
        )}
        {date && (
          <p className="text-sm text-muted-foreground mt-2">
            Date de présentation : {date}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {status === "available" ? (
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link to="/request">Demander ce pattern</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            disabled
          >
            {status === "assigned" ? "Pattern attribué" : "Demande en cours"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PatternCard;
