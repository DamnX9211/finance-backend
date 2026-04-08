import { useEffect, useState } from "react";
import type { DashboardData } from "../../types/dashboard";
import { getDashboard } from "./dashboard.api";
import { Card, CardContent } from "../../components/ui/card";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res);
      } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="space-y-2">
            <p>Total Income</p>
            <h2 className="text-xl font-bold">{data.total_income}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <p>Total Expenses</p>
            <h2 className="text-xl font-bold">{data.total_expenses}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <p>Net Balance</p>
            <h2 className={`text-xl font-bold ${data.net_balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              {data.net_balance}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown*/}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Category Breakdown</h2>
        <div className="border rounded-md p-4">
          { data.category_breakdown.map((item) => (
            <div 
              key={item.category}
              className="flex justify-between border-b py-2"
            >
            <span>{item.category}</span>
            <span>{item.total}</span>
          </div>
          ))}
        </div>
      </div>
      {/* Recent Transactions */}

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <div className="border rounded-md p-4">
          {data.recent_transactions.map((tx) => (
            <div 
              key={tx.id}
              className="flex justify-between border-b py-2"
            >
              <span>{tx.category}</span>
              <span>{tx.amount}</span>
              <span>{new Date(tx.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}