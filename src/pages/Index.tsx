
import { motion } from "framer-motion";
import BudgetInput from "@/components/BudgetInput";
import { MapPin, Plane, Hotel, CalendarDays, CreditCard } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Budget-Based Planning",
      description: "Plan your entire trip based on your budget constraints."
    },
    {
      icon: <Hotel className="h-6 w-6 text-primary" />,
      title: "Hotel Selection",
      description: "Choose from a range of hotels that fit your budget."
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Attractions & Dining",
      description: "Discover places to visit and restaurants within your budget."
    },
    {
      icon: <CalendarDays className="h-6 w-6 text-primary" />,
      title: "Customizable Itinerary",
      description: "Create and customize your trip itinerary as you wish."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container px-4 py-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Plan Your Perfect Trip Within Your Budget
          </h1>
          <p className="text-xl text-muted-foreground">
            Create a personalized travel itinerary based on your budget, preferences, and destination.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <BudgetInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24"
        >
          <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass dark:glass-dark p-6 rounded-xl hover-lift"
              >
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
