
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onToggle: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ restaurant, isSelected, onToggle }: RestaurantCardProps) => {
  return (
    <div
      key={restaurant.id}
      className={`glass dark:glass-dark rounded-xl overflow-hidden transition-all duration-300 hover-lift ${
        isSelected
          ? "ring-2 ring-primary"
          : "ring-1 ring-gray-200 dark:ring-gray-800"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
          <Star size={14} className="text-yellow-400 mr-1" />
          {restaurant.rating}
        </div>
        <div className="absolute top-2 left-2 bg-primary/80 text-white px-2 py-1 rounded-md text-sm flex items-center">
          ₹{restaurant.price}/person
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs">
            {restaurant.cuisine}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {restaurant.description}
        </p>
        
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={() => onToggle(restaurant)}
        >
          {isSelected ? "Remove" : "Add to Itinerary"}
        </Button>
      </div>
    </div>
  );
};
