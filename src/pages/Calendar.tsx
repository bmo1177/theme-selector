
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-03-01"));
  
  const presentationDates = [
    {
      date: "2025-03-01",
      patterns: [
        { name: "Factory", students: ["Hamdani Asmaa", "Boukhdidja Ichrak"] },
        { name: "Proxy", students: ["Brahim Khalil", "Chaoui Rayen Djllali"] },
      ]
    },
    // Add more dates and patterns as needed
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Calendrier des Présentations</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Présentations prévues</h2>
            {presentationDates.map((day) => (
              <div
                key={day.date}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="font-medium">
                    {format(new Date(day.date), "d MMMM yyyy", { locale: fr })}
                  </span>
                </div>
                <ul className="space-y-2">
                  {day.patterns.map((pattern) => (
                    <li key={pattern.name} className="ml-6">
                      <span className="font-medium">{pattern.name}</span>
                      <div className="text-sm text-muted-foreground">
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
