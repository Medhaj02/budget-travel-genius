
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { Attraction, Hotel, ItineraryDay, ItineraryItem, Restaurant } from "@/types";
import TravelChatbot from "./TravelChatbot";
import DayTabs from "./itinerary/DayTabs";
import TripSummary from "./itinerary/TripSummary";
import DailyItinerary from "./itinerary/DailyItinerary";

export default function ItineraryBuilder() {
  const {
    tripConfig,
    selectedHotel,
    selectedAttractions,
    selectedRestaurants,
    itinerary,
    createItinerary,
    updateItinerary,
    moveItineraryItem,
    setCurrentStep
  } = useTrip();
  
  const [currentDay, setCurrentDay] = useState(1);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const dragItemRef = useRef<HTMLDivElement | null>(null);
  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!itinerary && tripConfig && selectedHotel) {
      createItinerary();
    }
  }, [tripConfig, selectedHotel, itinerary, createItinerary]);

  if (!tripConfig || !selectedHotel || !itinerary) {
    navigate("/attraction-selection");
    return null;
  }

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
  };

  const getCurrentDayItems = (): ItineraryDay => {
    return itinerary.days.find((d) => d.day === currentDay) || { day: currentDay, items: [] };
  };

  const getItemById = (id: string, type: "attraction" | "restaurant" | "hotel"): Attraction | Restaurant | Hotel | undefined => {
    if (type === "hotel") return selectedHotel;
    if (type === "attraction") return selectedAttractions.find((a) => a.id === id);
    if (type === "restaurant") return selectedRestaurants.find((r) => r.id === id);
    return undefined;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedItem(id);
    
    if (e.currentTarget) {
      setTimeout(() => {
        e.currentTarget.classList.add("opacity-50");
      }, 0);
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedItem(null);
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetDay: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    
    const itemId = e.dataTransfer.getData("text/plain");
    const currentItems = getCurrentDayItems();
    const item = currentItems.items.find((i) => i.id === itemId);
    
    if (item && item.day !== targetDay) {
      moveItineraryItem(itemId, item.day, targetDay);
    }
  };

  const handleFinalizeItinerary = () => {
    setCurrentStep(5);
    navigate("/final-itinerary");
  };

  const dayItems = getCurrentDayItems().items || [];
  
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Build Your Itinerary</h2>
          <p className="text-muted-foreground">
            Customize your daily schedule by dragging activities between days.
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <DailyItinerary
              currentDay={currentDay}
              dayItems={dayItems}
              getItemById={getItemById}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </div>
          
          <div className="lg:w-1/3">
            <div className="glass dark:glass-dark rounded-xl overflow-hidden mb-6">
              <div className="bg-accent p-4 border-b">
                <h3 className="font-semibold">Days</h3>
              </div>
              
              <div className="p-4">
                <DayTabs 
                  numDays={tripConfig.numDays}
                  currentDay={currentDay}
                  onDayChange={handleDayChange}
                />
                
                <p className="text-sm text-muted-foreground">
                  Click on a day to view and edit its activities. Drag and drop items between days to reorganize your itinerary.
                </p>
              </div>
            </div>
            
            <TripSummary
              tripConfig={tripConfig}
              selectedHotel={selectedHotel}
              itinerary={itinerary}
              onFinalizeItinerary={handleFinalizeItinerary}
            />
          </div>
        </div>
      </div>
      
      <TravelChatbot />
    </div>
  );
}
