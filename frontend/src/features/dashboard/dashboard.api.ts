import api from "../../shared/api/client";
import type { DashboardData } from "../../types/dashboard";

export const getDashboard = async (): Promise<DashboardData> => {
    const res = await api.get("/dashboard/summary");
    return res.data;
}