"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GoMoveToEnd } from "react-icons/go";
import { motion } from "framer-motion";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userInitial, setUserInitial] =
    useState("");



  useEffect(() => {

    const token =
      localStorage.getItem("accessToken");

    const email =
      localStorage.getItem("userEmail");

    setIsLoggedIn(!!token);

    if (email) {

      setUserInitial(
        email.charAt(0).toUpperCase()
      );

    }

  }, [pathname]);



  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);

    router.push("/login");

  };



  return (

    <nav
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-white/80 dark:bg-gray-900/80
        border-b border-gray-200 dark:border-red-800
        px-6 py-3
        flex justify-between items-center
        transition-colors duration-300
      "
    >

      {/* Logo */}

      <motion.div

        whileHover={{ scale: 1.05 }}

        whileTap={{ scale: 0.95 }}

        onClick={() => router.push("/dashboard")}

        className="
          text-xl font-bold
          bg-gradient-to-r from-blue-500 to-green-400
          bg-clip-text text-transparent
          cursor-pointer
        "

      >

        Task Manager

      </motion.div>



      {/* Right Side */}

      <div className="flex items-center gap-4">

        {!isLoggedIn ? (

          <>

            {/* Login */}

            <button

              onClick={() => router.push("/login")}

              className="
                text-gray-700 dark:text-gray-300
                hover:text-blue-600 dark:hover:text-blue-400
                font-medium
                transition
                cursor-pointer
              "

            >

              Login

            </button>



            {/* Register */}

            <button

              onClick={() => router.push("/register")}

              className="
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white
                px-4 py-2
                rounded-lg
                shadow-md
                hover:shadow-lg
                transition-all duration-200
                cursor-pointer
              "

            >

              Register

            </button>

          </>

        ) : (

          <div className="flex items-center gap-4">

            {/* Avatar */}

            <motion.div

              whileHover={{ scale: 1.1 }}

              className="
                w-10 h-10 rounded-full
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white
                flex items-center justify-center
                font-semibold
                shadow-md
              "

            >

              {userInitial || "U"}

            </motion.div>



            {/* Logout */}

            <motion.button

              whileHover={{ x: 3 }}

              whileTap={{ scale: 0.95 }}

              onClick={handleLogout}

              className="
                flex items-center gap-2
                text-gray-600 dark:text-gray-300
                hover:text-red-600 dark:hover:text-red-400
                transition
                cursor-pointer
              "

            >

              <GoMoveToEnd size={20} />

              <span className="text-sm font-medium">

                Sign out

              </span>

            </motion.button>

          </div>

        )}

      </div>

    </nav>

  );

}
