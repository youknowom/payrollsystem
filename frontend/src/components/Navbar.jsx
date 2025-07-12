import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import logo from "../assets/logo.svg"; // static logo

const Navbar = () => {
  const dispatch = useDispatch();

  // ✅ Get user from Redux state
  const user = useSelector((state) => state.user); // { name, image }

  const logout = () => {
    // You can add a logout reducer if needed, for now just show toast
    toast.success("Logged out successfully!");
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      {/* Left: Logo */}
      <Link to="/admin">
        <img src={logo} alt="Logo" className="h-7" />
      </Link>

      {/* Right: Welcome message + Logout */}
      <div className="flex items-center gap-4 ml-auto">
        <p className="text-sm text-right">
          Welcome,{" "}
          <span className="font-medium text-black">
            {user?.name || "Admin"}
          </span>
        </p>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded bg-primary text-white hover:bg-blue-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
