export interface CategoryBreakdown {
    category: string;
    total: number;
};

export interface RecordItem {
    id: number;
    amount: number;
    type: string;
    category: string;
    date: string;
    notes?: string;
    created_by: string;
}

export interface DashboardData {
    total_income: number;
    total_expenses: number;
    net_balance: number;
    category_breakdown: CategoryBreakdown[];
    recent_transactions: RecordItem[];
}