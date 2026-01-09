import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
// @ts-ignore
import heroBg from "@assets/Untitled_1766402716631.mp4";

export default function Hero() {
  const handleScrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          src={heroBg}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm md:text-base bg-black/50 backdrop-blur-sm w-fit mx-auto px-4 py-1 rounded-full border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Serving Ewa Beach & All of Oahu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-6 leading-[0.9] drop-shadow-2xl"
            data-testid="text-hero-title"
          >
            STUCK? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              WE GOT YOU.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
            data-testid="text-hero-subtitle"
          >
            Fast, reliable, and affordable roadside assistance. 
            Locally owned and operated with the Aloha spirit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild className="w-full md:w-auto bg-primary hover:bg-primary/90 text-black h-16 px-10 text-2xl font-display uppercase tracking-wider clip-path-slant group">
              <a href="tel:8088920158" data-testid="button-call-hero">
                <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                (808) 892-0158
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleScrollToServices}
              className="w-full md:w-auto border-white/20 hover:bg-white/10 text-white h-16 px-10 text-xl font-display uppercase tracking-wider"
              data-testid="button-services-hero"
            >
              Our Services
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Clock, title: "24/7 Service", desc: "Day or night, rain or shine." },
            { icon: MapPin, title: "Island Wide", desc: "From Ewa Beach to North Shore." },
            { icon: ShieldCheck, title: "Licensed & Insured", desc: "Professional care for your vehicle." },
          ].map((feature, i) => (
            <div key={i} className="bg-card/50 backdrop-blur-md border border-white/5 p-6 rounded-lg flex items-center gap-4 hover:border-primary/50 transition-colors group" data-testid={`card-feature-${i}`}>
              <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-0 leading-none">{feature.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
