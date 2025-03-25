
import { createContext, useContext, ReactNode } from "react";
import { TripContextProps } from "./types";
import { useTripState } from "./useTripState";

const TripContext = createContext<TripContextProps | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const tripState = useTripState();

  return (
    <TripContext.Provider value={tripState}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
