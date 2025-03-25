
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { Itinerary, Hotel, TripConfig } from "@/types";

interface TripSummaryProps {
  tripConfig: TripConfig;
  selectedHotel: Hotel;
  itinerary: Itinerary;
  onFinalizeItinerary: () => void;
}

export default function TripSummary({ 
  tripConfig, 
  selectedHotel, 
  itinerary, 
  onFinalizeItinerary 
}: TripSummaryProps) {
  return (
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
            <p className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {itinerary.totalCost.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        
        <Button
          className="w-full mt-6"
          onClick={onFinalizeItinerary}
        >
          Finalize Itinerary
        </Button>
      </div>
    </div>
  );
}
