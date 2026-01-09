import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, updateBookingStatusSchema, insertMembershipInquirySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { crmClient, mapCRMStatusToUI, mapUIStatusToCRM } from "./lib/crmClient";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create a new booking - integrates with CRM
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Create task in CRM first
      const vehicleDetails = `${validatedData.vehicleMake} ${validatedData.vehicleModel} (${validatedData.vehicleColor})`;
      const crmResult = await crmClient.createTask({
        customer_name: validatedData.name,
        customer_phone: validatedData.phone,
        vehicle_details: vehicleDetails,
        service_type: validatedData.serviceType,
        priority: "normal",
        pickup_location: validatedData.pickupLocation,
        dropoff_location: validatedData.dropoffLocation || undefined,
        notes: validatedData.notes || undefined,
      });

      // Create local booking record with CRM task ID
      // CRM returns job_id or task_id depending on endpoint version
      const crmData = crmResult.data as any;
      const crmTaskId = crmResult.success 
        ? (crmData?.task_id || crmData?.job_id || crmData?.data?.job_id) 
        : undefined;
      const booking = await storage.createBooking({
        ...validatedData,
        crmTaskId,
      });
      
      if (!crmResult.success) {
        console.warn("CRM task creation failed, but local booking created:", crmResult.error);
      }
      
      res.status(201).json(booking);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // Get all bookings - from CRM with local fallback
  app.get("/api/bookings", async (req, res) => {
    try {
      // Try to get from CRM first
      const crmResult = await crmClient.getAllTasks();
      
      if (crmResult.success && Array.isArray(crmResult.data)) {
        // Transform CRM data to match our frontend expectations
        const crmBookings = crmResult.data.map((taskData: any) => {
          // Handle both nested and flat task structures
          const task = taskData.task || taskData;
          const agent = taskData.agent;
          
          // Parse vehicle_details format: "2022 Toyota Camry (Silver)"
          const vehicleDetails = task.vehicle_details || '';
          const vehicleParts = vehicleDetails.match(/^(.+?)\s+(.+?)\s*\((.+?)\)$/) || [];
          
          return {
            id: task.task_id || task.job_number,
            bookingNumber: task.job_number || task.task_id,
            crmTaskId: task.task_id,
            name: task.customer_name,
            phone: task.customer_phone,
            vehicleMake: vehicleParts[1] || vehicleDetails.split(' ')[0] || '',
            vehicleModel: vehicleParts[2] || vehicleDetails.split(' ').slice(1).join(' ') || '',
            vehicleColor: vehicleParts[3] || '',
            pickupLocation: task.pickup_location,
            dropoffLocation: task.dropoff_location,
            serviceType: task.service_type || 'tow',
            notes: task.notes,
            status: mapCRMStatusToUI(task.status_code || task.status || '0'),
            agentName: agent?.name,
            agentPhone: agent?.phone,
            agentLocation: agent ? { lat: agent.current_lat, lng: agent.current_lng } : undefined,
            createdAt: task.created_at || new Date().toISOString(),
            updatedAt: task.updated_at || new Date().toISOString(),
          };
        });
        return res.json(crmBookings);
      }
      
      // Fallback to local storage
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Get booking by phone number - check CRM first
  app.get("/api/bookings/phone/:phone", async (req, res) => {
    try {
      const phone = req.params.phone;
      
      // Try CRM first
      const crmResult = await crmClient.getJobDetailsByPhone(phone);
      
      if (crmResult.success && crmResult.data) {
        const jobData = crmResult.data as any;
        const task = jobData.task || jobData;
        const agent = jobData.agent;
        
        // Parse vehicle_details format: "2022 Toyota Camry (Silver)"
        const vehicleDetails = task.vehicle_details || '';
        const vehicleParts = vehicleDetails.match(/^(.+?)\s+(.+?)\s*\((.+?)\)$/) || [];
        
        return res.json({
          id: task.task_id || task.job_number,
          bookingNumber: task.job_number || task.task_id,
          crmTaskId: task.task_id,
          name: task.customer_name,
          phone: task.customer_phone,
          vehicleMake: vehicleParts[1] || vehicleDetails.split(' ')[0] || '',
          vehicleModel: vehicleParts[2] || vehicleDetails.split(' ').slice(1).join(' ') || '',
          vehicleColor: vehicleParts[3] || '',
          pickupLocation: task.pickup_location,
          dropoffLocation: task.dropoff_location,
          serviceType: task.service_type || 'tow',
          notes: task.notes,
          status: mapCRMStatusToUI(task.status_code || task.status || '0'),
          agentName: agent?.name,
          agentPhone: agent?.phone,
          agentLocation: agent ? { lat: agent.current_lat, lng: agent.current_lng } : undefined,
          createdAt: task.created_at || new Date().toISOString(),
        });
      }
      
      // Fallback to local
      const booking = await storage.getBookingByPhone(phone);
      if (!booking) {
        return res.status(404).json({ error: "No active booking found for this number" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking by phone:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // Get booking by task ID from CRM
  app.get("/api/bookings/task/:taskId", async (req, res) => {
    try {
      const crmResult = await crmClient.getJobDetails(req.params.taskId);
      
      if (!crmResult.success || !crmResult.data) {
        return res.status(404).json({ error: "Task not found in CRM" });
      }
      
      const jobData = crmResult.data as any;
      const task = jobData.task || jobData;
      const agent = jobData.agent;
      
      // Parse vehicle_details format: "2022 Toyota Camry (Silver)"
      const vehicleDetails = task.vehicle_details || '';
      const vehicleParts = vehicleDetails.match(/^(.+?)\s+(.+?)\s*\((.+?)\)$/) || [];
      
      res.json({
        id: task.task_id || task.job_number,
        bookingNumber: task.job_number || task.task_id,
        crmTaskId: task.task_id,
        name: task.customer_name,
        phone: task.customer_phone,
        vehicleMake: vehicleParts[1] || vehicleDetails.split(' ')[0] || '',
        vehicleModel: vehicleParts[2] || vehicleDetails.split(' ').slice(1).join(' ') || '',
        vehicleColor: vehicleParts[3] || '',
        pickupLocation: task.pickup_location,
        dropoffLocation: task.dropoff_location,
        serviceType: task.service_type || 'tow',
        notes: task.notes,
        status: mapCRMStatusToUI(task.status_code || task.status || '0'),
        agentName: agent?.name,
        agentPhone: agent?.phone,
        agentLocation: agent ? { lat: agent.current_lat, lng: agent.current_lng } : undefined,
        createdAt: task.created_at || new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error fetching task from CRM:", error);
      res.status(500).json({ error: "Failed to fetch task" });
    }
  });

  // Update booking status - sync with CRM
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = updateBookingStatusSchema.parse(req.body);
      const crmStatus = mapUIStatusToCRM(validatedData.status);
      
      // Try CRM update first (id could be CRM task ID or local ID)
      const crmResult = await crmClient.editTask(id.toString(), { status_code: crmStatus });
      
      if (crmResult.success && crmResult.data) {
        const task = crmResult.data;
        return res.json({
          ...task,
          id: task.task_id || id,
          status: validatedData.status,
        });
      }
      
      // Fallback to local update for numeric IDs
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        const booking = await storage.updateBookingStatus(numericId, validatedData.status);
        if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
        }
        return res.json(booking);
      }
      
      res.status(404).json({ error: "Booking not found" });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error updating booking status:", error);
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  // Assign agent to task
  app.post("/api/bookings/:id/assign", async (req, res) => {
    try {
      const { agentId } = req.body;
      const taskId = req.params.id;
      
      const crmResult = await crmClient.assignAgent(taskId, agentId);
      
      if (!crmResult.success) {
        return res.status(500).json({ error: crmResult.error || "Failed to assign agent" });
      }
      
      res.json({ success: true, data: crmResult.data });
    } catch (error) {
      console.error("Error assigning agent:", error);
      res.status(500).json({ error: "Failed to assign agent" });
    }
  });

  // Get agent location
  app.get("/api/agents/:agentId/location", async (req, res) => {
    try {
      const crmResult = await crmClient.getAgentLocation(req.params.agentId);
      
      if (!crmResult.success) {
        return res.status(404).json({ error: "Agent location not found" });
      }
      
      res.json(crmResult.data);
    } catch (error) {
      console.error("Error fetching agent location:", error);
      res.status(500).json({ error: "Failed to fetch agent location" });
    }
  });

  // Delete/cancel task
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const taskId = req.params.id;
      
      const crmResult = await crmClient.deleteTask(taskId);
      
      if (!crmResult.success) {
        return res.status(500).json({ error: crmResult.error || "Failed to delete task" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // Create membership inquiry - integrates with CRM
  app.post("/api/membership-inquiries", async (req, res) => {
    try {
      const validatedData = insertMembershipInquirySchema.parse(req.body);
      
      const planNames: Record<string, string> = {
        essential: "Essential ($19/mo)",
        premium: "Premium ($39/mo)",
        ohana: "Ohana ($59/mo)",
      };
      
      // Create membership inquiry in CRM using dedicated endpoint
      const crmResult = await crmClient.membershipInquiry({
        customer_name: validatedData.name,
        customer_phone: validatedData.phone,
        customer_email: validatedData.email,
        inquiry_type: "signup",
        notes: `Plan: ${planNames[validatedData.planType]}\n${validatedData.message || ""}`,
      });

      // Create local record with CRM task ID
      const inquiry = await storage.createMembershipInquiry({
        ...validatedData,
        crmTaskId: crmResult.success ? crmResult.data?.task_id : undefined,
      });
      
      if (!crmResult.success) {
        console.warn("CRM task creation failed for membership inquiry, but local record created:", crmResult.error);
      }
      
      res.status(201).json(inquiry);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating membership inquiry:", error);
      res.status(500).json({ error: "Failed to submit membership inquiry" });
    }
  });

  // Get all membership inquiries
  app.get("/api/membership-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllMembershipInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching membership inquiries:", error);
      res.status(500).json({ error: "Failed to fetch membership inquiries" });
    }
  });

  // Get all fleet/drivers
  app.get("/api/fleet", async (req, res) => {
    try {
      const crmResult = await crmClient.getFleet();
      
      if (!crmResult.success) {
        return res.status(500).json({ error: crmResult.error || "Failed to fetch fleet" });
      }
      
      res.json(crmResult.data);
    } catch (error) {
      console.error("Error fetching fleet:", error);
      res.status(500).json({ error: "Failed to fetch fleet" });
    }
  });

  return httpServer;
}
