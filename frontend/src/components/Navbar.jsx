import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import logo from "../assets/logo.png"; // your logo

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // { name, image }

  const [imgError, setImgError] = useState(false);

  const fallbackImg =
    "https://ui-avatars.com/api/?name=Admin&background=random&color=fff";

  const logout = () => {
    toast.success("Logged out successfully!");
    // Add your logout dispatch or redirect logic here
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor">
      {/* Logo */}
      <Link to="/admin">
        <img src={logo} alt="Logo" className="h-7" />
      </Link>

      {/* Right: Welcome + Avatar + Logout */}
      <div className="flex items-center gap-4 ml-auto">
        <p className="text-sm text-right">
          Welcome,{" "}
          <span className="font-medium text-black">
            {user?.name || "Admin"}
          </span>
        </p>

        {/* Avatar */}
        <img
          className="w-8 h-8 rounded-full object-cover border border-gray-300"
          src={!imgError && user?.image ? user.image : fallbackImg}
          onError={() => setImgError(true)}
          alt="User Avatar"
        />

        {/* Logout Button */}
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
