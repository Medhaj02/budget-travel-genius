
import { Calendar, Clock, Hotel, MapPin, Utensils } from "lucide-react";
import { Attraction, ItineraryDay as Day, Restaurant } from "@/types";

interface ItineraryDayProps {
  day: Day;
  getAttractionById: (id: string) => Attraction | undefined;
  getRestaurantById: (id: string) => Restaurant | undefined;
  selectedHotel: any;
}

export default function ItineraryDay({
  day,
  getAttractionById,
  getRestaurantById,
  selectedHotel
}: ItineraryDayProps) {
  return (
    <div className="glass dark:glass-dark rounded-xl overflow-hidden">
      <div className="bg-accent p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-primary" />
          <h2 className="text-xl font-semibold">Day {day.day}</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {day.items.map((item) => {
          let itemDetails: any;
          let icon: any;
          
          if (item.type === "hotel") {
            itemDetails = selectedHotel;
            icon = <Hotel size={20} className="text-primary" />;
          } else if (item.type === "attraction") {
            itemDetails = getAttractionById(item.itemId);
            icon = <MapPin size={20} className="text-primary" />;
          } else if (item.type === "restaurant") {
            itemDetails = getRestaurantById(item.itemId);
            icon = <Utensils size={20} className="text-primary" />;
          }

          if (!itemDetails) return null;

          return (
            <div key={item.id} className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg">
              <div className="bg-background p-2 rounded-md">
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{itemDetails.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    {itemDetails.price > 0 ? `$${itemDetails.price}` : "Free"}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {itemDetails.description}
                </p>
                
                {item.type === "attraction" && (
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock size={12} className="mr-1" />
                    <span>{itemDetails.timeRequired}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
