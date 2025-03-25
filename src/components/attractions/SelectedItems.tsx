
import { Attraction, Restaurant } from "@/types";
import { X } from "lucide-react";

interface SelectedItemsProps {
  selectedAttractions: Attraction[];
  selectedRestaurants: Restaurant[];
  removeAttraction: (id: string) => void;
  removeRestaurant: (id: string) => void;
}

export const SelectedItems = ({
  selectedAttractions,
  selectedRestaurants,
  removeAttraction,
  removeRestaurant
}: SelectedItemsProps) => {
  if (selectedAttractions.length === 0 && selectedRestaurants.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No items selected yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedAttractions.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Selected Attractions</h3>
          <div className="flex flex-wrap gap-2">
            {selectedAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full text-xs"
              >
                <span>{attraction.name}</span>
                <button
                  onClick={() => removeAttraction(attraction.id)}
                  className="ml-1 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedRestaurants.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Selected Restaurants</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full text-xs"
              >
                <span>{restaurant.name}</span>
                <button
                  onClick={() => removeRestaurant(restaurant.id)}
                  className="ml-1 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
