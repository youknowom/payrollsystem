// models/EmployeeAuth.js
import mongoose from "mongoose";

const employeeAuthSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

export default mongoose.model("EmployeeAuth", employeeAuthSchema);
