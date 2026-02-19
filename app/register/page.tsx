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

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            {loading && (
                <Loader
                    fullScreen
                    text="Creating account..."
                />
            )}

            <div className="bg-white p-8 rounded-xl shadow-md w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">

                    Create Account

                </h2>

                <form
                    onSubmit={handleRegister}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg disabled:bg-blue-400"
                    >

                        {loading
                            ? "Registering..."
                            : "Register"}

                    </button>

                </form>

                <p
                    className={`text-center mt-4 ${
                        msgStatus === "success"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >

                    {message}

                </p>

            </div>

        </div>

    );

}
