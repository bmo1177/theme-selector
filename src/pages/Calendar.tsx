
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-03-01"));
  
  const presentationDates = [
    {
      date: "2025-03-01",
      patterns: [
        { name: "Factory", students: ["Bouafia Afaf", "Naimi Maria", "Nadri Fatima Zohra"] },
        { name: "Prototype", students: ["Seddiki Meriem", "Serrar Fatima Zohra"] },
        { name: "Adapter", students: ["Ait Abderrahim Abdel Hakim", "Belakermi Nabil"] },
        { name: "Bridge", students: ["Abada Kamel", "Aichouche Aymen Walid"] },
        { name: "Proxy", students: ["Brahim Khalil", "Chaoui Rayen Djllali"] },
        { name: "Observer", students: ["Boukhdidja Ichrak", "Hemaid Khadidja", "Hamdani Asma"] },
        { name: "Strategy", students: ["Madani Halla", "Bouderbala asma"] },
        { name: "Iterator", students: ["Nadri Fatima", "Naimi Maria"] },
        { name: "Template Method", students: ["Hamitou Yahia", "Mahrouz Abdelkader"] },
        { name: "Visitor", students: ["Medmoun Ihab Moataz-billah", "Oured Mohamed Saleh-eddine"] },
        { name: "Model-View Template", students: ["Hammadi Aissa"] },
        { name: "MVC", students: ["Benhenni Fadwa", "Sahnoun Laila"] },
        { name: "Commit-Reveal Scheme", students: ["Belalia Anis Hossam-eddine", "Kaddour Abderrahmane"] },
        { name: "Null-Object", students: ["Belmorsli Sid-Ahmed", "Boumaza Youcef"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>

        <h1 className="text-2xl font-bold mb-8">Calendrier des Présentations</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
            />
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Les présentations commencent le 1er Mars 2025
              </p>
            </div>
          </div>
          
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4">
            <h2 className="text-xl font-semibold sticky top-0 bg-background py-2">Présentations prévues</h2>
            {presentationDates.map((day) => (
              <div
                key={day.date}
                className="p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-lg">
                    {format(new Date(day.date), "d MMMM yyyy", { locale: fr })}
                  </span>
                </div>
                <ul className="space-y-3 divide-y">
                  {day.patterns.map((pattern) => (
                    <li key={pattern.name} className="pt-3 first:pt-0">
                      <span className="font-medium text-primary">{pattern.name}</span>
                      <div className="text-sm text-muted-foreground mt-1">
                        {pattern.students.join(", ")}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
