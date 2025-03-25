
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "@/context/TripContext";
import Index from "./pages/Index";
import TripConfiguration from "./pages/TripConfiguration";
import HotelSelection from "./pages/HotelSelection";
import AttractionSelection from "./pages/AttractionSelection";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import FinalItinerary from "./pages/FinalItinerary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TripProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trip-configuration" element={<TripConfiguration />} />
            <Route path="/hotel-selection" element={<HotelSelection />} />
            <Route path="/attraction-selection" element={<AttractionSelection />} />
            <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
            <Route path="/final-itinerary" element={<FinalItinerary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
