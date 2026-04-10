import { useState } from "react";
import { createRecord } from "./record.api";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export interface CreateRecordRequest {
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  notes?: string;
}

export default function CreateRecordModel({ onSuccess }: CreateRecordRequest & { onSuccess: () => void }) {
    const [form, setForm] = useState({
        amount: "",
        type: "",
        category: "",
        date: "",

    });

    const handleSubmit = async () => {
        await createRecord({
            ...form,
            amount: Number(form.amount),
        });
        onSuccess();
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Create Record</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25">
                <Input
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />

                <Input 
                    placeholder="Type (income/expense)"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <Input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <Input
                    type="date"
                    placeholder="DD-MM-YYYY"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <Button onClick={handleSubmit}>Save</Button>
            </DialogContent>
        </Dialog>
    )
}