import express from "express";
import multer from "multer";
import imagekit from "../configs/imagekit.js";
import fs from "fs";
import Admin from "../models/Admin.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp local upload

router.post("/update", upload.single("image"), async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  try {
    let imageUrl;

    if (file) {
      const fileBuffer = fs.readFileSync(file.path);

      const imgUploadRes = await imagekit.upload({
        file: fileBuffer,
        fileName: `${Date.now()}-${file.originalname}`,
      });

      fs.unlinkSync(file.path); // Clean temp file
      imageUrl = imgUploadRes.url;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (imageUrl) updateData.image = imageUrl;

    const updatedAdmin = await Admin.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
    });

    res.json({ message: "Profile updated", admin: updatedAdmin });
  } catch (err) {
    console.error("Error updating admin:", err);
    res
      .status(500)
      .json({ error: "Failed to update admin", details: err.message });
  }
});

export default router;
