
import Header from "@/components/Header";
import AttractionSelection from "@/components/attractions";
import TravelChatbot from "@/components/TravelChatbot";

const AttractionSelectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      <AttractionSelection />
      <TravelChatbot />
    </div>
  );
};

export default AttractionSelectionPage;
