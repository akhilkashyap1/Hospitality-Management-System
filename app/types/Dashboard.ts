export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  appointmentsToday: number;
}

export interface DashboardResponse {
  status: "success" | "error";
  dashboard_data: DashboardStats;
}
