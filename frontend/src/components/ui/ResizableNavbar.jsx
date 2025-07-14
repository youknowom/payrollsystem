"use client";

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Login from "../../pages/Login";

const navLinks = [
  { name: "Home", link: "#" },
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

const ResizableNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Payroll Logo"
            className="w-auto h-6 object-contain"
          />
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black dark:text-black">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setShowLogin(true)}
            className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Login
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <IconX
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 cursor-pointer text-black dark:text-black"
            />
          ) : (
            <IconMenu2
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer text-black dark:text-black"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md space-y-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className="block py-2 text-sm font-medium text-black hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              setShowLogin(true);
            }}
            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </header>
  );
};

export default ResizableNavbar;
