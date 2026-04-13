import { useState } from "react";
import { updateRecord } from "./record.api";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { EditProps } from "../../types/record";
import { toast } from "sonner";

export default function EditRecordModel({ record, onSuccess }: EditProps) {
    const [form, setForm] = useState({
        amount: record.amount,
        type: record.type,
        category: record.category,
        date: record.date,
    })

    const handleUpdate = async () => {
        await updateRecord(record.id, form);
        onSuccess();
        toast.success("Record updated successfully");
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Edit</Button>
            </DialogTrigger>

            <DialogContent>
                <Input
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: Number(e.target.value)})}
                />
                <Input 
                    value={form.type}
                    onChange={(e) => setForm({...form, type: e.target.value})}/>
                <Input  
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}/>
                <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}/>
                <Button onClick={handleUpdate}>Update</Button>

            </DialogContent>
        </Dialog>
    )
}