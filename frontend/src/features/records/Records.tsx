import { useEffect, useState } from "react";
import type { RecordItem } from "../../types/record";
import { deleteRecord, getRecords } from "./record.api";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import CreateRecordModel from "./CraeteRecordModel";


export default function Records() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
  });

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await getRecords(filters);
      setRecords(res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteRecord(id);
    fetchRecords();
  }
    if (loading) return <p>Loading records...</p>;
    if (error) return <p>Error: {error}</p>;
    if (records.length === 0) return <p>No records found.</p>;
  
    return (

      <div className="space-y-6">
        {True && <CreateRecordModel onSuccess={fetchRecords} />}
        <h1 className="text-2xl font-bold tracking-tight">Records</h1>

        <div className="space-y-4">
          <Input
            placeholder="Type (income/expense)"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
          <Input
            placeholder="Category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
           <Button onClick={fetchRecords}>Apply</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.map((r) => (
              <TableRow>
                <TableCell>{r.category}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(r.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )

}