
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onEditItinerary: () => void;
  onNewTrip: () => void;
}

export default function NavigationButtons({ onEditItinerary, onNewTrip }: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex justify-between">
      <Button variant="outline" onClick={onEditItinerary}>
        Edit Itinerary
      </Button>
      <Button onClick={onNewTrip}>
        Plan a New Trip
      </Button>
    </div>
  );
}
