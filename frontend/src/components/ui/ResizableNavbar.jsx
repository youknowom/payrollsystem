// src/components/ui/ResizableNavbar.jsx
"use client";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import CustomUserMenu from "../CustomUserMenu"; // ← correct path (one level up)

const navLinks = [
  { name: "Home", link: "#" },
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

const ResizableNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Payroll Logo"
            className="h-6 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-black">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}

          {/* Auth buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          {/* Custom dropdown (avatar + menu) */}
          <SignedIn>
            <CustomUserMenu />
          </SignedIn>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <IconX
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 cursor-pointer text-black"
            />
          ) : (
            <IconMenu2
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer text-black"
            />
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="block py-2 text-sm font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <SignedOut>
            <SignInButton mode="modal">
              <button
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
              >
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Custom dropdown also works fine on mobile – keep it simple */}
            <CustomUserMenu />
          </SignedIn>
        </div>
      )}
    </header>
  );
};

export default ResizableNavbar;
