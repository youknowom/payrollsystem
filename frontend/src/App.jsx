import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ManageEmployee from "./pages/ManageEmployee";
import PayOut from "./pages/PayOut";
import Profileedit from "./pages/Admin/Profileedit";
import LandingPage from "./pages/LandingPage";

import { SignedIn, SignIn, SignedOut, SignUp } from "@clerk/clerk-react";

const App = () => (
  <>
    <Toaster position="top-center" reverseOrder={false} />

    <Routes>
      {/* Public landing */}
      <Route path="/" element={<LandingPage />} />

      {/* ---------- PROTECTED ADMIN SECTION ---------- */}
      <Route
        path="/admin"
        element={
          <>
            <SignedIn>
              <Layout />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      >
        {/* index = /admin  */}
        <Route index element={<Dashboard />} />

        {/* /admin/add-employees etc. */}
        <Route path="add-employees" element={<AddEmployee />} />
        <Route path="manage-employees" element={<ManageEmployee />} />
        <Route path="pay-out" element={<PayOut />} />
        <Route path="profile-edit" element={<Profileedit />} />
      </Route>

      {/* Clerk hosted auth pages */}
      <Route
        path="/sign-in/*"
        element={
          <SignIn
            routing="path"
            path="/sign-in"
            fallbackRedirectUrl="/admin" // ✅ updated
          />
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <SignUp
            routing="path"
            path="/sign-up"
            fallbackRedirectUrl="/admin" // ✅ updated
          />
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1>404 – Not Found</h1>} />
    </Routes>
  </>
);

export default App;
