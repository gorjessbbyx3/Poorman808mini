import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-8" data-testid="text-privacy-title">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last updated: January 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <p>
                Poorman808 Roadside LLC ("we," "our," or "us") collects information you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request roadside assistance or towing services</li>
                <li>Fill out our contact form</li>
                <li>Sign up for our membership program</li>
                <li>Communicate with us via phone, email, or text</li>
              </ul>
              <p className="mt-4">
                This information may include your name, phone number, email address, vehicle information, and location data necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our roadside assistance services</li>
                <li>Dispatch drivers to your location</li>
                <li>Communicate with you about your service request</li>
                <li>Send you service confirmations and updates</li>
                <li>Process payments for services rendered</li>
                <li>Respond to your inquiries and provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To our drivers and service providers who assist in delivering our services</li>
                <li>When required by law or to respond to legal process</li>
                <li>To protect our rights, privacy, safety, or property</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Location Data</h2>
              <p>
                When you request our services, we may collect your location data to dispatch our drivers efficiently. This location data is used solely for service delivery and is not stored beyond the completion of your service request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal information by contacting us at (808) 892-0158 or through our contact form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="mt-2">
                <strong>Poorman808 Roadside LLC</strong><br />
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
