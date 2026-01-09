import { Star, Quote } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export default function Reviews() {
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
      text: "My GTI broke down near Pearl City around midnight on a busy Sunday night. Other towing companies claimed 24/7 but didn't answer. Poorman808 picked up, arrived quickly, and did an excellent job. Truly reliable!",
      stars: 5,
    },
    {
      name: "Kiana L.",
      location: "Waipahu, HI",
      text: "Available when I needed them most! Came out right away and did an excellent job. The driver was super friendly and handled my car with care. Will definitely call again.",
      stars: 5,
    },
    {
      name: "David K.",
      location: "Kapolei, HI",
      text: "Locked my keys in the car at the beach. He showed up fast, got it open in seconds, and didn't scratch a thing. Saved my day! Honest pricing and real Aloha spirit.",
      stars: 5,
    },
    {
      name: "Sarah M.",
      location: "Mililani, HI",
      text: "Called at 2 AM with a flat tire on H1. They answered right away and the driver was there in 20 minutes. Professional service and fair pricing. Thank you Poorman808!",
      stars: 5,
    },
    {
      name: "Kai N.",
      location: "Ewa Beach, HI",
      text: "Solid service! Needed a tow to the shop. Driver was cool, truck was clean, and he handled my lowered car with care. Over 20 years experience really shows.",
      stars: 5,
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <SiGoogle className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-sm">Customer Reviews</span>
          </div>
          <h2 className="text-primary text-xl font-bold tracking-[0.2em] mb-2">TESTIMONIALS</h2>
          <h3 className="text-4xl md:text-6xl font-display text-white" data-testid="text-reviews-title">LOCAL LEGENDS LOVE US</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="group bg-card p-8 rounded-xl border border-white/5 relative flex flex-col hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
              data-testid={`card-review-${i}`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, s) => (
                  <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg italic mb-6 flex-grow">"{review.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-white group-hover:bg-primary group-hover:text-black transition-colors">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{review.name}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center flex flex-wrap justify-center gap-6">
            <a 
                href="https://www.google.com/search?q=Poorman808+Roadside+Ewa+Beach+reviews" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-primary pb-1 font-display tracking-wider uppercase"
                data-testid="link-google-reviews"
            >
                <SiGoogle className="w-4 h-4" /> See us on Google
            </a>
            <a 
                href="https://www.yelp.com/biz/poorman808-roadside-ewa-beach" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-primary pb-1 font-display tracking-wider uppercase"
                data-testid="link-yelp-reviews"
            >
                See us on <span className="text-[#c41200] font-bold">Yelp</span>
            </a>
        </div>
      </div>
    </section>
  );
}
