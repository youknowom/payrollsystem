// src/components/Navbar.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import CustomUserMenu from "./CustomUserMenu";

const fallbackImg =
  "https://ui-avatars.com/api/?name=Admin&background=random&color=fff";

const Navbar = () => {
  /* Clerk user */
  const { user, isLoaded } = useUser();

  /* Greeting & avatar fallback */
  const displayName = isLoaded ? user?.fullName || "Admin" : "Admin";
  const avatarUrl = isLoaded ? user?.imageUrl || fallbackImg : fallbackImg;

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-borderColor bg-white">
      {/* ─── Logo (click → /admin) ─────────────────────────────── */}
      <Link to="/admin">
        <img src={logo} alt="Logo" className="h-7" />
      </Link>

      {/* ─── Greeting + avatar / menu ──────────────────────────── */}
      <div className="flex items-center gap-4 ml-auto">
        <p className="text-sm text-gray-700">
          Welcome,&nbsp;
          <span className="font-medium">{displayName}</span>
        </p>

        {/* While Clerk is loading, just show the static img.  
            Once loaded, show our custom dropdown component */}
        {isLoaded ? (
          <CustomUserMenu /> /* ← custom dropdown (avatar inside) */
        ) : (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
