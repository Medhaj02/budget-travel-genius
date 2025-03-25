
import { useState } from "react";

interface DayTabsProps {
  numDays: number;
  currentDay: number;
  onDayChange: (day: number) => void;
}

export default function DayTabs({ numDays, currentDay, onDayChange }: DayTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Array.from({ length: numDays }, (_, i) => i + 1).map((day) => (
        <button
          key={day}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentDay === day
              ? "bg-primary text-white"
              : "bg-secondary text-foreground"
          }`}
          onClick={() => onDayChange(day)}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
}
