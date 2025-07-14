import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from "../components/ui/ResizableNavbar";

const navLinks = [
  { name: "Home", link: "#" },
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navLinks} />
          <NavbarButton variant="gradient" href="/admin">
            Admin Login
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navLinks.map((item, idx) => (
              <a key={idx} href={item.link} className="text-sm font-medium">
                {item.name}
              </a>
            ))}
            <NavbarButton href="/admin" variant="gradient" className="mt-2">
              Admin Login
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

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
          <NavbarButton
            href="/admin"
            variant="gradient"
            className="text-lg px-6 py-3"
          >
            Get Started
          </NavbarButton>
        </div>

        {/* Optional Illustration */}
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/hr-management-6128554-5032699.png"
          alt="Payroll illustration"
          className="mx-auto mt-10 w-full max-w-md"
        />
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
