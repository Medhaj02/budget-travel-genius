
import { Attraction, Restaurant } from "@/types";

// Mock attraction data
export const mockAttractions: Attraction[] = [
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
export const mockRestaurants: Restaurant[] = [
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
