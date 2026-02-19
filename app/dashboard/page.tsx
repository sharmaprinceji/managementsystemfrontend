"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    createTask,
    getTasks,
    deleteTask,
    toggleTask,
    updateTask,
} from "@/services/task.service";

import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {

    const router = useRouter();

    const limit = 6;

    const [tasks, setTasks] = useState<any[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] =
        useState(true);

    const [loading, setLoading] =
        useState(true);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [showToast, setShowToast] =
        useState(false);

    // NEW states for assignment requirement
    const [searchText, setSearchText] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");



    // Success animation
    const showSuccess = (message: string) => {

        setSuccessMessage(message);

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };



    // Load tasks with pagination + filter + search
    const loadTasks = async () => {

        try {

            setLoading(true);

            const data =
                await getTasks(
                    page,
                    limit,
                    statusFilter,
                    searchText
                );

            setTasks(data);

            setHasMore(data.length === limit);

        } catch {

            router.push("/login");

        } finally {

            setLoading(false);

        }
    };



    useEffect(() => {

        loadTasks();

    }, [page, searchText, statusFilter]);



    const handleCreate = async () => {

        if (!title) return;

        await createTask(title, description);

        setTitle("");
        setDescription("");

        showSuccess("Task created successfully");

        loadTasks();
    };



    const handleUpdate = async (id: number) => {

        await updateTask(id, title, description);

        setEditingId(null);

        setTitle("");
        setDescription("");

        showSuccess("Task updated successfully");

        loadTasks();
    };



    const handleDelete = async (id: number) => {

        await deleteTask(id);

        showSuccess("Task deleted");

        loadTasks();
    };



    const handleToggle = async (id: number) => {

        await toggleTask(id);

        showSuccess("Task status updated");

        loadTasks();
    };



    const handleEditClick = (task: any) => {

        setEditingId(task.id);

        setTitle(task.title);

        setDescription(task.description);
    };



    const handleCancelEdit = () => {

        setEditingId(null);

        setTitle("");

        setDescription("");
    };



    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Task Dashboard
            </h1>



            {/* Search and Filter */}

            <div className="flex flex-wrap gap-4 mb-6">

                <input
                    placeholder="Search by title..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded w-60"
                />



                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="TODO">
                        TODO
                    </option>

                    <option value="DONE">
                        DONE
                    </option>

                </select>

            </div>



            {/* Create / Update Card */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-lg mb-8"
            >

                <h2 className="text-xl font-semibold mb-4">

                    {editingId
                        ? "Update Task"
                        : "Create Task"}

                </h2>



                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />



                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />



                <div className="flex gap-3">

                    <button
                        onClick={
                            editingId
                                ? () =>
                                    handleUpdate(
                                        editingId
                                    )
                                : handleCreate
                        }
                        className="bg-blue-600 text-white px-6 py-2 rounded"
                    >

                        {editingId
                            ? "Update Task"
                            : "Create Task"}

                    </button>



                    {editingId && (

                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </motion.div>



            {/* Loading */}

            {loading ? (

                <div className="text-center">
                    Loading tasks...
                </div>

            ) : tasks.length === 0 ? (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-10 rounded-xl shadow text-center"
                >

                    <div className="text-6xl">
                        📭
                    </div>

                    <h3 className="text-xl">
                        No Tasks Available
                    </h3>

                </motion.div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {tasks.map((task) => (

                        <motion.div
                            key={task.id}
                            whileHover={{
                                scale: 1.05,
                            }}
                            className="bg-white p-5 rounded-xl shadow"
                        >

                            <h3 className="font-semibold">
                                {task.title}
                            </h3>

                            <p>
                                {task.description}
                            </p>

                            <span className={`inline-block mt-2 px-3 py-1 rounded ${
                                task.status === "DONE"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}>
                                {task.status}
                            </span>



                            <div className="flex gap-2 mt-3">

                                <button
                                    onClick={() =>
                                        handleToggle(task.id)
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Toggle
                                </button>



                                <button
                                    onClick={() =>
                                        handleEditClick(task)
                                    }
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>



                                <button
                                    onClick={() =>
                                        handleDelete(task.id)
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </div>

                        </motion.div>

                    ))}

                </div>

            )}



            {/* Pagination */}

            <div className="flex justify-center mt-8 gap-4">

                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
                    Page {page}
                </span>

                <button
                    disabled={!hasMore}
                    onClick={() =>
                        setPage(page + 1)
                    }
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>



            {/* Success Toast */}

            <AnimatePresence>

                {showToast && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.3,
                        }}
                        animate={{
                            opacity: 1,
                            scale: [0.3, 1.4, 1],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.3,
                        }}
                        className="fixed top-1/2 left-1/2 transform
                        -translate-x-1/2 -translate-y-1/2
                        bg-green-500 text-white px-10 py-6 rounded-xl"
                    >

                        <div className="text-5xl">
                            👍
                        </div>

                        <div className="text-xl font-bold">
                            BOOM!
                        </div>

                        <div>
                            {successMessage}
                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}
