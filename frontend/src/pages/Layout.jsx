import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <Outlet /> {/* 🔥 This will render Dashboard / AddEmployee / etc. */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
