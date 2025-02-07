
import { useState } from "react";
import Header from "@/components/Header";
import PatternCard from "@/components/PatternCard";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, LayoutGrid, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Pattern {
  id: string;
  name: string;
  status: "available" | "assigned" | "pending";
}

interface PatternRequest {
  pattern_name: string;
  student1_name: string;
  student2_name: string | null;
  status: "pending" | "approved" | "rejected";
}

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { theme, setTheme } = useTheme();

  // Fetch patterns
  const { data: patterns = [], isLoading: patternsLoading } = useQuery({
    queryKey: ['patterns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patterns')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Pattern[];
    },
  });

  // Fetch approved requests to get student assignments
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['pattern_requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pattern_requests')
        .select('*')
        .eq('status', 'approved');
      if (error) throw error;
      return data as PatternRequest[];
    },
  });

  // Combine patterns with their approved student assignments
  const patternsWithStudents = patterns.map(pattern => {
    const approvedRequest = requests.find(
      request => request.pattern_name === pattern.name
    );

    const students = approvedRequest
      ? [
          { name: approvedRequest.student1_name },
          ...(approvedRequest.student2_name ? [{ name: approvedRequest.student2_name }] : [])
        ]
      : [];

    return {
      ...pattern,
      students,
      date: pattern.status === "assigned" ? "01/Mars/2025" : undefined
    };
  });

  if (patternsLoading || requestsLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement des patterns...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-heading font-semibold mb-2">
                Liste des Design Patterns
              </h2>
              <p className="text-sm text-muted-foreground">
                Date de lancement : 06/02/2025 | Début des présentations : 01/Mars/2025
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className={viewMode === "grid" ? "pattern-grid" : "space-y-4"}>
            {patternsWithStudents.map((pattern) => (
              <PatternCard
                key={pattern.id}
                name={pattern.name}
                students={pattern.students}
                date={pattern.date}
                status={pattern.status}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
