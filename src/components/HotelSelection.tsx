
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/types";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { Star, Wifi, Coffee, Car, Utensils, Check } from "lucide-react";

// Mock hotel data
const mockHotels: Hotel[] = [
  {
    id: "hotel1",
    name: "Luxury Grand Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 180,
    rating: 4.8,
    description: "Experience luxury at its finest in the heart of downtown.",
    amenities: ["Free WiFi", "Breakfast included", "Parking", "Restaurant", "Spa"]
  },
  {
    id: "hotel2",
    name: "Comfort Inn Plus",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 120,
    rating: 4.2,
    description: "Comfortable and affordable lodging with great amenities.",
    amenities: ["Free WiFi", "Breakfast included", "Parking"]
  },
  {
    id: "hotel3",
    name: "Budget Travel Lodge",
    image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 75,
    rating: 3.9,
    description: "Clean and simple accommodations for budget-conscious travelers.",
    amenities: ["Free WiFi", "Self-check-in"]
  },
  {
    id: "hotel4",
    name: "Elegant Boutique Inn",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 210,
    rating: 4.9,
    description: "A charming boutique hotel with unique character and premium services.",
    amenities: ["Free WiFi", "Breakfast included", "Parking", "Restaurant", "Spa", "Fitness center"]
  },
  {
    id: "hotel5",
    name: "Urban Express Hotel",
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 95,
    rating: 4.0,
    description: "Modern and convenient hotel located near major transport links.",
    amenities: ["Free WiFi", "Business center", "24-hour reception"]
  }
];

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'free wifi':
      return <Wifi size={16} />;
    case 'breakfast included':
      return <Coffee size={16} />;
    case 'parking':
      return <Car size={16} />;
    case 'restaurant':
      return <Utensils size={16} />;
    default:
      return <Check size={16} />;
  }
};

export default function HotelSelection() {
  const { tripConfig, selectedHotel, setSelectedHotel, setCurrentStep } = useTrip();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(selectedHotel?.id || null);
  const navigate = useNavigate();

  // Filter hotels based on budget
  useEffect(() => {
    if (tripConfig) {
      // Ensure hotel cost for the entire stay is within budget
      // Allow hotels to take up to 60% of the total budget
      const maxDailyHotelBudget = (tripConfig.budget * 0.6) / tripConfig.numDays;
      const filtered = mockHotels.filter(hotel => hotel.price <= maxDailyHotelBudget * 1.2); // Add some flexibility
      
      // Sort by best value (rating / price ratio)
      filtered.sort((a, b) => (b.rating / b.price) - (a.rating / a.price));
      
      setFilteredHotels(filtered);
    }
  }, [tripConfig]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedId(hotel.id);
    setSelectedHotel(hotel);
  };

  const handleContinue = () => {
    if (selectedId) {
      setCurrentStep(3);
      navigate("/attraction-selection");
    }
  };

  if (!tripConfig) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Select Your Hotel</h2>
          <div className="text-sm text-muted-foreground">
            Daily budget for hotel: up to ${Math.round((tripConfig.budget * 0.6) / tripConfig.numDays)}
          </div>
        </div>
        
        {filteredHotels.length === 0 ? (
          <div className="glass dark:glass-dark rounded-xl p-8 text-center">
            <p>No hotels available within your budget. Please increase your budget or adjust your trip duration.</p>
          </div>
        ) : (
          <div className="space-y-6 fade-in-stagger">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`glass dark:glass-dark rounded-xl overflow-hidden transition-all duration-300 hover-lift ${
                  selectedId === hotel.id
                    ? "ring-2 ring-primary"
                    : "ring-1 ring-gray-200 dark:ring-gray-800"
                }`}
                onClick={() => handleSelectHotel(hotel)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      {hotel.rating}
                    </div>
                  </div>
                  
                  <div className="p-5 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <div className="text-lg font-semibold text-primary">
                          ${hotel.price}
                          <span className="text-sm text-muted-foreground">/night</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mt-2">{hotel.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs"
                          >
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </div>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-muted-foreground">
                            +{hotel.amenities.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button
                        variant={selectedId === hotel.id ? "default" : "outline"}
                        className="w-full sm:w-auto"
                        onClick={() => handleSelectHotel(hotel)}
                      >
                        {selectedId === hotel.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button
            disabled={!selectedId}
            onClick={handleContinue}
            size="lg"
          >
            Continue to Attractions
          </Button>
        </div>
      </div>
    </div>
  );
}
