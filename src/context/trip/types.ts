
import { TripConfig, Hotel, Attraction, Restaurant, Itinerary, ItineraryDay, ItineraryItem } from "@/types";

export interface TripContextProps {
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

export const defaultTripConfig: TripConfig = {
  budget: 0,
  numPersons: 1,
  tripType: "leisure",
  numDays: 3,
  destination: "",
};
