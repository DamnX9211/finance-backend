import type { RecordItem } from "./record";

export interface CategoryBreakdown {
    category: string;
    total: number;
};


export interface DashboardData {
    total_income: number;
    total_expenses: number;
    net_balance: number;
    category_breakdown: CategoryBreakdown[];
    recent_transactions: RecordItem[];
}