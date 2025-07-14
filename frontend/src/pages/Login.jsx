import React from "react";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const [mode, setMode] = React.useState("login"); // "login" | "register"
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  // ────────────────────────────────────────────────────────────
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // basic client‑side validation (for register only)
    if (mode === "register") {
      if (!name || !email || !password) {
        toast.error("Please fill all the fields");
        return;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
    }

    try {
      const payload =
        mode === "register" ? { name, email, password } : { email, password };

      // 🔗 call backend (now hitting /api/auth)
      const { data } = await axios.post(
        `/auth/${mode === "login" ? "login" : "register"}`,
        payload
      );

      if (data.success) {
        localStorage.setItem("token", data.token);

        toast.success(
          mode === "login"
            ? "Logged in successfully"
            : "Account created successfully"
        );

        setShowLogin(false); // close modal
        navigate("/admin"); // redirect to admin panel
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login/Register request failed";
      toast.error(msg);
    }
  };
  // ────────────────────────────────────────────────────────────

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium text-center w-full">
          <span className="text-primary">User</span>{" "}
          {mode === "login" ? "Login" : "Sign Up"}
        </p>

        {mode === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="text-center w-full">
          {mode === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-primary cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-primary cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {mode === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
