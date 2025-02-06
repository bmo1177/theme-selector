import Header from "@/components/Header";
import PatternCard from "@/components/PatternCard";

interface Pattern {
  name: string;
  students: { name: string }[];
  status: "available" | "assigned" | "pending";
  date?: string;
}

const patterns: Pattern[] = [
  {
    name: "Factory",
    students: [],
    status: "available",
  },
  {
    name: "Abstract Factory",
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
    name: "Strategy",
    students: [
      { name: "Madani Halla" },
      { name: "Bouderbala asma" }
    ],
    status: "assigned",
    date: "01/Mars/2025",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-heading font-semibold mb-2">
              Liste des Design Patterns
            </h2>
            <p className="text-sm text-muted-foreground">
              Date de lancement : 06/02/2025 | Début des présentations : 01/Mars/2025
            </p>
          </div>
          
          <div className="pattern-grid">
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