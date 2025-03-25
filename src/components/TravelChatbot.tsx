
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Umbrella, Shirt, Bus, Map, Send, Info, X } from "lucide-react";
import { useTrip } from "@/context/TripContext";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  category?: "weather" | "clothing" | "transport" | "tips";
}

export default function TravelChatbot() {
  const { tripConfig } = useTrip();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: `Welcome to your travel assistant! Ask me about weather, what to pack, how to reach or local tips for ${tripConfig?.destination || "your destination"}.`,
      sender: "bot",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: inputMessage,
        sender: "user",
      },
    ]);
    
    setInputMessage("");
    
    // Process query and generate response
    setTimeout(() => {
      let response: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: "I'm sorry, I couldn't understand your query.",
        sender: "bot",
      };
      
      const query = inputMessage.toLowerCase();
      const destination = tripConfig?.destination || "your destination";
      
      if (query.includes("weather") || query.includes("temperature") || query.includes("climate")) {
        response = {
          id: `bot-${Date.now()}`,
          text: `The current weather in ${destination} is sunny with temperatures around 28°C. The evenings can get cooler, dropping to about 18°C. There's a slight chance of rain in the coming days.`,
          sender: "bot",
          category: "weather",
        };
      } else if (query.includes("pack") || query.includes("cloth") || query.includes("wear")) {
        response = {
          id: `bot-${Date.now()}`,
          text: `For ${destination}, pack light cotton clothes, comfortable walking shoes, a light jacket for evenings, sunglasses, sunscreen, and a hat. If you're visiting temples, bring clothes that cover shoulders and knees. Don't forget a small umbrella as well.`,
          sender: "bot",
          category: "clothing",
        };
      } else if (query.includes("reach") || query.includes("transport") || query.includes("travel") || query.includes("get to")) {
        response = {
          id: `bot-${Date.now()}`,
          text: `You can reach ${destination} by: 1) Flight - The nearest airport is ${destination} Airport with regular connections from major cities. 2) Train - Well-connected rail network with stations in the city center. 3) Bus - State-run and private luxury buses available. 4) Car - Good road connectivity if you prefer driving.`,
          sender: "bot",
          category: "transport",
        };
      } else if (query.includes("tip") || query.includes("advice") || query.includes("precaution") || query.includes("safety")) {
        response = {
          id: `bot-${Date.now()}`,
          text: `Tips for ${destination}: 1) Stay hydrated and carry water bottles. 2) Be cautious of your belongings in crowded areas. 3) Respect local customs especially at religious sites. 4) Use reputable transportation services. 5) Try local cuisine but be careful with street food if you have a sensitive stomach. 6) Bargain at local markets but be respectful.`,
          sender: "bot",
          category: "tips",
        };
      } else {
        response = {
          id: `bot-${Date.now()}`,
          text: `I can help you with information about weather, what to pack, how to reach ${destination}, or local tips and precautions. Feel free to ask!`,
          sender: "bot",
        };
      }
      
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };
  
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "weather":
        return <Umbrella className="h-5 w-5 text-blue-500" />;
      case "clothing":
        return <Shirt className="h-5 w-5 text-green-500" />;
      case "transport":
        return <Bus className="h-5 w-5 text-orange-500" />;
      case "tips":
        return <Info className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Map className="h-6 w-6" />}
      </Button>
      
      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] glass dark:glass-dark rounded-xl overflow-hidden shadow-xl animate-scale-in">
          <div className="bg-primary p-4 text-primary-foreground">
            <h3 className="font-semibold">Travel Assistant</h3>
            <p className="text-xs opacity-80">Ask about weather, packing, transportation & tips</p>
          </div>
          
          <div className="flex flex-col h-[calc(100%-128px)] p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.category && (
                    <div className="flex items-center mb-1">
                      {getCategoryIcon(message.category)}
                      <span className="text-xs font-semibold ml-1 capitalize">
                        {message.category}
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about weather, packing, transport..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
