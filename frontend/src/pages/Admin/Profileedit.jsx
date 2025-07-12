import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";

const Profileedit = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Generate preview from selected image
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name && !image) {
      toast.error("Please provide at least one value to update");
      return;
    }

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/admin/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(
          updateUser({ name: data.admin.name, image: data.admin.image })
        );
        toast.success("Profile updated!");
        setName("");
        setImage(null);
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      {/* Profile Picture Preview */}
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="admin-image" className="cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="admin profile"
              className="h-16 w-16 object-cover rounded-full border"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center border rounded-full bg-gray-100">
              <Upload className="text-gray-400" />
            </div>
          )}
          <input
            id="admin-image"
            type="file"
            name="admin-image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      </div>

      {/* Name + Submit */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter new name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profileedit;
