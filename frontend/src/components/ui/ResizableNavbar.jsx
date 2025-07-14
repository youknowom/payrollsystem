"use client";

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
  { name: "Home", link: "#" },
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

const ResizableNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 from-blue-50 via-white to-blue-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Payroll Logo"
            className="w-auto h-10 object-contain "
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/admin"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Admin Login
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <IconX
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 cursor-pointer"
            />
          ) : (
            <IconMenu2
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md dark:bg-neutral-900">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/admin"
            className="mt-2 inline-block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Admin Login
          </a>
        </div>
      )}
    </header>
  );
};

export default ResizableNavbar;
