// src/pages/Admin/Profileedit.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const Profileedit = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [image, setImage] = useState(null); // File
  const [preview, setPreview] = useState(""); // URL for <img />

  /* ---------- create / revoke preview URL ---------- */
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!isLoaded) return null; // Clerk still loading

  /* --------------- save handler --------------- */
  const onSave = async (e) => {
    e.preventDefault();
    try {
      // Update name if changed
      if (firstName !== user.firstName || lastName !== user.lastName) {
        await user.update({ firstName, lastName });
      }
      // Update avatar
      if (image) {
        await user.setProfileImage({ file: image });
      }
      toast.success("Profile updated!");
      navigate("/admin"); // back to dashboard
    } catch (err) {
      console.error(err);
      toast.error(err?.errors?.[0]?.message || "Update failed");
    }
  };

  /* --------------- UI --------------- */
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

      {/* fancy upload row (same as your employee form) */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="image-file" className="cursor-pointer">
          {preview ? (
            <img
              src={preview}
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-100">
              <Upload className="text-gray-400" />
            </div>
          )}
          <input
            id="image-file"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <p className="text-sm text-gray-700">Upload your photo</p>
      </div>

      {/* name form */}
      <form onSubmit={onSave} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First name"
          className="border p-2 rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="border p-2 rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profileedit;
