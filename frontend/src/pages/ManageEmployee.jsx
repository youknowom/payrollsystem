import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import SkeletonRow from "../components/SkeletonRow";
import EditEmployeeModal from "../components/EditEmployee";
import { Pencil, Trash2 } from "lucide-react";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEmployee, setEditEmployee] = useState(null);

  /** Fetch employees */
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data.reverse());
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    toast.info("Deleting employee...");
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      toast.success("Employee deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSaveEdit = async (updated) => {
    try {
      await axios.put(
        `http://localhost:5000/api/employees/${updated._id}`,
        updated
      );
      setEmployees((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
      toast.success("Employee updated");
      setEditEmployee(null);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="px-4 pt-10 md:px-10 w-full">
        <Title
          title="Manage Employees"
          subTitle="View & update employee status"
        />
        <div className="max-w-5xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full border-collapse text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 font-medium">No</th>
                <th className="p-3 font-medium">Emp ID</th>
                <th className="p-3 font-medium">Employee</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Employees"
        subTitle="View & update employee status"
      />

      <div className="max-w-5xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 font-medium">No</th>
              <th className="p-3 font-medium">Emp ID</th>
              <th className="p-3 font-medium">Employee</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={emp._id}
                className="border-t border-borderColor text-gray-600"
              >
                <td className="p-3 font-medium">{idx + 1}</td>

                {/* Emp ID */}
                <td className="p-3 text-sm">{`EMP${String(idx + 1).padStart(
                  4,
                  "0"
                )}`}</td>

                {/* Employee name & avatar */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={emp.image}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/40?text=User")
                    }
                    alt="employee"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="font-medium">{emp.name}</p>
                </td>

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

                {/* Action buttons */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditEmployee(emp)}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editEmployee && (
        <EditEmployeeModal
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ManageEmployee;
