import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Admin", adminSchema);
