import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Student {
  name: string;
}

interface PatternCardProps {
  name: string;
  students: Student[];
  date?: string;
  status: "available" | "assigned" | "pending";
}

const PatternCard = ({ name, students, date, status }: PatternCardProps) => {
  return (
    <Card className="pattern-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-heading">{name}</CardTitle>
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
        <Button
          variant="outline"
          className="w-full"
          disabled={status === "assigned"}
        >
          {status === "assigned"
            ? "Pattern attribué"
            : status === "pending"
            ? "Demande en cours"
            : "Demander ce pattern"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatternCard;