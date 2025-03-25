
import Header from "@/components/Header";
import ItineraryBuilder from "@/components/ItineraryBuilder";

const ItineraryBuilderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      <ItineraryBuilder />
    </div>
  );
};

export default ItineraryBuilderPage;
