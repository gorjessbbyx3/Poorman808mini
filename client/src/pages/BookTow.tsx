import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Truck, MapPin, Phone, Car, Calendar, Clock, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
// @ts-ignore
import textureBg from "@assets/generated_images/oahu_topographic_map_dark_texture.png";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  serviceType: z.string().min(1, "Please select a service"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleColor: z.string().min(1, "Vehicle color is required"),
  pickupLocation: z.string().min(5, "Pickup location is required"),
  dropoffLocation: z.string().optional(),
  notes: z.string().optional(),
});

export default function BookTow() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleColor: "",
      pickupLocation: "",
      dropoffLocation: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }
      
      const booking = await response.json();
      
      toast({
        title: "Request Received!",
        description: `Booking #${booking.bookingNumber} created. Redirecting to tracker...`,
        duration: 3000,
      });
      
      setTimeout(() => {
        setLocation("/tracker");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-20 relative">
        {/* Background Texture */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
            <img src={textureBg} alt="texture" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                BOOK A <span className="text-primary">TOW</span>
              </h1>
              <p className="text-xl text-gray-400">
                Tell us where you are and we'll get you rolling. <br className="hidden md:block"/>
                For immediate emergencies, call <a href="tel:8088920158" className="text-primary font-bold hover:underline">(808) 892-0158</a>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Contact Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-display text-white flex items-center gap-2 border-b border-white/10 pb-2">
                      <Phone className="w-5 h-5 text-primary" /> Contact Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Kimo Smith" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(808) 555-0123" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Vehicle Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-display text-white flex items-center gap-2 border-b border-white/10 pb-2">
                      <Car className="w-5 h-5 text-primary" /> Vehicle Info
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="vehicleMake"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Make</FormLabel>
                            <FormControl>
                              <Input placeholder="Toyota" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Model</FormLabel>
                            <FormControl>
                              <Input placeholder="Tacoma" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Color</FormLabel>
                            <FormControl>
                              <Input placeholder="White" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Service Details Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-display text-white flex items-center gap-2 border-b border-white/10 pb-2">
                      <Truck className="w-5 h-5 text-primary" /> Service Details
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Service Needed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50 text-white">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-white/10 text-white">
                              <SelectItem value="towing">Emergency Towing</SelectItem>
                              <SelectItem value="lockout">Lockout Service</SelectItem>
                              <SelectItem value="jumpstart">Battery Jump Start</SelectItem>
                              <SelectItem value="tire">Flat Tire Change</SelectItem>
                              <SelectItem value="fuel">Fuel Delivery</SelectItem>
                              <SelectItem value="winch">Winch Out / Recovery</SelectItem>
                              <SelectItem value="quote">Just a Quote</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pickupLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Pickup Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Address or Landmark" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="dropoffLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Drop-off Location (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Repair Shop or Home" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special instructions? (e.g. lowered car, in a parking garage, etc.)" 
                              className="bg-background/50 border-white/10 focus:border-primary/50 text-white min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-black font-display text-2xl uppercase tracking-wider h-16 hover:bg-primary/90 clip-path-slant disabled:opacity-50"
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "Submitting..." : "Request Service Now"}
                    </Button>
                    <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        This is a request form. Payment is handled on-site.
                    </p>
                  </div>

                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
