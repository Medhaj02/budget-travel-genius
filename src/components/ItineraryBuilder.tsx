
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@/context/TripContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Hotel, MapPin, Utensils, Clock, Edit, Trash, Plus, CalendarDays } from "lucide-react";
import { Attraction, Hotel, ItineraryDay, ItineraryItem, Restaurant } from "@/types";

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
  const timeSlots = ["Morning", "Afternoon", "Evening"];
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

  const renderItemCard = (item: ItineraryItem) => {
    const [type, itemId] = item.itemId.split("-");
    const data = getItemById(item.itemId, item.type as any);
    
    if (!data) return null;
    
    const ItemIcon = item.type === "hotel" ? Hotel : item.type === "attraction" ? MapPin : Utensils;
    
    return (
      <div
        key={item.id}
        className="glass dark:glass-dark p-4 rounded-lg hover-lift mb-4 cursor-grab active:cursor-grabbing"
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-md">
            <ItemIcon className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{(data as any).name}</h4>
                <p className="text-xs text-muted-foreground">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
              </div>
              
              {item.type !== "hotel" && (
                <div className="text-sm font-medium">
                  ${(data as any).price}
                </div>
              )}
            </div>
            
            {item.time && (
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {item.time}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDayTab = (day: number) => {
    return (
      <button
        key={day}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentDay === day
            ? "bg-primary text-white"
            : "bg-secondary text-foreground"
        }`}
        onClick={() => handleDayChange(day)}
      >
        Day {day}
      </button>
    );
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
            <div className="glass dark:glass-dark rounded-xl overflow-hidden">
              <div className="bg-accent p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Day {currentDay}</h3>
                </div>
              </div>
              
              <div 
                className="p-6 min-h-[400px]"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, currentDay)}
              >
                {dayItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Drag and drop activities here to build your day.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {timeSlots.map((slot) => (
                      <div key={slot} className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">{slot}</h4>
                        <div className="space-y-2">
                          {dayItems
                            .filter((item) => {
                              if (slot === "Morning" && item.type === "hotel") return true;
                              if (slot === "Afternoon" && item.type === "attraction") return true;
                              if (slot === "Evening" && item.type === "restaurant") return true;
                              return false;
                            })
                            .map(renderItemCard)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="glass dark:glass-dark rounded-xl overflow-hidden mb-6">
              <div className="bg-accent p-4 border-b">
                <h3 className="font-semibold">Days</h3>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({ length: tripConfig.numDays }, (_, i) => i + 1).map(renderDayTab)}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Click on a day to view and edit its activities. Drag and drop items between days to reorganize your itinerary.
                </p>
              </div>
            </div>
            
            <div className="glass dark:glass-dark rounded-xl overflow-hidden">
              <div className="bg-accent p-4 border-b">
                <h3 className="font-semibold">Trip Summary</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{tripConfig.destination}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{tripConfig.numDays} days</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Hotel</p>
                    <p className="font-medium">{selectedHotel.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-medium">${itinerary.totalCost}</p>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6"
                  onClick={handleFinalizeItinerary}
                >
                  Finalize Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
