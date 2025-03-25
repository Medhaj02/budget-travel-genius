
import { useTrip } from "@/context/TripContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { tripConfig, getRemainingBudget, currentStep, resetTrip } = useTrip();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { path: "/", label: "Home" },
    { path: "/trip-configuration", label: "Trip Details" },
    { path: "/hotel-selection", label: "Hotel Selection" },
    { path: "/attraction-selection", label: "Places to Visit" },
    { path: "/itinerary-builder", label: "Itinerary Builder" },
    { path: "/final-itinerary", label: "Final Itinerary" },
  ];

  const currentPage = steps.findIndex((step) => step.path === location.pathname);

  const handleBack = () => {
    if (currentPage > 0) {
      navigate(steps[currentPage - 1].path);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass dark:glass-dark border-b flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {currentPage > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl font-semibold animate-pulse-soft">
              TravelBudget
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {tripConfig && (
            <div className="text-sm font-medium">
              <span className="mr-1">Budget:</span>
              <span className="text-primary">${tripConfig.budget}</span>
              <span className="mx-2">|</span>
              <span className="mr-1">Remaining:</span>
              <span className={`${getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}`}>
                ${getRemainingBudget()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            title="Home"
          >
            <Home size={20} />
          </Button>
          
          <div className="relative md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 glass dark:glass-dark rounded-md shadow-lg overflow-hidden z-20 animate-fade-in">
                <div className="py-2">
                  {tripConfig && (
                    <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                      <div>Budget: ${tripConfig.budget}</div>
                      <div>
                        Remaining:{" "}
                        <span className={`${getRemainingBudget() < 0 ? 'text-destructive' : 'text-primary'}`}>
                          ${getRemainingBudget()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => {
                    resetTrip();
                    navigate("/");
                    setIsMenuOpen(false);
                  }}>
                    Start New Trip
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative w-full bg-accent/50">
        {currentPage > 0 && (
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto py-3 gap-3 no-scrollbar">
              {steps.slice(1).map((step, idx) => (
                <div 
                  key={idx} 
                  className={`whitespace-nowrap text-sm font-medium ${
                    idx + 1 === currentPage 
                      ? "text-primary border-b-2 border-primary" 
                      : idx + 1 < currentPage 
                        ? "text-foreground cursor-pointer" 
                        : "text-muted-foreground"
                  } pb-2 pt-1`}
                  onClick={() => {
                    if (idx + 1 < currentPage) {
                      navigate(step.path);
                    }
                  }}
                >
                  {step.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
