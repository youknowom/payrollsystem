// components/CustomUserMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

const CustomUserMenu = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoaded || !user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={user.imageUrl}
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
        alt="avatar"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 flex items-center gap-3">
            <img
              src={user.imageUrl}
              className="w-10 h-10 rounded-full border"
              alt="user"
            />
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-500">
                {user.primaryPhoneNumber?.phoneNumber || ""}
              </p>
            </div>
          </div>

          <hr />

          <ul className="text-sm">
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile-edit"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut(() => navigate("/"))}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomUserMenu;
