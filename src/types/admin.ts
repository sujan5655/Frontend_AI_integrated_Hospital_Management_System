export interface AdminDashboardData {
  total_users: number;
  total_doctors: number;
  total_patients: number;
  total_appointments: number;
  pending_doctors: number;
  completed_appointments: number;
}

export interface PendingDoctor {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  is_approved: boolean;
}
export interface AdminState {
  dashboard: AdminDashboardData | null;
  pendingDoctors: PendingDoctor[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
}
