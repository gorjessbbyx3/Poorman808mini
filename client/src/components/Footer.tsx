import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/Remove_background_project_1766387130199.png";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="/" className="block">
              <img src={logo} alt="Poorman808" className="h-16 w-auto object-contain" />
            </a>
            <p className="text-gray-400">
              Ewa Beach's most trusted roadside assistance service. Fast, friendly, and fairly priced. We treat your car like our own.
            </p>
            <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-primary hover:text-black flex items-center justify-center transition-colors cursor-pointer">
                    <span className="font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-primary hover:text-black flex items-center justify-center transition-colors cursor-pointer">
                    <span className="font-bold">FB</span>
                </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-display text-white">CONTACT INFO</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:8088920158" className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors group">
                  <Phone className="w-5 h-5 mt-1 shrink-0 text-primary" />
                  <span>
                    <div className="text-xs uppercase tracking-widest mb-1 text-gray-500">24/7 Dispatch</div>
                    <div className="text-white text-lg font-bold group-hover:text-primary transition-colors">(808) 892-0158</div>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-primary" />
                <span>
                  91-1159 Keahumoa Pkwy<br />Ewa Beach, HI 96706
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 shrink-0 text-primary" />
                <span>Open 24 Hours / 7 Days</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-display text-white">SERVICES</h4>
            <ul className="space-y-2">
              {['Towing', 'Lockouts', 'Jump Starts', 'Tire Changes', 'Fuel Delivery', 'Winch Out'].map((item) => (
                <li key={item}>
                  <a href="/services" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Area */}
          <div className="bg-card p-6 rounded-xl border border-white/10">
            <h4 className="text-xl font-display text-white mb-2">NEED HELP NOW?</h4>
            <p className="text-gray-400 text-sm mb-4">Fastest response times in Ewa Beach.</p>
            <Button asChild className="w-full bg-primary text-black font-display text-lg uppercase h-12">
              <a href="tel:8088920158">
                <Phone className="w-4 h-4 mr-2" /> Call Dispatch
              </a>
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} Poorman808 Roadside. All rights reserved.</p>
            <p className="text-gray-500 text-xs">Powered by Edify, Limited</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
