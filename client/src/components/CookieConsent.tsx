import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-700 shadow-lg" data-testid="cookie-banner">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white text-center sm:text-left">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <a href="/privacy" className="text-yellow-400 hover:underline font-medium">Privacy Policy</a>.
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={declineCookies}
            className="text-white border-gray-500 hover:bg-gray-700"
            data-testid="button-decline-cookies"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={acceptCookies}
            className="bg-yellow-500 text-black font-bold hover:bg-yellow-400"
            data-testid="button-accept-cookies"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
