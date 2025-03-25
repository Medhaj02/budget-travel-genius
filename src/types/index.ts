
export interface TripConfig {
  budget: number;
  numPersons: number;
  tripType: string;
  numDays: number;
  destination: string;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  amenities: string[];
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  timeRequired: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  cuisine: string;
}

export interface ItineraryItem {
  id: string;
  type: 'hotel' | 'attraction' | 'restaurant';
  itemId: string;
  day: number;
  time?: string;
  notes?: string;
}

export interface ItineraryDay {
  day: number;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  name: string;
  tripConfig: TripConfig;
  hotel?: Hotel;
  days: ItineraryDay[];
  totalCost: number;
}
