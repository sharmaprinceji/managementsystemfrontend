"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [msgStatus, setMsgStatus] = useState<"success" | "error">("success");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            await loginUser({
                email,
                password,
            });

            localStorage.setItem(
                "userEmail",
                email
            );
            setMessage("Login successful!");
            setMsgStatus("success");

            router.push("/dashboard");


        } catch (error: any) {

            setMessage("Login failed ~ " + error.response?.data?.error || error.message);
            setMsgStatus("error");

        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition cursor-pointer hover:bg-gray-50 transition"
                    >
                        Login
                    </button>

                </form>

                <p className={`text-center mt-4 ${msgStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>

            </div>

        </div>
    );

}
