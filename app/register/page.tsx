"use client";

import { useState } from "react";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [msgStatus, setMsgStatus] =
        useState<"success" | "error">(
            "success"
        );

    const [loading, setLoading] =
        useState(false);

    const handleRegister = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            await registerUser({
                email,
                password,
            });

            setMessage(
                "Registration successful!"
            );

            setMsgStatus("success");

            setTimeout(() => {

                router.push("/login");

            }, 1000);

        } catch (error: any) {

            setMessage(
                "Registration failed ~ " +
                (
                    error.response?.data?.error ||
                    error.message
                )
            );

            setMsgStatus("error");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="
            flex items-center justify-center min-h-screen
            bg-gray-100 dark:bg-gray-900
            transition-colors duration-300
        ">

            {loading && (
                <Loader
                    fullScreen
                    text="Creating account..."
                />
            )}

            <div className="
                bg-white dark:bg-gray-800
                p-8 rounded-xl shadow-md w-96
                transition-colors duration-300
            ">

                <h2 className="
                    text-2xl font-bold mb-6 text-center
                    text-gray-900 dark:text-gray-100
                ">

                    Create Account

                </h2>

                <form
                    onSubmit={handleRegister}
                    className="space-y-4"
                >

                    {/* Email Input */}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="
                            w-full p-3 border rounded-lg
                            bg-white dark:bg-gray-700
                            text-gray-900 dark:text-gray-100
                            border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2
                            focus:ring-blue-500
                        "
                        required
                    />

                    {/* Password Input */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="
                            w-full p-3 border rounded-lg
                            bg-white dark:bg-gray-700
                            text-gray-900 dark:text-gray-100
                            border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2
                            focus:ring-blue-500
                        "
                        required
                    />

                    {/* Register Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full bg-blue-600 hover:bg-blue-700
                            text-white p-3 rounded-lg
                            cursor-pointer
                            disabled:opacity-50
                            transition
                        "
                    >

                        {loading
                            ? "Registering..."
                            : "Register"}

                    </button>

                </form>

                {/* Message */}

                <p
                    className={`
                        text-center mt-4
                        ${
                            msgStatus === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    `}
                >

                    {message}

                </p>

            </div>

        </div>

    );

}
