
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TripConfig as ITripConfig } from "@/types";
import { useTrip } from "@/context/TripContext";
import { Users, CalendarDays, MapPin, Compass } from "lucide-react";

export default function TripConfig() {
  const { tripConfig, setTripConfig, setCurrentStep } = useTrip();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ITripConfig>({
    budget: tripConfig?.budget || 0,
    numPersons: tripConfig?.numPersons || 1,
    tripType: tripConfig?.tripType || "leisure",
    numDays: tripConfig?.numDays || 3,
    destination: tripConfig?.destination || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tripTypes = [
    { value: "leisure", label: "Leisure" },
    { value: "adventure", label: "Adventure" },
    { value: "pilgrimage", label: "Pilgrimage" },
    { value: "wildlife", label: "Wildlife" },
    { value: "historical", label: "Historical" },
    { value: "romantic", label: "Romantic" },
    { value: "family", label: "Family" },
  ];
  
  const popularDestinations = [
    "Goa", "Jaipur", "Varanasi", "Delhi", "Mumbai", "Agra", 
    "Udaipur", "Rishikesh", "Manali", "Darjeeling", "Shimla", 
    "Kerala", "Leh Ladakh", "Coorg", "Amritsar"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    let processedValue: any = value;
    if (name === "numPersons" || name === "numDays") {
      processedValue = parseInt(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.numPersons <= 0) {
      newErrors.numPersons = "Number of persons must be at least 1";
    }
    
    if (formData.numDays <= 0) {
      newErrors.numDays = "Trip duration must be at least 1 day";
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setTripConfig(formData);
    setCurrentStep(2);
    navigate("/hotel-selection");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="glass dark:glass-dark rounded-2xl p-8 shadow-lg animate-scale-in">
        <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
        <p className="text-muted-foreground mb-6">
          Tell us more about your trip to India so we can plan the perfect itinerary.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users size={16} />
                Number of Travelers
              </label>
              <input
                type="number"
                name="numPersons"
                value={formData.numPersons}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                min="1"
                max="20"
              />
              {errors.numPersons && (
                <p className="text-sm text-destructive mt-1">{errors.numPersons}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Compass size={16} />
                Trip Type
              </label>
              <select
                name="tripType"
                value={formData.tripType}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {tripTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <CalendarDays size={16} />
                Trip Duration (days)
              </label>
              <input
                type="number"
                name="numDays"
                value={formData.numDays}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                min="1"
                max="30"
              />
              {errors.numDays && (
                <p className="text-sm text-destructive mt-1">{errors.numDays}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Destination in India
              </label>
              <input
                list="indian-destinations"
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="e.g. Goa, Jaipur, Delhi"
              />
              <datalist id="indian-destinations">
                {popularDestinations.map((dest) => (
                  <option key={dest} value={dest} />
                ))}
              </datalist>
              {errors.destination && (
                <p className="text-sm text-destructive mt-1">{errors.destination}</p>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Continue to Hotel Selection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
