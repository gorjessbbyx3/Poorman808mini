import { Car, Key, Fuel, Battery, Truck, Wrench } from "lucide-react";
// @ts-ignore
import textureBg from "@assets/generated_images/oahu_topographic_map_dark_texture.png";

export default function Services() {
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

  return (
    <section id="services" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
            <img src={textureBg} alt="texture" className="w-full h-full object-cover" />
        </div>
        
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-2">WHAT WE DO</h2>
          <h3 className="text-4xl md:text-6xl font-display text-white">PROFESSIONAL ROADSIDE</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-background border border-white/5 p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <service.icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                  <service.icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                    <h4 className="text-2xl font-display text-white mb-2 group-hover:text-primary transition-colors leading-none mt-1">
                    {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {service.desc}
                    </p>
                    <div className="inline-block px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                    {service.price}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
