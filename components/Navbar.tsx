"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GoMoveToEnd } from "react-icons/go";


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

    <nav className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">

      {/* Logo */}

      <div
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Task Manager
      </div>



      {/* Right Side */}

      <div className="flex items-center gap-4">

        {!isLoggedIn ? (

          <>
            <button
              onClick={() =>
                router.push("/login")
              }
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </button>

            <button
              onClick={() =>
                router.push("/register")
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </>

        ) : (

          <div className="flex items-center gap-3">

            {/* Avatar */}

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

              {userInitial || "U"}

            </div>



            {/* Sign out */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition group cursor-pointer"
            >

              <GoMoveToEnd
                size={20}
                className="group-hover:translate-x-1 transition"
              />

              <span className="text-sm font-medium">
                sign out
              </span>

            </button>


          </div>

        )}

      </div>

    </nav>

  );

}
