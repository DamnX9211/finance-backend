import api from "../../shared/api/client";
import type { EditProps, GetRecordsParams, RecordItem } from "../../types/record";


// create record
export const createRecord = async (data: RecordItem) => {
    const res = await api.post("/records", data);
    return res.data;
}

// get records
export const getRecords = async (params: GetRecordsParams) => {
  const cleanParams: GetRecordsParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value) cleanParams[key] = value;
  });

  const res = await api.get("/records/", { params: cleanParams });
  return res.data;
};

// update record
export const updateRecord = async (id: number, data: EditProps) => {
    const res = await api.patch(`/records/${id}`, data);
    return res.data;
}


// delete record
export const deleteRecord = async (id: number) => {
    await api.delete(`/records/${id}`);
}