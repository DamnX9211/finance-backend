export interface RecordItem {
    id: number;
    amount: number;
    type: string;
    category: string;
    date: string;
    notes?: string;
    created_by: string;
}

export interface GetRecordsParams {
    type?: string;
    category?: string;
    start_date?: string;
    end_date?: string;
    limit?: number;
    offset?: number;
}