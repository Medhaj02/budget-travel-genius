
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { TabsAndSearch } from "./TabsAndSearch";
import { SelectedItems } from "./SelectedItems";
import { ItemsGrid } from "./ItemsGrid";
import { mockAttractions, mockRestaurants } from "./mockData";

export default function AttractionSelection() {
  const {
    tripConfig,
    selectedAttractions,
    addAttraction,
    removeAttraction,
    selectedRestaurants,
    addRestaurant,
    removeRestaurant,
    selectedHotel,
    getRemainingBudget,
    setCurrentStep
  } = useTrip();
  
  const [activeTab, setActiveTab] = useState<"attractions" | "restaurants">("attractions");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttractions, setFilteredAttractions] = useState(mockAttractions);
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const navigate = useNavigate();

  const selectedAttractionIds = selectedAttractions.map((a) => a.id);
  const selectedRestaurantIds = selectedRestaurants.map((r) => r.id);

  useEffect(() => {
    if (tripConfig) {
      const remainingBudget = getRemainingBudget();
      
      // Filter attractions
      setFilteredAttractions(
        mockAttractions.filter((attraction) => {
          const nameMatch = attraction.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          
          // Items that are already selected should always show
          if (selectedAttractionIds.includes(attraction.id)) {
            return nameMatch;
          }
          
          // Only show items that don't exceed the remaining budget
          return nameMatch && attraction.price <= remainingBudget;
        })
      );
      
      // Filter restaurants
      setFilteredRestaurants(
        mockRestaurants.filter((restaurant) => {
          const nameMatch = restaurant.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          
          // Items that are already selected should always show
          if (selectedRestaurantIds.includes(restaurant.id)) {
            return nameMatch;
          }
          
          // Only show items that don't exceed the remaining budget
          return nameMatch && restaurant.price <= remainingBudget;
        })
      );
    }
  }, [
    tripConfig,
    searchQuery,
    selectedAttractionIds,
    selectedRestaurantIds,
    getRemainingBudget
  ]);

  const handleToggleAttraction = (attraction: Attraction) => {
    if (selectedAttractionIds.includes(attraction.id)) {
      removeAttraction(attraction.id);
    } else {
      addAttraction(attraction);
    }
  };

  const handleToggleRestaurant = (restaurant: Restaurant) => {
    if (selectedRestaurantIds.includes(restaurant.id)) {
      removeRestaurant(restaurant.id);
    } else {
      addRestaurant(restaurant);
    }
  };

  const handleContinue = () => {
    if (tripConfig && selectedHotel && selectedAttractions.length > 0) {
      setCurrentStep(4);
      navigate("/itinerary-builder");
    }
  };

  if (!tripConfig || !selectedHotel) {
    navigate("/hotel-selection");
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Choose Attractions & Restaurants</h2>
              <p className="text-muted-foreground">
                Select places to visit and restaurants to eat during your trip.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Budget remaining:{" "}
                <span className={`font-medium ${getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}`}>
                  ₹{getRemainingBudget()}
                </span>
              </span>
            </div>
          </div>
          
          <div className="glass dark:glass-dark mt-4 p-4 rounded-lg">
            <SelectedItems 
              selectedAttractions={selectedAttractions}
              selectedRestaurants={selectedRestaurants}
              removeAttraction={removeAttraction}
              removeRestaurant={removeRestaurant}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <TabsAndSearch 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <ItemsGrid 
          activeTab={activeTab}
          filteredAttractions={filteredAttractions}
          filteredRestaurants={filteredRestaurants}
          selectedAttractionIds={selectedAttractionIds}
          selectedRestaurantIds={selectedRestaurantIds}
          handleToggleAttraction={handleToggleAttraction}
          handleToggleRestaurant={handleToggleRestaurant}
        />

        <div className="mt-8 flex justify-end">
          <Button
            disabled={selectedAttractions.length === 0}
            onClick={handleContinue}
            size="lg"
          >
            Create Itinerary
          </Button>
        </div>
      </div>
    </div>
  );
}
