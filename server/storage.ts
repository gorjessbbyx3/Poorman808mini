import { type User, type InsertUser, type Booking, type InsertBooking, type BookingStatus, type MembershipInquiry, type InsertMembershipInquiry } from "@shared/schema";
import { db } from "../db";
import { users, bookings, membershipInquiries } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  getBookingByPhone(phone: string): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: BookingStatus): Promise<Booking | undefined>;
  
  // Membership methods
  createMembershipInquiry(inquiry: InsertMembershipInquiry & { crmTaskId?: string }): Promise<MembershipInquiry>;
  getAllMembershipInquiries(): Promise<MembershipInquiry[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const bookingNumber = 'BK-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const [booking] = await db.insert(bookings).values({
      ...insertBooking,
      bookingNumber,
    }).returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async getBookingByPhone(phone: string): Promise<Booking | undefined> {
    const normalizedPhone = phone.replace(/\D/g, '');
    const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return allBookings.find((b: Booking) => b.phone.replace(/\D/g, '') === normalizedPhone);
  }

  async updateBookingStatus(id: number, status: BookingStatus): Promise<Booking | undefined> {
    const [booking] = await db.update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async createMembershipInquiry(insertInquiry: InsertMembershipInquiry & { crmTaskId?: string }): Promise<MembershipInquiry> {
    const [inquiry] = await db.insert(membershipInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getAllMembershipInquiries(): Promise<MembershipInquiry[]> {
    return await db.select().from(membershipInquiries).orderBy(desc(membershipInquiries.createdAt));
  }
}

export const storage = new DatabaseStorage();
