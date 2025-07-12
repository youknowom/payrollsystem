import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  UserPlus,
  Users,
  Wallet,
  Settings,
} from "lucide-react";

/* ---------- menu config ---------- */
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

/* ---------- component ---------- */
const Sidebar = () => {
  /* Global user state from Redux */
  const user = useSelector((state) => state.user); // { name, image }
  const location = useLocation();

  /* Sidebar open / collapsed */
  const [isOpen, setIsOpen] = useState(true);

  /* Fallback avatar */
  const fallbackImg =
    "https://creatorspace.imgix.net/users/clrvzk60j02w4qt01696sgjtr/0mKp9xFKbvrGQJ2Y-418787584_752106519697462_6896083793320903255_n.jpg";

  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 70 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative min-h-screen flex flex-col pt-6 border-r border-borderColor bg-white"
    >
      {/* Toggle button */}
      <button
        className="absolute top-3 -right-4 bg-white border rounded-full p-1 shadow"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Profile image */}
      <div className="mx-auto">
        <img
          className={`rounded-full object-cover ${
            isOpen ? "w-14 h-14" : "w-9 h-9"
          }`}
          src={user.image || fallbackImg}
          alt="Profile"
        />
      </div>

      {/* Username */}
      {isOpen && <p className="mt-3 text-center text-sm">{user.name}</p>}

      {/* Links */}
      <div className="mt-6 flex flex-col gap-2 w-full">
        {ownerMenuLinks.map((link) => {
          const active = link.path === location.pathname;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`relative flex items-center gap-3 py-2 pl-4 pr-2 hover:bg-gray-100 transition-all duration-200 ${
                active ? "bg-primary/10 text-primary" : "text-gray-600"
              }`}
            >
              <span>{link.icon}</span>
              {isOpen && <span>{link.name}</span>}
              {active && (
                <div className="absolute right-0 w-1.5 h-6 bg-primary rounded-l" />
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Sidebar;
