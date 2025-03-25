
import Header from "@/components/Header";
import TripConfig from "@/components/TripConfig";

const TripConfigurationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      <div className="container px-4 py-10 mx-auto">
        <TripConfig />
      </div>
    </div>
  );
};

export default TripConfigurationPage;
