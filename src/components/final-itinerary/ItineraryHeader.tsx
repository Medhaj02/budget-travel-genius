
import { Check, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripConfig } from "@/types";

interface ItineraryHeaderProps {
  tripConfig: TripConfig;
  totalCost: number;
  isSaved: boolean;
  onSave: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export default function ItineraryHeader({
  tripConfig,
  totalCost,
  isSaved,
  onSave,
  onPrint,
  onShare
}: ItineraryHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Your Trip to {tripConfig.destination}</h1>
        <p className="text-muted-foreground">
          {tripConfig.numDays} days • {tripConfig.numPersons} {tripConfig.numPersons === 1 ? 'person' : 'people'} • ${totalCost} total
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onPrint}
        >
          <Printer size={16} />
          <span>Print</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onShare}
        >
          <Share2 size={16} />
          <span>Share</span>
        </Button>
        <Button
          variant={isSaved ? "secondary" : "default"}
          size="sm"
          className="flex items-center gap-1"
          onClick={onSave}
        >
          {isSaved ? <Check size={16} /> : <Download size={16} />}
          <span>{isSaved ? "Saved" : "Save"}</span>
        </Button>
      </div>
    </div>
  );
}
