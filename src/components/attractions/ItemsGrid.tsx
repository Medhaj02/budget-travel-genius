
import { Attraction, Restaurant } from "@/types";
import { AttractionCard } from "./AttractionCard";
import { RestaurantCard } from "./RestaurantCard";

interface ItemsGridProps {
  activeTab: "attractions" | "restaurants";
  filteredAttractions: Attraction[];
  filteredRestaurants: Restaurant[];
  selectedAttractionIds: string[];
  selectedRestaurantIds: string[];
  handleToggleAttraction: (attraction: Attraction) => void;
  handleToggleRestaurant: (restaurant: Restaurant) => void;
}

export const ItemsGrid = ({
  activeTab,
  filteredAttractions,
  filteredRestaurants,
  selectedAttractionIds,
  selectedRestaurantIds,
  handleToggleAttraction,
  handleToggleRestaurant
}: ItemsGridProps) => {
  if (activeTab === "attractions") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-stagger">
        {filteredAttractions.map((attraction) => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            isSelected={selectedAttractionIds.includes(attraction.id)}
            onToggle={handleToggleAttraction}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-stagger">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isSelected={selectedRestaurantIds.includes(restaurant.id)}
          onToggle={handleToggleRestaurant}
        />
      ))}
    </div>
  );
};
