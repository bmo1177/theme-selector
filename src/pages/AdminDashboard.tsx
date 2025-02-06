
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface PatternRequest {
  id: string;
  pattern_name: string;
  student1_name: string;
  student2_name: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const { data: requests, isLoading } = useQuery({
    queryKey: ['pattern-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pattern_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching requests:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les demandes",
        });
        throw error;
      }
      
      return data as PatternRequest[];
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  const handleAction = async (requestId: string, action: "approve" | "reject") => {
    try {
      const { error: updateRequestError } = await supabase
        .from('pattern_requests')
        .update({ status: action === "approve" ? "approved" : "rejected" })
        .eq('id', requestId);

      if (updateRequestError) throw updateRequestError;

      if (action === "approve") {
        const request = requests?.find(r => r.id === requestId);
        if (request) {
          const { error: updatePatternError } = await supabase
            .from('patterns')
            .update({ status: 'assigned' })
            .eq('name', request.pattern_name);

          if (updatePatternError) throw updatePatternError;
        }
      }

      queryClient.invalidateQueries({ queryKey: ['pattern-requests'] });

      toast({
        title: action === "approve" ? "Demande approuvée" : "Demande rejetée",
        description: `La demande a été ${
          action === "approve" ? "approuvée" : "rejetée"
        } avec succès.`,
      });
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la demande",
      });
    }
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
            {isLoading ? (
              <div className="text-center py-4">Chargement...</div>
            ) : !requests?.length ? (
              <div className="text-center py-4 text-muted-foreground">
                Aucune demande en attente
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{request.pattern_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Étudiants: {request.student1_name}
                        {request.student2_name && `, ${request.student2_name}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date de demande: {new Date(request.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium" style={{
                        color: request.status === 'approved' ? 'green' : 
                               request.status === 'rejected' ? 'red' : 
                               'inherit'
                      }}>
                        Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </p>
                    </div>
                    {request.status === 'pending' && (
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
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
