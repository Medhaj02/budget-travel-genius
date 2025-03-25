
import { useState } from "react";
import Header from "@/components/Header";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel, MapPin, Utensils, Calendar, Clock, Share2, Printer, Download, Check } from "lucide-react";
import { Attraction, Restaurant } from "@/types";
import { useToast } from "@/hooks/use-toast";

const FinalItineraryPage = () => {
  const { tripConfig, selectedHotel, selectedAttractions, selectedRestaurants, itinerary } = useTrip();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!tripConfig || !selectedHotel || !itinerary) {
    navigate("/");
    return null;
  }

  const getAttractionById = (id: string): Attraction | undefined => {
    return selectedAttractions.find((a) => a.id === id);
  };

  const getRestaurantById = (id: string): Restaurant | undefined => {
    return selectedRestaurants.find((r) => r.id === id);
  };

  const handleSaveItinerary = () => {
    setIsSaved(true);
    toast({
      title: "Itinerary Saved",
      description: "Your itinerary has been saved successfully!",
    });
  };

  const handlePrintItinerary = () => {
    window.print();
  };

  const handleShareItinerary = () => {
    toast({
      title: "Share Feature",
      description: "Sharing functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />

      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Trip to {tripConfig.destination}</h1>
              <p className="text-muted-foreground">
                {tripConfig.numDays} days • {tripConfig.numPersons} {tripConfig.numPersons === 1 ? 'person' : 'people'} • ${itinerary.totalCost} total
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handlePrintItinerary}
              >
                <Printer size={16} />
                <span>Print</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleShareItinerary}
              >
                <Share2 size={16} />
                <span>Share</span>
              </Button>
              <Button
                variant={isSaved ? "secondary" : "default"}
                size="sm"
                className="flex items-center gap-1"
                onClick={handleSaveItinerary}
              >
                {isSaved ? <Check size={16} /> : <Download size={16} />}
                <span>{isSaved ? "Saved" : "Save"}</span>
              </Button>
            </div>
          </div>

          <div className="glass dark:glass-dark rounded-xl overflow-hidden mb-8">
            <div className="bg-primary text-white p-5">
              <div className="flex items-center gap-2">
                <Hotel size={20} />
                <h2 className="text-xl font-semibold">Your Hotel</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedHotel.image}
                      alt={selectedHotel.name}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{selectedHotel.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedHotel.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedHotel.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                  <div className="text-primary font-medium">
                    ${selectedHotel.price} per night • ${selectedHotel.price * tripConfig.numDays} total
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <div key={day.day} className="glass dark:glass-dark rounded-xl overflow-hidden">
                <div className="bg-accent p-5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold">Day {day.day}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {day.items.map((item) => {
                    let itemDetails: any;
                    let icon: any;
                    
                    if (item.type === "hotel") {
                      itemDetails = selectedHotel;
                      icon = <Hotel size={20} className="text-primary" />;
                    } else if (item.type === "attraction") {
                      itemDetails = getAttractionById(item.itemId);
                      icon = <MapPin size={20} className="text-primary" />;
                    } else if (item.type === "restaurant") {
                      itemDetails = getRestaurantById(item.itemId);
                      icon = <Utensils size={20} className="text-primary" />;
                    }

                    if (!itemDetails) return null;

                    return (
                      <div key={item.id} className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg">
                        <div className="bg-background p-2 rounded-md">
                          {icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{itemDetails.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </p>
                            </div>
                            <div className="text-sm font-medium">
                              {itemDetails.price > 0 ? `$${itemDetails.price}` : "Free"}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {itemDetails.description}
                          </p>
                          
                          {item.type === "attraction" && (
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Clock size={12} className="mr-1" />
                              <span>{itemDetails.timeRequired}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="glass dark:glass-dark rounded-xl overflow-hidden mt-8">
            <div className="bg-primary text-white p-5">
              <h2 className="text-xl font-semibold">Cost Breakdown</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Hotel ({tripConfig.numDays} nights)</span>
                  <span>${selectedHotel.price * tripConfig.numDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attractions ({selectedAttractions.length})</span>
                  <span>${selectedAttractions.reduce((sum, a) => sum + a.price, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurants ({selectedRestaurants.length})</span>
                  <span>${selectedRestaurants.reduce((sum, r) => sum + r.price, 0)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total Cost</span>
                  <span>${itinerary.totalCost}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Original Budget</span>
                  <span>${tripConfig.budget}</span>
                </div>
                <div className={`flex justify-between font-medium ${
                  tripConfig.budget - itinerary.totalCost >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  <span>Remaining Budget</span>
                  <span>${tripConfig.budget - itinerary.totalCost}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/itinerary-builder")}
            >
              Edit Itinerary
            </Button>
            <Button
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Plan a New Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalItineraryPage;
