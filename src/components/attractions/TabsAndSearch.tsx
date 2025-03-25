
import { Search } from "lucide-react";

interface TabsAndSearchProps {
  activeTab: "attractions" | "restaurants";
  setActiveTab: (tab: "attractions" | "restaurants") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TabsAndSearch = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}: TabsAndSearchProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 font-medium rounded-md transition-colors ${
            activeTab === "attractions"
              ? "bg-primary text-white"
              : "bg-secondary text-foreground"
          }`}
          onClick={() => setActiveTab("attractions")}
        >
          Attractions
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-md transition-colors ${
            activeTab === "restaurants"
              ? "bg-primary text-white"
              : "bg-secondary text-foreground"
          }`}
          onClick={() => setActiveTab("restaurants")}
        >
          Restaurants
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-md border border-input bg-background py-2 px-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
};
