import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  dob: { type: Date },
  image: { type: String },
  status: { type: String, default: "active" },
});

export default mongoose.model("Employee", employeeSchema);
