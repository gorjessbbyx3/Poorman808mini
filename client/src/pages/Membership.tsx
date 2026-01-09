import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, Shield, Truck, Clock, Star, Users, Wrench, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Essential",
    price: 19,
    description: "Perfect for individual drivers who want peace of mind",
    popular: false,
    benefits: [
      "2 free local tows per year (up to 10 miles)",
      "Battery jump-start service",
      "Flat tire assistance",
      "Lockout service",
      "10% off additional tows",
      "24/7 phone support",
    ],
  },
  {
    name: "Premium",
    price: 39,
    description: "Our most popular plan with island-wide coverage",
    popular: true,
    benefits: [
      "4 free tows per year (island-wide)",
      "All Essential benefits included",
      "Fuel delivery service",
      "Winch-out service (1 per year)",
      "Priority dispatch",
      "15% off all additional services",
      "Free vehicle inspection",
    ],
  },
  {
    name: "Ohana",
    price: 59,
    description: "Complete coverage for the whole family",
    popular: false,
    benefits: [
      "6 free tows per year (island-wide)",
      "All Premium benefits included",
      "Covers up to 4 household vehicles",
      "Unlimited lockout services",
      "2 winch-outs per year",
      "20% off all additional services",
      "VIP priority response",
      "Free annual vehicle checkup",
    ],
  },
];

export default function Membership() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInquiry = async (planType: string) => {
    setSelectedPlan(planType);
    const element = document.getElementById("signup-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast({ title: "Please select a plan first", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/membership-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          planType: selectedPlan,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit inquiry");
      }
      
      toast({
        title: "Inquiry Submitted!",
        description: "We'll contact you soon to complete your membership signup.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedPlan(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black bg-noise">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-sm">Roadside Protection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
              MEMBERSHIP PLANS
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join the Poorman808 ohana and never worry about being stranded again. 
              Affordable monthly plans with real Aloha service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Truck, title: "Free Tows", desc: "Included tows every year" },
              { icon: Clock, title: "24/7 Service", desc: "Always here when you need us" },
              { icon: Star, title: "Priority", desc: "Skip the line as a member" },
              { icon: Users, title: "Family Plans", desc: "Cover your whole household" },
            ].map((feature, i) => (
              <div key={i} className="bg-card/50 border border-white/5 p-6 rounded-xl text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary"
                    : "bg-card border border-white/10"
                }`}
                data-testid={`card-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold text-sm px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h2>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-display font-bold text-white">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={() => handleInquiry(plan.name.toLowerCase())}
                  className={`w-full h-14 text-lg font-bold ${
                    plan.popular
                      ? "bg-primary text-black hover:bg-primary/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  } ${selectedPlan === plan.name.toLowerCase() ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                  data-testid={`button-signup-${plan.name.toLowerCase()}`}
                >
                  {selectedPlan === plan.name.toLowerCase() ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Selected
                    </>
                  ) : (
                    "Sign Up Now"
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            id="signup-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-8 md:p-12 mb-16"
          >
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">
                {selectedPlan ? `Sign Up for ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}` : "Join Our Ohana"}
              </h2>
              <p className="text-gray-400 mb-8 text-center">
                {selectedPlan 
                  ? "Complete your information below and we'll contact you to finalize your membership." 
                  : "Select a plan above, then fill out the form to get started."}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      data-testid="input-member-name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      data-testid="input-member-phone"
                      placeholder="(808) 555-1234"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-background border-white/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="input-member-email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-white/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Questions or Comments (Optional)</Label>
                  <Textarea
                    id="message"
                    data-testid="input-member-message"
                    placeholder="Any questions about our membership plans?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-white/20 min-h-[100px]"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedPlan || isSubmitting}
                  data-testid="button-submit-inquiry"
                  className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {selectedPlan ? "Submit Membership Inquiry" : "Select a Plan First"}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <Wrench className="w-12 h-12 mx-auto text-primary mb-6" />
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                WHY JOIN POORMAN808?
              </h2>
              <p className="text-gray-400 mb-8">
                Unlike big corporate roadside assistance companies, we're your neighbors. 
                When you call, you get a real person who knows the island. 
                No robots, no runaround—just fast, friendly service with genuine Aloha spirit.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-background/50 p-6 rounded-xl">
                  <h3 className="font-bold text-white mb-2">Local Knowledge</h3>
                  <p className="text-sm text-gray-500">We know every road, from Ewa Beach to the North Shore.</p>
                </div>
                <div className="bg-background/50 p-6 rounded-xl">
                  <h3 className="font-bold text-white mb-2">No Hidden Fees</h3>
                  <p className="text-sm text-gray-500">Transparent pricing. What we quote is what you pay.</p>
                </div>
                <div className="bg-background/50 p-6 rounded-xl">
                  <h3 className="font-bold text-white mb-2">Cancel Anytime</h3>
                  <p className="text-sm text-gray-500">No contracts, no penalties. Stay because you want to.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm mb-4">
              Ready to join? Have questions about our plans?
            </p>
            <Button
              size="lg"
              asChild
              className="bg-primary text-black hover:bg-primary/90 h-16 px-10 text-xl font-display uppercase"
              data-testid="button-call-membership"
            >
              <a href="tel:8088920158">
                <Phone className="w-6 h-6 mr-3" />
                Call (808) 892-0158
              </a>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
