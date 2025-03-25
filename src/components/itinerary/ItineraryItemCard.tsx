
import { Clock, HotelIcon, MapPin, Utensils, IndianRupee } from "lucide-react";
import { Attraction, Hotel, ItineraryItem, Restaurant } from "@/types";

interface ItineraryItemCardProps {
  item: ItineraryItem;
  data: Attraction | Restaurant | Hotel;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function ItineraryItemCard({ 
  item, 
  data, 
  onDragStart, 
  onDragEnd 
}: ItineraryItemCardProps) {
  const ItemIcon = item.type === "hotel" ? HotelIcon : item.type === "attraction" ? MapPin : Utensils;
  
  return (
    <div
      key={item.id}
      className="glass dark:glass-dark p-4 rounded-lg hover-lift mb-4 cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-md">
          <ItemIcon className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{(data as any).name}</h4>
              <p className="text-xs text-muted-foreground">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </p>
            </div>
            
            {item.type !== "hotel" && (
              <div className="text-sm font-medium flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {(data as any).price}
              </div>
            )}
          </div>
          
          {item.time && (
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {item.time}
            </div>
          )}
          
          {item.type === "attraction" && (data as Attraction).precautions && (data as Attraction).precautions!.length > 0 && (
            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded text-xs text-amber-700 dark:text-amber-400">
              <p className="font-medium">Precautions:</p>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                {(data as Attraction).precautions!.slice(0, 1).map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
                {(data as Attraction).precautions!.length > 1 && (
                  <li>+{(data as Attraction).precautions!.length - 1} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
