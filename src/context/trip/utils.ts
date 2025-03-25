
import { Itinerary, ItineraryDay, TripConfig, Hotel, Attraction, Restaurant } from "@/types";

export const calculateTotalCost = (
  hotel: Hotel,
  attractions: Attraction[],
  restaurants: Restaurant[],
  tripConfig: TripConfig
): number => {
  const hotelCost = hotel.price * tripConfig.numDays;
  const attractionsCost = attractions.reduce((sum, a) => sum + a.price, 0);
  const restaurantsCost = restaurants.reduce((sum, r) => sum + r.price, 0);
  return hotelCost + attractionsCost + restaurantsCost;
};

export const distributeItemsAcrossDays = (
  tripConfig: TripConfig,
  selectedHotel: Hotel,
  selectedAttractions: Attraction[],
  selectedRestaurants: Restaurant[]
): ItineraryDay[] => {
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

  return days;
};
