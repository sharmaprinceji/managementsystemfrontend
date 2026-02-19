import api from "@/lib/axios";

export const getTasks = async (
    page = 1,
    limit = 6,
    status = "",
    search = ""
) => {

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (status)
        params.append("status", status);

    if (search)
        params.append("search", search);

    const res =
        await api.get(
            `/tasks?${params.toString()}`
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
