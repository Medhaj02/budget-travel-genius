
import { TripConfig } from "@/types";

interface CostBreakdownProps {
  tripConfig: TripConfig;
  hotelCost: number;
  attractionsCost: number;
  restaurantsCost: number;
  totalCost: number;
}

export default function CostBreakdown({
  tripConfig,
  hotelCost,
  attractionsCost,
  restaurantsCost,
  totalCost
}: CostBreakdownProps) {
  return (
    <div className="glass dark:glass-dark rounded-xl overflow-hidden mt-8">
      <div className="bg-primary text-white p-5">
        <h2 className="text-xl font-semibold">Cost Breakdown</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Hotel ({tripConfig.numDays} nights)</span>
            <span>${hotelCost}</span>
          </div>
          <div className="flex justify-between">
            <span>Attractions</span>
            <span>${attractionsCost}</span>
          </div>
          <div className="flex justify-between">
            <span>Restaurants</span>
            <span>${restaurantsCost}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total Cost</span>
            <span>${totalCost}</span>
          </div>
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>Original Budget</span>
            <span>${tripConfig.budget}</span>
          </div>
          <div className={`flex justify-between font-medium ${
            tripConfig.budget - totalCost >= 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}>
            <span>Remaining Budget</span>
            <span>${tripConfig.budget - totalCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
