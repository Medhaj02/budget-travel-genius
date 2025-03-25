
import { CalendarDays } from "lucide-react";
import { Attraction, Hotel, ItineraryDay, ItineraryItem, Restaurant } from "@/types";
import ItineraryItemCard from "./ItineraryItemCard";

interface DailyItineraryProps {
  currentDay: number;
  dayItems: ItineraryItem[];
  getItemById: (id: string, type: "attraction" | "restaurant" | "hotel") => Attraction | Restaurant | Hotel | undefined;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetDay: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function DailyItinerary({
  currentDay,
  dayItems,
  getItemById,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd
}: DailyItineraryProps) {
  const timeSlots = ["Morning", "Afternoon", "Evening"];

  return (
    <div className="glass dark:glass-dark rounded-xl overflow-hidden">
      <div className="bg-accent p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-semibold">Day {currentDay}</h3>
        </div>
      </div>
      
      <div 
        className="p-6 min-h-[400px]"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, currentDay)}
      >
        {dayItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Drag and drop activities here to build your day.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {timeSlots.map((slot) => (
              <div key={slot} className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{slot}</h4>
                <div className="space-y-2">
                  {dayItems
                    .filter((item) => {
                      if (slot === "Morning" && item.type === "hotel") return true;
                      if (slot === "Morning" && item.type === "attraction" && dayItems.filter(i => i.type === "attraction").indexOf(item) < 2) return true;
                      if (slot === "Afternoon" && item.type === "attraction" && dayItems.filter(i => i.type === "attraction").indexOf(item) >= 2 && dayItems.filter(i => i.type === "attraction").indexOf(item) < 4) return true;
                      if (slot === "Evening" && item.type === "attraction" && dayItems.filter(i => i.type === "attraction").indexOf(item) >= 4) return true;
                      if (slot === "Evening" && item.type === "restaurant") return true;
                      return false;
                    })
                    .map((item) => {
                      const data = getItemById(item.itemId, item.type as any);
                      if (!data) return null;
                      return (
                        <ItineraryItemCard
                          key={item.id}
                          item={item}
                          data={data}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
