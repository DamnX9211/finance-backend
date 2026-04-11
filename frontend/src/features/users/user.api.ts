import api from "../../shared/api/client";
import type { User } from "../../types/user";

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get("/users/");
    return res.data;
}

export const updateUserRole = async (
    userId: number,
    role: string
) => {
    const res = await api.patch(`/users/${userId}/role`, null, {
        params: { new_role: role},
    });
    return res.data;
};

export const toggleUserStatus = async (userId: number ) => {
    const res = await api.patch(`/users/${userId}/status`)
    return res.data;
}