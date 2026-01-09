import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Phone, MapPin, Truck, AlertTriangle } from "lucide-react";
import type { Booking, BookingStatus } from "@shared/schema";
// @ts-ignore
import textureBg from "@assets/generated_images/oahu_topographic_map_dark_texture.png";

export default function Dispatch() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateBookingStatus = async (id: number, status: BookingStatus) => {
    try {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        await fetchBookings();
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-20 relative">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
            <img src={textureBg} alt="texture" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-display font-bold text-white">DISPATCH <span className="text-primary">DASHBOARD</span></h1>
            <div className="flex gap-2">
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px] bg-card border-white/10 text-white">
                        <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Bookings</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="assigning">Assigning</SelectItem>
                        <SelectItem value="en_route">En Route</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {isLoading ? (
                <div className="text-center py-20 bg-card/50 border border-white/10 rounded-xl">
                    <p className="text-gray-400 text-xl">Loading bookings...</p>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-card/50 border border-white/10 rounded-xl">
                    <p className="text-gray-400 text-xl">No active bookings found.</p>
                </div>
            ) : (
                filteredBookings.map((booking) => (
                    <Card key={booking.id} className="bg-card/90 border-white/10 text-white overflow-hidden" data-testid={`card-booking-${booking.id}`}>
                        <CardHeader className="bg-white/5 border-b border-white/10 flex flex-row justify-between items-center py-4">
                            <CardTitle className="font-display text-2xl flex items-center gap-2">
                                <span className="text-primary">#{booking.bookingNumber}</span>
                                <span className="text-base font-sans font-normal text-gray-400">
                                    • {formatDistanceToNow(new Date(booking.createdAt))} ago
                                </span>
                            </CardTitle>
                            <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border ${
                                booking.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                booking.status === 'received' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                'bg-primary/10 text-primary border-primary/20'
                            }`}>
                                {booking.status.replace('_', ' ')}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Customer</h4>
                                    <div className="flex items-center gap-2 font-bold text-lg"><span className="w-2 h-2 rounded-full bg-white"/> {booking.name}</div>
                                    <div className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4"/> {booking.phone}</div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Vehicle & Service</h4>
                                    <div className="flex items-center gap-2 text-lg"><Truck className="w-4 h-4 text-primary"/> {booking.vehicleMake} {booking.vehicleModel}</div>
                                    <div className="text-gray-400">Color: {booking.vehicleColor}</div>
                                    <div className="inline-block px-2 py-0.5 rounded bg-white/10 text-xs mt-1">{booking.serviceType}</div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Location</h4>
                                    <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-1 shrink-0"/> {booking.pickupLocation}</div>
                                    {booking.dropoffLocation && (
                                        <div className="flex items-start gap-2 text-gray-400 pl-6">To: {booking.dropoffLocation}</div>
                                    )}
                                </div>
                            </div>
                            
                            {booking.notes && (
                                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2 text-yellow-500 bg-yellow-500/5 p-3 rounded">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p className="text-sm">"{booking.notes}"</p>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold mr-2">Update Status:</span>
                                {['received', 'confirmed', 'assigning', 'en_route', 'arrived', 'completed'].map((status) => (
                                    <Button
                                        key={status}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateBookingStatus(booking.id, status as BookingStatus)}
                                        className={`border-white/10 hover:bg-white/10 ${booking.status === status ? 'bg-primary text-black hover:bg-primary/90 border-primary' : 'text-gray-400'}`}
                                    >
                                        {status.replace('_', ' ').toUpperCase()}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
