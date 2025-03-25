
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Attraction, Restaurant } from "@/types";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Tag, Search, Filter, MapPin, X } from "lucide-react";

// Mock attraction data
const mockAttractions: Attraction[] = [
  {
    id: "attr1",
    name: "Historic City Center",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 0,
    rating: 4.7,
    description: "Explore the historic city center with beautiful architecture and charming streets.",
    category: "sightseeing",
    timeRequired: "2-3 hours"
  },
  {
    id: "attr2",
    name: "National Museum",
    image: "https://images.unsplash.com/photo-1565060169861-57b113febe9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 15,
    rating: 4.5,
    description: "World-class museum with extensive collections of art and historical artifacts.",
    category: "museum",
    timeRequired: "3-4 hours"
  },
  {
    id: "attr3",
    name: "Central Park Gardens",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 0,
    rating: 4.6,
    description: "Beautiful urban park with lush gardens, walking paths, and recreational areas.",
    category: "nature",
    timeRequired: "1-2 hours"
  },
  {
    id: "attr4",
    name: "Adventure Theme Park",
    image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 45,
    rating: 4.3,
    description: "Exciting theme park with thrilling rides and entertainment for all ages.",
    category: "entertainment",
    timeRequired: "5-6 hours"
  },
  {
    id: "attr5",
    name: "Mountain Hiking Trail",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 10,
    rating: 4.8,
    description: "Scenic hiking trail with breathtaking mountain views and nature experiences.",
    category: "adventure",
    timeRequired: "4-5 hours"
  },
  {
    id: "attr6",
    name: "Marine Aquarium",
    image: "https://images.unsplash.com/photo-1596472183973-83b1c8443c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 25,
    rating: 4.4,
    description: "Fascinating aquarium featuring marine life from around the world.",
    category: "education",
    timeRequired: "2-3 hours"
  }
];

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: "rest1",
    name: "Fine Dining Experience",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 60,
    rating: 4.8,
    description: "Elegant fine dining restaurant offering exquisite gourmet cuisine.",
    cuisine: "International"
  },
  {
    id: "rest2",
    name: "Local Bistro",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 30,
    rating: 4.5,
    description: "Charming bistro serving authentic local specialties in a cozy atmosphere.",
    cuisine: "Local"
  },
  {
    id: "rest3",
    name: "Quick Bites Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 15,
    rating: 4.2,
    description: "Casual café perfect for a quick meal or coffee break during your day.",
    cuisine: "Café"
  },
  {
    id: "rest4",
    name: "Seafood Harbor",
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 45,
    rating: 4.6,
    description: "Renowned seafood restaurant offering fresh catches and ocean delicacies.",
    cuisine: "Seafood"
  },
  {
    id: "rest5",
    name: "Street Food Market",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 10,
    rating: 4.4,
    description: "Vibrant food market where you can sample a variety of local street food.",
    cuisine: "Street Food"
  }
];

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
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
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

  const renderAttractions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-stagger">
      {filteredAttractions.map((attraction) => {
        const isSelected = selectedAttractionIds.includes(attraction.id);
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
                  `$${attraction.price}`
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
                onClick={() => handleToggleAttraction(attraction)}
              >
                {isSelected ? "Remove" : "Add to Itinerary"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderRestaurants = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-stagger">
      {filteredRestaurants.map((restaurant) => {
        const isSelected = selectedRestaurantIds.includes(restaurant.id);
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
                ${restaurant.price}/person
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
                onClick={() => handleToggleRestaurant(restaurant)}
              >
                {isSelected ? "Remove" : "Add to Itinerary"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSelectedItems = () => {
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
                  ${getRemainingBudget()}
                </span>
              </span>
            </div>
          </div>
          
          <div className="glass dark:glass-dark mt-4 p-4 rounded-lg">
            {renderSelectedItems()}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 font-medium rounded-md transition-colors ${
                  activeTab === "attractions"
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground"
                }`}
                onClick={() => setActiveTab("attractions")}
              >
                Attractions
              </button>
              <button
                className={`px-4 py-2 font-medium rounded-md transition-colors ${
                  activeTab === "restaurants"
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground"
                }`}
                onClick={() => setActiveTab("restaurants")}
              >
                Restaurants
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-md border border-input bg-background py-2 px-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>

        {activeTab === "attractions" ? renderAttractions() : renderRestaurants()}

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
