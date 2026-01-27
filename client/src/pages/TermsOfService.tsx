import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-8" data-testid="text-terms-title">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last updated: January 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By using the services of Poorman Roadside808 LLC ("Company," "we," "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Services Provided</h2>
              <p>
                Poorman Roadside808 LLC provides towing and roadside assistance services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Emergency towing (flatbed and wheel-lift)</li>
                <li>Battery jump starts</li>
                <li>Vehicle lockout assistance</li>
                <li>Flat tire changes</li>
                <li>Emergency fuel delivery</li>
                <li>Winch-out and vehicle recovery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Service Area</h2>
              <p>
                Our primary service area includes ʻEwa Beach, Kapolei, Waipahu, Pearl City, Honolulu, and the greater Oʻahu area in Hawaii. Service availability outside these areas may vary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Pricing and Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices quoted are estimates and may vary based on actual conditions</li>
                <li>Additional charges may apply for after-hours service, difficult recoveries, or extended distances</li>
                <li>Payment is due upon completion of service</li>
                <li>We accept cash, credit cards, debit cards, Venmo, and Zelle</li>
                <li>Membership discounts apply only to valid membership holders</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Customer Responsibilities</h2>
              <p>By requesting our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate location and vehicle information</li>
                <li>Ensure you have authorization to request service for the vehicle</li>
                <li>Remain with or near the vehicle until our driver arrives (when safe to do so)</li>
                <li>Inform us of any hazardous conditions or special circumstances</li>
                <li>Remove personal belongings from the vehicle before towing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Liability Limitations</h2>
              <p>
                While we take every precaution to protect your vehicle, Poorman Roadside808 LLC is not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pre-existing damage to your vehicle</li>
                <li>Personal items left in the vehicle</li>
                <li>Delays due to traffic, weather, or circumstances beyond our control</li>
                <li>Damage resulting from inaccurate information provided by the customer</li>
              </ul>
              <p className="mt-4">
                Our total liability for any claim shall not exceed the amount paid for the specific service rendered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cancellation Policy</h2>
              <p>
                You may cancel a service request at any time before our driver arrives at your location. If our driver has already been dispatched, a dispatch fee may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Membership Terms</h2>
              <p>
                Membership plans are subject to separate terms and conditions. Membership benefits apply only to the registered member and vehicle(s) on the account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of Hawaii.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <p className="mt-2">
                <strong>Poorman Roadside808 LLC</strong><br />
                91-1159 Keahumoa Pkwy<br />
                ʻEwa Beach, HI 96706<br />
                Phone: <a href="tel:8088920158" className="text-primary hover:underline">(808) 892-0158</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
