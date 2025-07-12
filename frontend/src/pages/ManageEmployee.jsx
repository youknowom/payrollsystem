import React, { useEffect, useState } from "react";
import Title from "../components/Title";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API call
    setEmployees([
      {
        _id: "emp001",
        name: "Raj Sharma",
        phone: "9876543210",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        status: "active",
      },
      {
        _id: "emp002",
        name: "Amit Patil",
        phone: "9876501234",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        status: "inactive",
      },
    ]);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === id ? { ...emp, status: newStatus } : emp))
    );
    // TODO: Call backend API to update status
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Employees"
        subTitle="View & update employee status"
      />

      <div className="max-w-5xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 font-medium">Employee</th>
              <th className="p-3 font-medium">Emp ID</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t border-borderColor text-gray-600"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={emp.image}
                    alt="employee"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="font-medium">{emp.name}</p>
                </td>

                <td className="p-3 text-sm text-gray-600">{emp._id}</td>

                <td className="p-3 text-sm">{emp.phone}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      emp.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    value={emp.status}
                    onChange={(e) =>
                      handleStatusChange(emp._id, e.target.value)
                    }
                    className="px-2 py-1.5 mt-1 border border-borderColor rounded-md outline-none text-sm text-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEmployee;
