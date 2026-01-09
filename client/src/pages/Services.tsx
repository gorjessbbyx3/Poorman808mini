import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { Phone } from "lucide-react";
// @ts-ignore
import textureBg from "@assets/generated_images/oahu_topographic_map_dark_texture.png";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-20 relative">
        {/* Background Texture */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
            <img src={textureBg} alt="texture" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
              OUR <span className="text-primary">SERVICES</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional towing and roadside assistance across Oahu. <br className="hidden md:block"/>
              Fast, reliable, and priced fair.
            </p>
          </div>
          
          <Services />
          
        </div>
      </main>
      
      <Footer />
      
      {/* Floating Action Button for Mobile */}
      <a href="tel:8088920158" className="fixed bottom-6 right-6 md:hidden z-50 bg-primary text-black p-4 rounded-full shadow-lg shadow-orange-500/20 animate-bounce">
        <Phone className="w-8 h-8" />
      </a>
    </div>
  );
}
