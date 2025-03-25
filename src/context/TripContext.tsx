
import { createContext, useContext, useState, ReactNode } from "react";
import { TripConfig, Hotel, Attraction, Restaurant, Itinerary, ItineraryItem, ItineraryDay } from "@/types";

interface TripContextProps {
  tripConfig: TripConfig | null;
  setTripConfig: (config: TripConfig) => void;
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel) => void;
  selectedAttractions: Attraction[];
  addAttraction: (attraction: Attraction) => void;
  removeAttraction: (attractionId: string) => void;
  selectedRestaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  removeRestaurant: (restaurantId: string) => void;
  itinerary: Itinerary | null;
  createItinerary: () => void;
  updateItinerary: (updatedItinerary: Itinerary) => void;
  moveItineraryItem: (itemId: string, fromDay: number, toDay: number) => void;
  resetTrip: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  getRemainingBudget: () => number;
}

const defaultTripConfig: TripConfig = {
  budget: 0,
  numPersons: 1,
  tripType: "leisure",
  numDays: 3,
  destination: "",
};

const TripContext = createContext<TripContextProps | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripConfig, setTripConfigState] = useState<TripConfig | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const setTripConfig = (config: TripConfig) => {
    setTripConfigState(config);
  };

  const addAttraction = (attraction: Attraction) => {
    setSelectedAttractions((prev) => [...prev, attraction]);
  };

  const removeAttraction = (attractionId: string) => {
    setSelectedAttractions((prev) => prev.filter((a) => a.id !== attractionId));
  };

  const addRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurants((prev) => [...prev, restaurant]);
  };

  const removeRestaurant = (restaurantId: string) => {
    setSelectedRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
  };

  const createItinerary = () => {
    if (!tripConfig || !selectedHotel) return;

    const days: ItineraryDay[] = [];
    
    for (let i = 1; i <= tripConfig.numDays; i++) {
      days.push({
        day: i,
        items: [
          {
            id: `hotel-${selectedHotel.id}-day-${i}`,
            type: 'hotel',
            itemId: selectedHotel.id,
            day: i
          }
        ]
      });
    }

    // Distribute attractions evenly across days
    let dayIndex = 0;
    selectedAttractions.forEach((attraction) => {
      const day = dayIndex % tripConfig.numDays + 1;
      days[day - 1].items.push({
        id: `attraction-${attraction.id}-day-${day}`,
        type: 'attraction',
        itemId: attraction.id,
        day: day
      });
      dayIndex++;
    });

    // Distribute restaurants evenly across days
    dayIndex = 0;
    selectedRestaurants.forEach((restaurant) => {
      const day = dayIndex % tripConfig.numDays + 1;
      days[day - 1].items.push({
        id: `restaurant-${restaurant.id}-day-${day}`,
        type: 'restaurant',
        itemId: restaurant.id,
        day: day
      });
      dayIndex++;
    });

    // Calculate total cost
    const hotelCost = selectedHotel.price * tripConfig.numDays;
    const attractionsCost = selectedAttractions.reduce((sum, a) => sum + a.price, 0);
    const restaurantsCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0);
    const totalCost = hotelCost + attractionsCost + restaurantsCost;

    const newItinerary: Itinerary = {
      id: `itinerary-${Date.now()}`,
      name: `Trip to ${tripConfig.destination}`,
      tripConfig,
      hotel: selectedHotel,
      days,
      totalCost
    };

    setItinerary(newItinerary);
  };

  const updateItinerary = (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);
  };

  const moveItineraryItem = (itemId: string, fromDay: number, toDay: number) => {
    if (!itinerary) return;

    const updatedDays = [...itinerary.days];
    const fromDayIndex = updatedDays.findIndex(d => d.day === fromDay);
    const toDayIndex = updatedDays.findIndex(d => d.day === toDay);

    if (fromDayIndex === -1 || toDayIndex === -1) return;

    const itemIndex = updatedDays[fromDayIndex].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    const item = { ...updatedDays[fromDayIndex].items[itemIndex], day: toDay };
    
    // Remove from original day
    updatedDays[fromDayIndex].items = updatedDays[fromDayIndex].items.filter(i => i.id !== itemId);
    
    // Add to new day
    updatedDays[toDayIndex].items.push(item);

    setItinerary({
      ...itinerary,
      days: updatedDays
    });
  };

  const resetTrip = () => {
    setTripConfigState(null);
    setSelectedHotel(null);
    setSelectedAttractions([]);
    setSelectedRestaurants([]);
    setItinerary(null);
    setCurrentStep(0);
  };

  const getRemainingBudget = () => {
    if (!tripConfig) return 0;
    
    const hotelCost = selectedHotel ? selectedHotel.price * tripConfig.numDays : 0;
    const attractionsCost = selectedAttractions.reduce((sum, a) => sum + a.price, 0);
    const restaurantsCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0);
    
    return tripConfig.budget - (hotelCost + attractionsCost + restaurantsCost);
  };

  return (
    <TripContext.Provider
      value={{
        tripConfig,
        setTripConfig,
        selectedHotel,
        setSelectedHotel,
        selectedAttractions,
        addAttraction,
        removeAttraction,
        selectedRestaurants,
        addRestaurant,
        removeRestaurant,
        itinerary,
        createItinerary,
        updateItinerary,
        moveItineraryItem,
        resetTrip,
        currentStep,
        setCurrentStep,
        getRemainingBudget
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
