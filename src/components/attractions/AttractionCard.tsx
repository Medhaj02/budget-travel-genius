
import { Button } from "@/components/ui/button";
import { Attraction } from "@/types";
import { Star, Tag, Clock } from "lucide-react";

interface AttractionCardProps {
  attraction: Attraction;
  isSelected: boolean;
  onToggle: (attraction: Attraction) => void;
}

export const AttractionCard = ({ attraction, isSelected, onToggle }: AttractionCardProps) => {
  return (
    <div
      key={attraction.id}
      className={`glass dark:glass-dark rounded-xl overflow-hidden transition-all duration-300 hover-lift ${
        isSelected
          ? "ring-2 ring-primary"
          : "ring-1 ring-gray-200 dark:ring-gray-800"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
          <Star size={14} className="text-yellow-400 mr-1" />
          {attraction.rating}
        </div>
        <div className="absolute top-2 left-2 bg-primary/80 text-white px-2 py-1 rounded-md text-sm flex items-center">
          {attraction.price === 0 ? (
            "Free"
          ) : (
            `₹${attraction.price}`
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{attraction.name}</h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs">
            <Tag size={14} />
            {attraction.category}
          </div>
          <div className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs">
            <Clock size={14} />
            {attraction.timeRequired}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {attraction.description}
        </p>
        
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={() => onToggle(attraction)}
        >
          {isSelected ? "Remove" : "Add to Itinerary"}
        </Button>
      </div>
    </div>
  );
};
