import { motion } from "framer-motion";
import { Facebook, Tag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Coupons() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black bg-noise">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Tag className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-sm">Special Offers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
              COUPONS & DEALS
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Save money on your next tow! Follow us on social media to unlock exclusive discounts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-dashed border-primary rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-black font-display font-bold text-2xl px-6 py-2 rounded-bl-xl">
                5% OFF
              </div>
              
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full" />
              
              <div className="text-center pt-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  SOCIAL MEDIA DISCOUNT
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Get <span className="text-primary font-bold">5% OFF</span> your next tow service when you follow and like us on Facebook!
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">How to Redeem:</h3>
                  <ol className="text-left text-gray-400 space-y-3 max-w-md mx-auto">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</span>
                      <span>Follow us on Facebook using the link below</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</span>
                      <span>Like our page and leave us a review if you can!</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</span>
                      <span>Show proof when you call for a tow to get your discount</span>
                    </li>
                  </ol>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white h-14 px-8 text-lg font-bold"
                    data-testid="button-facebook"
                  >
                    <a
                      href="https://www.facebook.com/share/17rNmH2Fz9/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-6 h-6 mr-2" />
                      Follow on Facebook
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-gray-500 text-sm mt-8"
            >
              * Discount cannot be combined with other offers. Valid for standard towing services only.
            </motion.p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
