import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  UserPlus,
  Users,
  Wallet,
  Settings,
  LogOut,
  LogIn,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

//Menu
const ownerMenuLinks = [
  { name: "Dashboard", path: "/admin", icon: <Gauge size={18} /> },
  {
    name: "Add Employees",
    path: "/admin/add-employees",
    icon: <UserPlus size={18} />,
  },
  {
    name: "Manage Employees",
    path: "/admin/manage-employees",
    icon: <Users size={18} />,
  },
  { name: "Pay Out", path: "/admin/pay-out", icon: <Wallet size={18} /> },
  {
    name: "Setting",
    path: "/admin/profile-edit",
    icon: <Settings size={18} />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
    navigate("/");
  };

  const handleLogin = () => navigate("/sign-in");

  const fallbackImg =
    "https://ui-avatars.com/api/?name=Guest+User&background=random&color=fff";

  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 70 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative min-h-screen flex flex-col pt-6 border-r border-borderColor bg-white"
    >
      <button
        className="absolute top-3 -right-4 bg-white border rounded-full p-1 shadow"
        onClick={() => setIsOpen((p) => !p)}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="mx-auto">
        <img
          className={`rounded-full object-cover border border-gray-300 ${
            isOpen ? "w-14 h-14" : "w-9 h-9"
          }`}
          src={user?.imageUrl || fallbackImg}
          alt="avatar"
        />
      </div>
      {isOpen && (
        <p className="mt-3 text-center text-sm font-semibold text-gray-700">
          {user?.fullName || "Your Organization"}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2 w-full px-1">
        {ownerMenuLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`relative flex items-center gap-3 py-2 pl-4 pr-2 hover:bg-gray-100 transition ${
                active ? "bg-primary/10 text-primary" : "text-gray-600"
              }`}
            >
              {link.icon}
              {isOpen && <span>{link.name}</span>}
              {active && (
                <div className="absolute right-0 w-1.5 h-6 bg-primary rounded-l" />
              )}
            </NavLink>
          );
        })}

        <button
          onClick={user ? handleLogout : handleLogin}
          className="flex items-center gap-3 py-2 pl-4 pr-2 hover:bg-gray-100 transition text-red-500"
        >
          {user ? <LogOut size={18} /> : <LogIn size={18} />}
          {isOpen && <span>{user ? "Logout" : "Login"}</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
