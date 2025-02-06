
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

interface PatternRequest {
  id: number;
  pattern: string;
  students: string[];
  status: "pending" | "approved" | "rejected";
  date: string;
}

// Données d'exemple
const mockRequests: PatternRequest[] = [
  {
    id: 1,
    pattern: "Observer",
    students: ["Ahmed Mehdi", "Sarah Smith"],
    status: "pending",
    date: "2024-02-15",
  },
  {
    id: 2,
    pattern: "Strategy",
    students: ["John Doe"],
    status: "pending",
    date: "2024-02-16",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  const handleAction = (requestId: number, action: "approve" | "reject") => {
    toast({
      title: action === "approve" ? "Demande approuvée" : "Demande rejetée",
      description: `La demande #${requestId} a été ${
        action === "approve" ? "approuvée" : "rejetée"
      }`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Demandes en attente</h2>
            <div className="space-y-4">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{request.pattern}</p>
                    <p className="text-sm text-muted-foreground">
                      Étudiants: {request.students.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date de demande: {request.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => handleAction(request.id, "approve")}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approuver
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleAction(request.id, "reject")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
