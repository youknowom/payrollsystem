import React from "react";
import logo from "../assets/logo.png";
import ResizableNavbar from "../components/ui/ResizableNavbar";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
const features = [
  {
    title: "Attendance Tracking",
    desc: "Track employee check-in/out time, leaves, and presence in real-time.",
    icon: "📅",
  },
  {
    title: "Employee Management",
    desc: "Add, manage, and organize employee details with ease.",
    icon: "👨‍💼",
  },
  {
    title: "Salary Payouts",
    desc: "Generate and manage automated salary slips and payments.",
    icon: "💰",
  },
];

const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <ResizableNavbar />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Payroll Management Made Easy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            All-in-one solution to manage attendance, employees, and salary
            payouts for your organization.
          </p>
          {/* <a
            href="/admin"
            className="text-lg px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a> */}
          {/* <SignedOut>
            <SignInButton mode="modal">
              <button className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
