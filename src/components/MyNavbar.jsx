import Link from "next/link";
import React, { useState } from "react";
import logo from "@/images/logo.jpg";

function MyNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    //later I implement the logout-logic
  };

  return (
    <div className="bg-cyan-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </div>
          <Link href="/" className="text-white hover:underline mr-4">
            Home
          </Link>
          <Link href="/about" className="text-white hover:underline mr-4">
            About
          </Link>
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <Link
            href="/hospitals"
            className="block text-white hover:underline my-2"
          >
            Hospitals
          </Link>
          <Link href="/map" className="block text-white hover:underline my-2">
            Map
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="block text-white hover:underline my-2"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-white hover:underline my-2"
            >
              Login
            </Link>
          )}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        <Link href="/hospitals" className="text-white hover:underline mr-4">
          Hospitals
        </Link>
        <Link href="/map" className="text-white hover:underline mr-4">
          Map
        </Link>
        {isLoggedIn ? (
          <div className="text-white">
            <p className="mr-2">Welcome, User!</p>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default MyNavbar;
