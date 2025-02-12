import { useState } from "react";
import Header from "@/components/Header";
import PatternCard from "@/components/PatternCard";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, LayoutGrid, List } from "lucide-react";

interface Pattern {
  name: string;
  students: { name: string }[];
  status: "available" | "assigned" | "pending";
  date?: string;
}

const patterns: Pattern[] = [
  {
    name: "Factory",
    students: [
      { name: "Bouafia Afaf" },
      { name: "Naimi Maria" },
      { name: "Nadri Fatima Zohra" }
    ],
    status: "assigned",
    date: "01/Mars/2025", 
  },
  {
    name: "Abstract Factory",
    students: [],
    status: "available",
  },
  {
    name: "Builder",
    students: [],
    status: "available",
  },
  {
    name: "Prototype",
    students: [
      { name: "Seddiki Meriem" },
      { name: "Serrar Fatima Zohra" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
  {
    name: "Adapter",
    students: [
      { name: "Ait Abderrahim Abdel Hakim" },
      { name: "Belakermi Nabil" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
  {
    name: "Bridge",
    students: [
      { name: "Abada Kamel" },
      { name: "Aichouche Aymen Walid" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
  {
    name: "Composite",
    students: [],
    status: "available",
  },
  {
    name: "Decorator",
    students: [],
    status: "available",
  },
  {
    name: "Facade",
    students: [],
    status: "available",
  },
  {
    name: "Flyweight",
    students: [],
    status: "available",
  },
  {
    name: "Proxy",
    students: [
      { name: "Brahim Khalil" },
      { name: "Chaoui Rayen Djllali" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
  {
    name: "Observer",
    students: [
      { name: "Boukhdidja Ichrak" },
      { name: "Hemaid Khadidja" },
      { name: "Hamdani Asma" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Strategy",
    students: [
      { name: "Madani Halla" },
      { name: "Bouderbala asma" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
  {
    name: "State",
    students: [],
    status: "available",
  },
  {
    name: "Command",
    students: [],
    status: "available",
  },
  {
    name: "Iterator",
    students: [],
    status: "available",
  },
  {
    name: "Chain of Responsibility",
    students: [],
    status: "available",
  },
  {
    name: "Interpreter",
    students: [],
    status: "available",
  },
  {
    name: "Mediator",
    students: [],
    status: "available",
  },
  {
    name: "Memento",
    students: [],
    status: "available",
  },
  {
    name: "Template Method",
    students: [
      { name: "Hamitou Yahia" },
      { name: "Mahrouz Abdelkader" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Visitor",
    students: [
      { name: "Medmoun Ihab Moataz-billah" },
      { name: "Oured Mohamed Saleh-eddine" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Model-View Template",
    students: [
      { name: "Hammadi Aissa" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "MVC",
    students: [
      { name: "Benhenni Fadwa" },
      { name: "Sahnoun Laila" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Commit-Reveal Scheme",
    students: [
      { name: "Belalia Anis Hossam-eddine" },
      { name: "Kaddour Abderrahmane" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Null-Object",
    students: [
      { name: "Belmorsli Sid-Ahmed" },
      { name: "Boumaza Youcef" }
    ],
    status: "assigned",
    date: "01/Mars/2025"
  },
  {
    name: "Event-Driven Architecture",
    students: [
      { name: "Belalia Mohamed Oussama" },
      { name: "Belghiter Kheirreddine" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  }
];

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { theme, setTheme } = useTheme();

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
            {patterns.map((pattern, index) => (
              <PatternCard
                key={index}
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
