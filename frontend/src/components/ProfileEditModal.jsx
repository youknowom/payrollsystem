import React, { useState } from "react";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";

const ProfileEditModal = ({ isOpen, setIsOpen, user }) => {
  const [name, setName] = useState(user?.fullName || "");
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");

  const handleSave = async () => {
    try {
      await user.update({
        firstName: name.split(" ")[0] || "",
        lastName: name.split(" ")[1] || "",
        imageUrl: imageUrl,
      });
      toast.success("Profile updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md space-y-4 shadow-lg border">
          <Dialog.Title className="text-lg font-bold">
            Edit Profile
          </Dialog.Title>

          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileEditModal;
