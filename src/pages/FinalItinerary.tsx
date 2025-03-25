
import { useState } from "react";
import Header from "@/components/Header";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { Attraction, Restaurant } from "@/types";
import { useToast } from "@/hooks/use-toast";
import {
  HotelCard,
  ItineraryDay,
  CostBreakdown,
  ItineraryHeader,
  NavigationButtons
} from "@/components/final-itinerary";

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

  const handleEditItinerary = () => {
    navigate("/itinerary-builder");
  };

  const handleNewTrip = () => {
    navigate("/");
    window.location.reload();
  };

  // Calculate costs for breakdown
  const hotelCost = selectedHotel.price * tripConfig.numDays;
  const attractionsCost = selectedAttractions.reduce((sum, a) => sum + a.price, 0);
  const restaurantsCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />

      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <ItineraryHeader
            tripConfig={tripConfig}
            totalCost={itinerary.totalCost}
            isSaved={isSaved}
            onSave={handleSaveItinerary}
            onPrint={handlePrintItinerary}
            onShare={handleShareItinerary}
          />

          <HotelCard hotel={selectedHotel} numDays={tripConfig.numDays} />

          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <ItineraryDay
                key={day.day}
                day={day}
                getAttractionById={getAttractionById}
                getRestaurantById={getRestaurantById}
                selectedHotel={selectedHotel}
              />
            ))}
          </div>

          <CostBreakdown
            tripConfig={tripConfig}
            hotelCost={hotelCost}
            attractionsCost={attractionsCost}
            restaurantsCost={restaurantsCost}
            totalCost={itinerary.totalCost}
          />

          <NavigationButtons
            onEditItinerary={handleEditItinerary}
            onNewTrip={handleNewTrip}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalItineraryPage;
