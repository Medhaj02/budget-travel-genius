
import Header from "@/components/Header";
import HotelSelection from "@/components/HotelSelection";
import TravelChatbot from "@/components/TravelChatbot";

const HotelSelectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      <HotelSelection />
      <TravelChatbot />
    </div>
  );
};

export default HotelSelectionPage;
