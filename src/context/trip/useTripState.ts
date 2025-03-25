
import { useState } from "react";
import { TripConfig, Hotel, Attraction, Restaurant, Itinerary } from "@/types";
import { defaultTripConfig } from "./types";
import { calculateTotalCost, distributeItemsAcrossDays } from "./utils";

export const useTripState = () => {
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

    const days = distributeItemsAcrossDays(
      tripConfig,
      selectedHotel,
      selectedAttractions,
      selectedRestaurants
    );

    const totalCost = calculateTotalCost(
      selectedHotel,
      selectedAttractions,
      selectedRestaurants,
      tripConfig
    );

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

  return {
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
  };
};
