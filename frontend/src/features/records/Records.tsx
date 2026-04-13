import { useCallback, useEffect, useState } from "react";
import type { RecordItem } from "../../types/record";
import { deleteRecord, getRecords } from "./record.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import CreateRecordModel from "./CraeteRecordModel";
import { useAuth } from "../auth/AuthContext";
import EditRecordModel from "./EditRecordModel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

const types = [
  { label: "All", value: "" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export default function Records() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { role } = useAuth();

  const [filters, setFilters] = useState({
    type: "",
    category: "",
  });

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getRecords(filters);
      console.log("API Response:", res);
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
  }, [filters]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) return;
    console.log("Deleting record with ID:", id)
    await deleteRecord(id);
    toast.success("Record deleted successfully");
    fetchRecords();
  };
  if (loading) return <p>Loading records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Records</h1>
      {role === "admin" && (
        <CreateRecordModel
          onSuccess={fetchRecords}
          amount={0}
          type={"income"}
          category={""}
          date={""}
        />
      )}

      <div className="space-y flex items-center gap-4">
        
        <Select onValueChange={(value) => setFilters({ ...filters, type: value || "" })}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter by Type</SelectLabel>
              {types.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={fetchRecords}>Apply</Button>
      </div>

      {records.length === 0 ? (
        <p>No records found</p>
      ) : (
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
                <TableCell className="space-x-2">
                  {role === "admin" && (
                    <>
                      <EditRecordModel record={r} onSuccess={fetchRecords} />
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
