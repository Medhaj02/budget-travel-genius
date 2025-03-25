
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
  price: number; // Price in Rupees
  rating: number;
  description: string;
  amenities: string[];
  location?: string;
}

export interface Attraction {
  id: string;
  name: string;
  image: string;
  price: number; // Price in Rupees
  rating: number;
  description: string;
  category: string;
  timeRequired: string;
  precautions?: string[]; // Added precautions
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  price: number; // Price in Rupees
  rating: number;
  description: string;
  cuisine: string;
  location?: string;
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

export interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
}

export interface TravelAdvice {
  clothing: string[];
  transportation: string[];
  weather?: WeatherInfo;
  localTips: string[];
}
