import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Search, MapPin, Truck, CheckCircle2, Clock, User, Navigation, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Booking } from "@shared/schema";
// @ts-ignore
import mapBg from "@assets/generated_images/dark_mode_navigation_map_ui.png";
// @ts-ignore
import truckImage from "@assets/IMG_5870_1766386909628.jpeg";

const formSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type BookingStatus = 'received' | 'confirmed' | 'assigning' | 'en_route' | 'arrived' | 'completed';

const STEPS: { id: number; status: BookingStatus; label: string; icon: any; desc: string }[] = [
  { id: 1, status: 'received', label: "Request Received", icon: Clock, desc: "We have your details." },
  { id: 2, status: 'confirmed', label: "Confirmed", icon: CheckCircle2, desc: "Dispatch has verified your location." },
  { id: 3, status: 'assigning', label: "Assigning Driver", icon: User, desc: "Finding the best truck for you." },
  { id: 4, status: 'en_route', label: "Driver En Route", icon: Truck, desc: "Help is on the way!" },
  { id: 5, status: 'arrived', label: "Driver Arrived", icon: MapPin, desc: "Look for the flashing lights." },
];

export default function Tracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/bookings/phone/${encodeURIComponent(values.phone)}`);
      
      if (!response.ok) {
        form.setError("phone", { message: "No active booking found for this number." });
        return;
      }
      
      const booking = await response.json();
      setCurrentBooking(booking);
      setIsTracking(true);
    } catch (error) {
      form.setError("phone", { message: "Error searching for booking. Please try again." });
    } finally {
      setIsSearching(false);
    }
  }

  // Auto-refresh booking status if tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentBooking) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/bookings/phone/${encodeURIComponent(currentBooking.phone)}`);
          if (response.ok) {
            const freshBooking = await response.json();
            setCurrentBooking(freshBooking);
          }
        } catch (error) {
          console.error("Error refreshing booking:", error);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentBooking]);


  const getCurrentStepIndex = (status: BookingStatus) => {
    if (status === 'completed') return 6; 
    return STEPS.findIndex(s => s.status === status) + 1;
  };
  
  const currentStep = currentBooking ? getCurrentStepIndex(currentBooking.status as BookingStatus) : 0;
  
  const getEta = (status: BookingStatus) => {
      if (status === 'en_route') return "12 MIN";
      if (status === 'arrived') return "ARRIVED";
      if (status === 'completed') return "DONE";
      return "--";
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary selection:text-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 relative flex flex-col">
        
        {/* Background Map (Only visible when tracking) */}
        <AnimatePresence>
          {isTracking && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
              <img src={mapBg} alt="Map" className="w-full h-full object-cover opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
              TOW <span className="text-primary">TRACKER</span>
            </h1>
            {!isTracking && (
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Enter your phone number to see exactly where your rescue truck is.
              </p>
            )}
          </div>

          {/* Input Form */}
          {!isTracking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto w-full bg-card border border-white/10 p-8 rounded-xl shadow-2xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                            <Input 
                              placeholder="(808) 555-0123" 
                              {...field} 
                              className="pl-10 bg-background/50 border-white/10 focus:border-primary/50 text-white h-12 text-lg" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSearching}
                    className="w-full bg-primary text-black font-display text-xl uppercase tracking-wider h-14 hover:bg-primary/90 clip-path-slant disabled:opacity-50"
                    data-testid="button-track"
                  >
                    {isSearching ? "Searching..." : "Track Request"}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    * Demo: Create a booking first to track it.
                  </p>
                </form>
              </Form>
            </motion.div>
          ) : currentBooking && (
            /* Tracking View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Status List */}
                <div className="md:col-span-2 bg-card/80 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                     <div>
                        <h2 className="text-2xl font-display text-white">STATUS: <span className="text-primary">{
                            currentBooking.status === 'completed' ? 'SERVICE COMPLETED' :
                            STEPS.find(s => s.status === currentBooking.status)?.label || "PROCESSING"
                        }</span></h2>
                        <p className="text-sm text-gray-400">Request #{currentBooking.bookingNumber}</p>
                     </div>
                     {(currentBooking.status === 'en_route' || currentBooking.status === 'arrived') && (
                         <div className="text-right">
                             <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">EST. ARRIVAL</div>
                             <div className="text-3xl font-display text-primary animate-pulse">{getEta(currentBooking.status as BookingStatus)}</div>
                         </div>
                     )}
                  </div>

                  <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10 z-0" />
                    
                    {STEPS.map((step) => {
                      const stepIndex = STEPS.findIndex(s => s.status === step.status) + 1;
                      const isActive = step.status === currentBooking.status;
                      const isCompleted = stepIndex < currentStep || currentBooking.status === 'completed';
                      
                      return (
                        <motion.div 
                          key={step.id}
                          initial={false}
                          animate={{ opacity: isCompleted || isActive ? 1 : 0.3 }}
                          className={`relative z-10 flex items-start gap-4 ${isActive ? 'scale-105 origin-left' : ''} transition-all duration-500`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors duration-500 ${
                            isActive ? 'bg-primary border-primary text-black shadow-[0_0_20px_rgba(255,100,0,0.5)]' : 
                            isCompleted ? 'bg-primary/20 border-primary text-primary' : 
                            'bg-background border-white/20 text-gray-500'
                          }`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          <div className="pt-1">
                            <h3 className={`font-bold uppercase tracking-wide ${isActive ? 'text-primary' : 'text-white'}`}>
                              {step.label}
                            </h3>
                            <p className="text-sm text-gray-400">{step.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Driver Info Card */}
                <div className="md:col-span-1 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: currentStep >= 3 && currentBooking.status !== 'completed' ? 1 : 0.5, x: 0 }}
                        className="bg-card/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl"
                    >
                        <h3 className="text-lg font-display text-white border-b border-white/10 pb-2 mb-4">YOUR DRIVER</h3>
                        {currentStep >= 3 && currentBooking.status !== 'completed' ? (
                            <>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                                        <img src={truckImage} alt="Driver" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-xl">{currentBooking.agentName || "KEOKI"}</div>
                                        <div className="text-primary text-sm font-bold flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Active Now
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Vehicle:</span>
                                        <span className="text-white font-bold">Ford F-550 Flatbed</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Plate:</span>
                                        <span className="text-white font-bold">TOW-808</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Rating:</span>
                                        <span className="text-primary font-bold">5.0 ★</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white" variant="outline" asChild>
                                        <a href={`tel:${currentBooking.agentPhone || '8088920158'}`}><Phone className="w-4 h-4 mr-2" /> Contact Driver</a>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <User className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p>{currentBooking.status === 'completed' ? "Service Completed" : "Assigning driver..."}</p>
                            </div>
                        )}
                    </motion.div>
                    
                    {/* Booking Details Summary */}
                     <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
                        <h3 className="text-lg font-display text-white border-b border-white/10 pb-2 mb-4">REQUEST DETAILS</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Service</div>
                                <div className="text-white font-medium capitalize">{currentBooking.serviceType}</div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Vehicle</div>
                                <div className="text-white font-medium">{currentBooking.vehicleMake} {currentBooking.vehicleModel}</div>
                            </div>
                             <div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Pickup</div>
                                <div className="text-white font-medium truncate">{currentBooking.pickupLocation}</div>
                            </div>
                        </div>
                     </div>
                </div>

              </div>
              
              <div className="mt-8 text-center">
                  <Button variant="link" onClick={() => setIsTracking(false)} className="text-white/50 hover:text-white">
                      Start Over / Track Another Number
                  </Button>
              </div>
            </motion.div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
