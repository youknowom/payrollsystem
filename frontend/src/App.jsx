import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Pages
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ManageEmployee from "./pages/ManageEmployee";
import PayOut from "./pages/PayOut";
import Profileedit from "./pages/Admin/Profileedit";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-employees" element={<AddEmployee />} />
          <Route path="manage-employees" element={<ManageEmployee />} />
          <Route path="pay-out" element={<PayOut />} />
          <Route path="profile-edit" element={<Profileedit />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
