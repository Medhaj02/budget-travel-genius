
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import { DollarSign } from "lucide-react";

export default function BudgetInput() {
  const { setTripConfig, setCurrentStep } = useTrip();
  const [budget, setBudget] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const budgetValue = parseFloat(budget);
    
    if (!budgetValue || budgetValue <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }
    
    if (budgetValue < 100) {
      setError("Budget must be at least $100");
      return;
    }
    
    setTripConfig({
      budget: budgetValue,
      numPersons: 1,
      tripType: "leisure",
      numDays: 3,
      destination: ""
    });
    
    setCurrentStep(1);
    navigate("/trip-configuration");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass dark:glass-dark rounded-2xl p-8 shadow-lg animate-scale-in">
        <h2 className="text-2xl font-semibold mb-4 text-center">What's your budget?</h2>
        <p className="text-muted-foreground mb-6 text-center">
          Let's start planning your trip based on your budget.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                setError("");
              }}
              className="pl-10 w-full h-14 rounded-lg border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-lg"
              placeholder="Enter your budget"
              min="100"
            />
          </div>
          
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          
          <Button
            type="submit"
            className="w-full h-12 text-base hover-scale"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
