import React, { useState } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { Upload } from "lucide-react";

const AddEmployee = () => {
  const [image, setImage] = useState(null);
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    address: "",
    dob: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Form validation can be added here
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", employee.name);
    formData.append("phone", employee.phone);
    formData.append("address", employee.address);
    formData.append("dob", employee.dob);

    try {
      await axios.post("http://localhost:5000/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Employee added and WhatsApp message sent!");
      setEmployee({ name: "", phone: "", address: "", dob: "" });
      setImage(null);
    } catch (err) {
      toast.error("Failed to add employee");
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add New Employee" subTitle="Enter new employee details" />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Upload Employee Photo */}
        <div className="flex items-center gap-4">
          <label htmlFor="emp-image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Employee"
                className="h-16 w-16 object-cover rounded-full border"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-100">
                <Upload className="text-gray-400" />
              </div>
            )}
            <input
              type="file"
              id="emp-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload employee's photo</p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-40">
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md"
              placeholder="Enter employee name"
            />
          </div>

          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md"
              placeholder="e.g. 9876543210"
            />
          </div>

          <div className="flex flex-col">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={employee.dob}
              onChange={handleChange}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={employee.address}
              onChange={handleChange}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md"
              placeholder="Street, Area, City"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-primary text-white py-2 rounded-md hover:opacity-90"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
