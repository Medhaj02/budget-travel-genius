
import { Hotel } from "lucide-react";
import type { Hotel as HotelType } from "@/types";

interface HotelCardProps {
  hotel: HotelType;
  numDays: number;
}

export default function HotelCard({ hotel, numDays }: HotelCardProps) {
  return (
    <div className="glass dark:glass-dark rounded-xl overflow-hidden mb-8">
      <div className="bg-primary text-white p-5">
        <div className="flex items-center gap-2">
          <Hotel size={20} />
          <h2 className="text-xl font-semibold">Your Hotel</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {hotel.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs"
                >
                  {amenity}
                </div>
              ))}
            </div>
            <div className="text-primary font-medium">
              ${hotel.price} per night • ${hotel.price * numDays} total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
