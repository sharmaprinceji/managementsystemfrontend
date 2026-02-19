import api from "@/lib/axios";

export const getTasks = async (
    page = 1,
    limit = 6
) => {

    const res = await api.get(
        `/tasks?page=${page}&limit=${limit}`
    );

    return res.data;
};

export const createTask = async (
    title: string,
    description: string
) => {

    const res = await api.post(
        "/tasks",
        { title, description }
    );

    return res.data;
};

export const updateTask = async (
    id: number,
    title: string,
    description: string
) => {

    const res = await api.patch(
        `/tasks/${id}`,
        { title, description }
    );

    return res.data;
};

export const deleteTask = async (
    id: number
) => {

    await api.delete(`/tasks/${id}`);

};

export const toggleTask = async (
    id: number
) => {

    await api.patch(
        `/tasks/${id}/toggle`
    );

};
