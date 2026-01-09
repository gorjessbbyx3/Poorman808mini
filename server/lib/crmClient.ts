const CRM_BASE_URL = process.env.CRM_API_URL || "https://poorman808dashboard.replit.app";
const CRM_API_KEY = process.env.CRM_API_KEY || "";

interface CRMResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CreateTaskPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  vehicle_details: string;
  service_type: string;
  priority?: "normal" | "high" | "urgent";
  pickup_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  dropoff_location?: string;
  dropoff_lat?: number;
  dropoff_lng?: number;
  notes?: string;
  estimated_cost?: number;
}

interface CreateTaskResponse {
  success: boolean;
  task_id: string;
  job_number: string;
  status_code: string;
  message: string;
}

interface TaskDetails {
  task_id: string;
  job_number: string;
  status: string;
  status_code: string;
  customer_name: string;
  vehicle_details: string;
  pickup_location: string;
  dropoff_location?: string;
  created_at: string;
}

interface AgentDetails {
  agent_id: string;
  name: string;
  phone: string;
  truck_number: string;
  current_lat: string;
  current_lng: string;
  last_location_update: string;
}

interface JobDetailsResponse {
  success: boolean;
  task: TaskDetails;
  agent?: AgentDetails;
}

interface FleetAgent {
  agent_id: string;
  name: string;
  phone: string;
  truck_number: string;
  truck_type: string;
  status: string;
  current_lat: string;
  current_lng: string;
  last_update: string;
}

interface FleetResponse {
  success: boolean;
  total: number;
  fleet: FleetAgent[];
}

interface MembershipInquiryPayload {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  plan_id?: string;
  inquiry_type: "signup" | "inquiry";
  vehicles?: {
    year?: string;
    make?: string;
    model?: string;
    color?: string;
    license_plate?: string;
    vin?: string;
  }[];
  notes?: string;
}

async function fetchCRM<T>(endpoint: string, body: any): Promise<CRMResponse<T>> {
  try {
    const response = await fetch(`${CRM_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": CRM_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CRM API error (${response.status}):`, errorText);
      return { success: false, error: `CRM API returned ${response.status}` };
    }

    const responseData = await response.json();
    
    // CRM returns the data directly with a success field
    if (responseData && typeof responseData === 'object') {
      if (responseData.success === true) {
        return { success: true, data: responseData as T };
      } else if (responseData.success === false) {
        return { success: false, error: responseData.message || "CRM request failed" };
      }
      // Handle envelope format { status: 200, data: [...] } if still used
      if ('data' in responseData && responseData.status === 200) {
        return { success: true, data: responseData.data as T };
      }
      return { success: true, data: responseData as T };
    }
    
    return { success: true, data: responseData };
  } catch (error: any) {
    console.error("CRM API fetch error:", error);
    return { success: false, error: error.message || "Failed to connect to CRM" };
  }
}

// Map UI status to CRM status codes
// CRM codes: 0=pending, 1=assigned, 2=en_route, 4=completed, 6=cancelled, 9=on_hold
export function mapUIStatusToCRM(status: string): number {
  const mapping: Record<string, number> = {
    'received': 0,
    'pending': 0,
    'confirmed': 0,
    'assigning': 1,
    'assigned': 1,
    'en_route': 2,
    'arrived': 2,
    'completed': 4,
    'cancelled': 6,
    'on_hold': 9,
  };
  return mapping[status] ?? 0;
}

// Map CRM status codes to UI status
export function mapCRMStatusToUI(statusCode: number | string): string {
  const code = typeof statusCode === 'string' ? parseInt(statusCode, 10) : statusCode;
  const mapping: Record<number, string> = {
    0: 'received',
    1: 'assigning',
    2: 'en_route',
    4: 'completed',
    6: 'cancelled',
    9: 'on_hold',
  };
  return mapping[code] || 'received';
}

export const crmClient = {
  async createTask(payload: CreateTaskPayload): Promise<CRMResponse<CreateTaskResponse>> {
    return fetchCRM("/v2/create_task", payload);
  },

  async getJobDetails(taskIdOrJobNumber: string): Promise<CRMResponse<JobDetailsResponse>> {
    if (!taskIdOrJobNumber) {
      return { success: false, error: "No task ID or job number provided" };
    }
    // Try task_id first, if it looks like a UUID
    const isUuid = taskIdOrJobNumber.includes('-') && taskIdOrJobNumber.length > 10;
    const body = isUuid 
      ? { task_id: taskIdOrJobNumber }
      : { job_number: taskIdOrJobNumber };
    return fetchCRM("/v2/get_job_details", body);
  },

  async getJobDetailsByPhone(phone: string): Promise<CRMResponse<JobDetailsResponse>> {
    // CRM doesn't have a direct phone lookup, so we get all tasks and filter
    const allTasks = await this.getAllTasks();
    if (!allTasks.success || !allTasks.data) {
      return { success: false, error: "Failed to fetch tasks" };
    }
    
    const normalizedPhone = phone.replace(/\D/g, '');
    const tasks = Array.isArray(allTasks.data) ? allTasks.data : [];
    const matchingTask = tasks.find((task: any) => {
      const taskPhone = (task.customer_phone || '').replace(/\D/g, '');
      return taskPhone === normalizedPhone || taskPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(taskPhone);
    });
    
    if (!matchingTask) {
      return { success: false, error: "No task found for this phone" };
    }
    
    // Get full job details
    return this.getJobDetails(matchingTask.task_id || matchingTask.job_number);
  },

  async getAllTasks(status?: number, page: number = 1, limit: number = 50): Promise<CRMResponse<any[]>> {
    const body: any = { page, limit };
    if (status !== undefined) {
      body.status = status.toString();
    }
    const result = await fetchCRM<any>("/v2/get_all_tasks", body);
    
    // Handle different response formats
    if (result.success && result.data) {
      if (Array.isArray(result.data)) {
        return result as CRMResponse<any[]>;
      }
      if (result.data.tasks && Array.isArray(result.data.tasks)) {
        return { success: true, data: result.data.tasks };
      }
    }
    return { success: false, error: result.error || "Invalid response format" };
  },

  async editTask(taskId: string, updates: { 
    status_code?: number; 
    notes?: string;
    final_cost?: number;
  }): Promise<CRMResponse<any>> {
    return fetchCRM("/v2/edit_task", {
      task_id: taskId,
      ...updates,
    });
  },

  async getAgentLocation(agentIdOrTaskId: string): Promise<CRMResponse<AgentDetails>> {
    // Check if it's likely an agent ID or task ID
    const isTaskId = agentIdOrTaskId.startsWith('JOB-') || agentIdOrTaskId.length > 30;
    const body = isTaskId 
      ? { task_id: agentIdOrTaskId }
      : { agent_id: agentIdOrTaskId };
    
    const result = await fetchCRM<any>("/v2/get_agent_location", body);
    if (result.success && result.data?.agent) {
      return { success: true, data: result.data.agent };
    }
    return result as CRMResponse<AgentDetails>;
  },

  async assignAgent(taskId: string, agentId: string): Promise<CRMResponse<any>> {
    return fetchCRM("/v2/assign_agent", {
      task_id: taskId,
      agent_id: agentId,
    });
  },

  async deleteTask(taskId: string, hardDelete: boolean = false): Promise<CRMResponse<any>> {
    return fetchCRM("/v2/delete_task", {
      task_id: taskId,
      hard_delete: hardDelete,
    });
  },

  async membershipInquiry(payload: MembershipInquiryPayload): Promise<CRMResponse<any>> {
    return fetchCRM("/v2/membership_inquiry", payload);
  },

  async getFleet(): Promise<CRMResponse<FleetResponse>> {
    return fetchCRM("/v2/get_fleet", {});
  },
};
