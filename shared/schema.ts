import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingNumber: text("booking_number").notNull().unique(),
  crmTaskId: text("crm_task_id"),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  vehicleMake: text("vehicle_make").notNull(),
  vehicleModel: text("vehicle_model").notNull(),
  vehicleColor: text("vehicle_color").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location"),
  serviceType: text("service_type").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("received"),
  agentName: text("agent_name"),
  agentPhone: text("agent_phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  phone: z.string().min(10, "Valid phone number is required"),
  name: z.string().min(2, "Name is required"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleColor: z.string().min(1, "Vehicle color is required"),
  pickupLocation: z.string().min(5, "Pickup location is required"),
  serviceType: z.string().min(1, "Service type is required"),
  status: z.enum(['received', 'confirmed', 'assigning', 'en_route', 'arrived', 'completed']).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  bookingNumber: true,
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['received', 'confirmed', 'assigning', 'en_route', 'arrived', 'completed']),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type BookingStatus = 'received' | 'confirmed' | 'assigning' | 'en_route' | 'arrived' | 'completed';

export const membershipInquiries = pgTable("membership_inquiries", {
  id: serial("id").primaryKey(),
  crmTaskId: text("crm_task_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  planType: text("plan_type").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMembershipInquirySchema = createInsertSchema(membershipInquiries, {
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  planType: z.enum(['essential', 'premium', 'ohana']),
}).omit({
  id: true,
  createdAt: true,
  crmTaskId: true,
  status: true,
});

export type InsertMembershipInquiry = z.infer<typeof insertMembershipInquirySchema>;
export type MembershipInquiry = typeof membershipInquiries.$inferSelect;
