import { useState } from "react";
import { Phone, MapPin, Clock, ShieldCheck, Truck, Battery, Key, Wrench, Fuel, Car, Star, Quote, Send, Loader2, CheckCircle } from "lucide-react";
import { SiGoogle, SiFacebook, SiYelp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import logo from "@assets/Remove_background_project_1766387130199.png";
// @ts-ignore
import heroBg from "@assets/Untitled_1766402716631.mp4";
import gallery1 from "@assets/image_1767035550400.jpeg";
import gallery2 from "@assets/image_1767035572733.jpeg";
import gallery3 from "@assets/image_1767035637719.jpeg";
import gallery4 from "@assets/image_1767035675258.jpeg";
import featuredImage from "@assets/image_1767035948720.jpeg";
import truckImage from "@assets/image_1767036183064.jpeg";

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Request Received!",
      description: "We'll call you back within 5 minutes.",
    });
    
    setFormData({ name: "", phone: "", location: "", message: "" });
    setIsSubmitting(false);
  };

  const services = [
    {
      icon: Truck,
      title: "Emergency Towing",
      desc: "24/7 emergency towing service. Flatbed and wheel-lift for cars, trucks, and motorcycles.",
      price: "$80 + $4/mi",
    },
    {
      icon: Battery,
      title: "Jump Starts",
      desc: "Dead battery? We'll get you powered up and back on the road in minutes.",
      price: "From $45",
    },
    {
      icon: Key,
      title: "Lockout Service",
      desc: "Locked your keys inside? Our specialized tools unlock your car without damage.",
      price: "From $55",
    },
    {
      icon: Wrench,
      title: "Tire Change",
      desc: "Flat tire? We'll install your spare or inflate your tire to get you moving safely.",
      price: "From $50",
    },
    {
      icon: Fuel,
      title: "Fuel Delivery",
      desc: "Ran out of gas? We'll deliver enough fuel to get you to the nearest station.",
      price: "From $60",
    },
    {
      icon: Car,
      title: "Winch Out",
      desc: "Stuck in mud, sand, or a ditch? Our heavy-duty winches will pull you out.",
      price: "From $95",
    },
  ];

  const reviews = [
    {
      name: "JP",
      location: "Ewa Beach, HI",
      text: "Friendly and fast service responded quickly to my trouble call and got my vehicle to my house quick. Recommended service to all. Wonderful presence of Aloha!",
      stars: 5,
    },
    {
      name: "Marcus T.",
      location: "Pearl City, HI",
      text: "My GTI broke down near Pearl City around midnight on a busy Sunday night. Other towing companies claimed 24/7 but didn't answer. Poorman808 picked up, arrived quickly, and did an excellent job.",
      stars: 5,
    },
    {
      name: "Kiana L.",
      location: "Waipahu, HI",
      text: "Available when I needed them most! Came out right away and did an excellent job. The driver was super friendly and handled my car with care. Will definitely call again.",
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section with Contact Form */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            src={heroBg}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={logo} alt="Poorman808 Roadside" className="h-20 w-auto mb-8" data-testid="img-logo" />
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
                STUCK ON THE ROAD?<br />
                <span className="text-primary">WE GOT YOU.</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-lg" data-testid="text-hero-subtitle">
                Fast, reliable, and affordable roadside assistance across Oahu. Locally owned and operated with true Aloha spirit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white h-16 px-10 text-2xl font-display uppercase">
                  <a href="tel:8088920158" data-testid="button-call-hero">
                    <Phone className="w-6 h-6 mr-3" />
                    (808) 892-0158
                  </a>
                </Button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Clock, text: "24/7 Service" },
                  { icon: MapPin, text: "Island Wide" },
                  { icon: ShieldCheck, text: "Licensed & Insured" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2" data-testid="text-form-title">Get In Touch</h2>
              <p className="text-gray-600 mb-6">Need help? Fill out this form and we'll call you right back.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input
                    id="name"
                    data-testid="input-name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                  <Input
                    id="phone"
                    data-testid="input-phone"
                    placeholder="(808) 555-1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-gray-700">Location</Label>
                  <Input
                    id="location"
                    data-testid="input-location"
                    placeholder="Where are you located?"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-700">What do you need help with?</Label>
                  <Textarea
                    id="message"
                    data-testid="input-message"
                    placeholder="Briefly describe your situation..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 bg-gray-50 border-gray-200 min-h-[100px]"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="button-submit"
                  className="w-full h-14 text-lg font-bold bg-primary text-white hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request Callback
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6" data-testid="text-about-title">
              Oahu's Trusted Roadside Experts
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              <strong>Poorman808 Roadside</strong> has proudly served Hawaii since 2021, providing fast, affordable, and reliable roadside assistance with true Aloha. Our mission is simple: get you back on the road quickly and safely.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We specialize in <strong>emergency towing, jump starts, lockouts, tire changes, fuel delivery, and winch-outs</strong>. Whether you're stranded on the H1 at midnight or locked out at the beach, our team ensures a stress-free, professional experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "Fast Response", desc: "Average arrival time under 30 minutes" },
                { title: "Fair Pricing", desc: "Honest quotes with no hidden fees" },
                { title: "Local & Trusted", desc: "Over 20 years combined experience" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl">
                  <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Truck Image Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src={truckImage} 
                alt="Poorman808 Roadside flatbed tow truck"
                className="w-full h-auto object-cover"
                data-testid="img-truck"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4" data-testid="text-services-title">
              OUR SERVICES
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From emergency towing to roadside repairs, we've got you covered 24/7.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 text-center"
                data-testid={`card-service-${i}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.desc}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-bold text-xs">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4" data-testid="text-gallery-title">
              OUR WORK
            </h2>
            <p className="text-xl text-gray-600">From everyday tows to tough rescues</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="aspect-video rounded-lg overflow-hidden shadow-md"
                data-testid={`gallery-image-${i}`}
              >
                <img 
                  src={img} 
                  alt={`Poorman808 Roadside work photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <SiGoogle className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-sm">Customer Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900" data-testid="text-reviews-title">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl relative"
                data-testid={`card-review-${i}`}
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, s) => (
                    <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-lg mb-6 italic">"{review.text}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-white text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.google.com/search?q=Poorman808+Roadside+Ewa+Beach+reviews" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              data-testid="link-google-reviews"
            >
              <SiGoogle className="w-5 h-5" /> See more on Google
            </a>
            <a 
              href="https://www.yelp.com/biz/poorman808-roadside-ewa-beach" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              data-testid="link-yelp-reviews"
            >
              See us on <span className="text-[#c41200] font-bold">Yelp</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" data-testid="text-cta-title">
              Ready to Get Back on the Road?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Say goodbye to stress! Whether it's a flat tire, dead battery, or you're locked out, we'll take care of it. Contact us today for fast, reliable service.
            </p>
            
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white h-16 px-12 text-2xl font-display uppercase">
              <a href="tel:8088920158" data-testid="button-call-cta">
                <Phone className="w-6 h-6 mr-3" />
                (808) 892-0158
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src={featuredImage} 
                alt="Vintage camper being towed by Poorman808 Roadside"
                className="w-full h-auto object-cover"
                data-testid="img-featured"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <img src={logo} alt="Poorman808 Roadside" className="h-16 w-auto mb-4" />
              <p className="text-gray-400 mb-6">
                Ewa Beach's most trusted roadside assistance service. Fast, friendly, and fairly priced.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/p/Poorman808-Roadside-LLC-100076455785885/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                  data-testid="link-facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.yelp.com/biz/poorman808-roadside-ewa-beach" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#FF1A1A] rounded-full flex items-center justify-center transition-colors"
                  data-testid="link-yelp"
                >
                  <SiYelp className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.google.com/search?q=Poorman808+Roadside+Ewa+Beach" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#4285F4] rounded-full flex items-center justify-center transition-colors"
                  data-testid="link-google"
                >
                  <SiGoogle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-display font-bold mb-4">CONTACT INFO</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:8088920158" className="hover:text-primary transition-colors">(808) 892-0158</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>91-1159 Keahumoa Pkwy, Ewa Beach, HI</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Open 24 Hours / 7 Days</span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-display font-bold mb-4">SERVICES</h4>
              <ul className="space-y-2 text-gray-400">
                {['Towing', 'Lockouts', 'Jump Starts', 'Tire Changes', 'Fuel Delivery', 'Winch Out'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Poorman808 Roadside, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:8088920158" 
        className="fixed bottom-6 right-6 md:hidden z-50 bg-primary text-white p-4 rounded-full shadow-lg shadow-orange-500/30"
        data-testid="button-call-floating"
      >
        <Phone className="w-8 h-8" />
      </a>
    </div>
  );
}
