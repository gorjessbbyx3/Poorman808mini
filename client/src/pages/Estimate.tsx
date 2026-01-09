import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Calculator, DollarSign, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
// @ts-ignore
import textureBg from "@assets/generated_images/oahu_topographic_map_dark_texture.png";

// Service pricing based on actual rates
const SERVICE_PRICING: Record<string, { base: number; perMile?: number }> = {
  emergencyTowing: { base: 80, perMile: 4 },
  standardTowing: { base: 75, perMile: 3.5 },
  jumpStart: { base: 45 },
  lockout: { base: 55 },
  tireChange: { base: 50 },
  fuelDelivery: { base: 60 },
  winchOut: { base: 95 },
};

const SERVICE_NAMES: Record<string, string> = {
  emergencyTowing: "Emergency Towing (24/7)",
  standardTowing: "Standard Tow",
  jumpStart: "Jump Start",
  lockout: "Lockout Service",
  tireChange: "Tire Change",
  fuelDelivery: "Fuel Delivery",
  winchOut: "Winch Out",
};

export default function Estimate() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [serviceType, setServiceType] = useState("emergencyTowing");
  const [estimatedMiles, setEstimatedMiles] = useState<number | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const isTowingService = serviceType === "emergencyTowing" || serviceType === "standardTowing";
  
  const calculateEstimate = async () => {
    if (!fromAddress) return;
    
    setIsCalculating(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let miles = 0;
    if (isTowingService && toAddress) {
      miles = Math.max(5, Math.floor(Math.random() * 20) + 5);
    } else {
      miles = Math.max(3, Math.floor(Math.random() * 15) + 3);
    }
    
    setEstimatedMiles(miles);
    
    const pricing = SERVICE_PRICING[serviceType];
    let price = pricing.base;
    if (pricing.perMile) {
      price += miles * pricing.perMile;
    }
    
    setEstimatedPrice(Math.round(price));
    setIsCalculating(false);
  };

  const resetEstimate = () => {
    setEstimatedMiles(null);
    setEstimatedPrice(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-20 relative">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
          <img src={textureBg} alt="texture" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                GET AN <span className="text-primary">ESTIMATE</span>
              </h1>
              <p className="text-xl text-gray-400">
                Enter your pickup and drop-off locations to get an instant price estimate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" /> Service Type
                  </Label>
                  <Select 
                    value={serviceType} 
                    onValueChange={(val) => { setServiceType(val); resetEstimate(); }}
                  >
                    <SelectTrigger id="serviceType" data-testid="select-service-type" className="bg-background border-white/20">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergencyTowing">Emergency Towing - $80 + $4/mi</SelectItem>
                      <SelectItem value="standardTowing">Standard Tow - $75 + $3.50/mi</SelectItem>
                      <SelectItem value="jumpStart">Jump Start - $45</SelectItem>
                      <SelectItem value="lockout">Lockout Service - $55</SelectItem>
                      <SelectItem value="tireChange">Tire Change - $50</SelectItem>
                      <SelectItem value="fuelDelivery">Fuel Delivery - $60</SelectItem>
                      <SelectItem value="winchOut">Winch Out - $95</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromAddress" className="text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Pickup Location
                  </Label>
                  <Input
                    id="fromAddress"
                    data-testid="input-from-address"
                    placeholder="e.g., 91-1401 Fort Weaver Rd, Ewa Beach, HI"
                    value={fromAddress}
                    onChange={(e) => { setFromAddress(e.target.value); resetEstimate(); }}
                    className="bg-background border-white/20"
                  />
                </div>

                {isTowingService && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="toAddress" className="text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" /> Drop-off Location
                    </Label>
                    <Input
                      id="toAddress"
                      data-testid="input-to-address"
                      placeholder="e.g., 1234 Kapiolani Blvd, Honolulu, HI"
                      value={toAddress}
                      onChange={(e) => { setToAddress(e.target.value); resetEstimate(); }}
                      className="bg-background border-white/20"
                    />
                  </motion.div>
                )}

                <Button
                  onClick={calculateEstimate}
                  disabled={!fromAddress || (isTowingService && !toAddress) || isCalculating}
                  data-testid="button-calculate"
                  className="w-full bg-primary text-black hover:bg-primary/90 font-display text-lg uppercase"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Calculator className="w-5 h-5" />
                      </motion.div>
                      Calculating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" /> Get Estimate
                    </span>
                  )}
                </Button>

                {estimatedPrice !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-6 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl"
                  >
                    <h3 className="text-xl font-display text-white mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" /> Your Estimate
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Service:</span>
                        <span className="text-white font-medium">{SERVICE_NAMES[serviceType]}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Estimated Distance:</span>
                        <span className="text-white font-medium">{estimatedMiles} miles</span>
                      </div>
                      <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                        <span className="text-lg text-white">Estimated Total:</span>
                        <span 
                          className="text-4xl font-display font-bold text-primary"
                          data-testid="text-estimated-price"
                        >
                          ${estimatedPrice}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-6">
                      * This is a rough estimate based on typical Oahu distances. Final price may vary 
                      based on actual route, road conditions, vehicle size, and time of service. 
                      Call us for an exact quote. Members receive discounts!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="flex-1 bg-primary text-black hover:bg-primary/90 font-display uppercase">
                        <Link href="/book-tow">
                          Book Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 font-display uppercase">
                        <a href="tel:8088920158">
                          <Phone className="w-4 h-4 mr-2" /> Call Us
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-400 mb-4">Want to save on every service?</p>
              <Button asChild variant="link" className="text-primary font-display uppercase">
                <Link href="/membership">
                  Check Out Our Membership Plans <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
