"use client";

import { motion } from "framer-motion";

export default function Loader({
    fullScreen = false,
    text = "Loading...",
}: {
    fullScreen?: boolean;
    text?: string;
}) {
    return (
        <div
            className={`flex flex-col items-center justify-center ${fullScreen ? "fixed inset-0 bg-black/20 z-50" : "py-10"
                }`}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />

            <p className="mt-3 text-gray-700 font-medium">{text}</p>
        </div>
    );
}
