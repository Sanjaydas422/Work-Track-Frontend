import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  // 🔐 ADMIN CHECK (VERY IMPORTANT)
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await api.get("/admin_app/current_user/");
        if (res.data.role !== "admin") {
          toast.error("You are not authorized to create users");
          navigate("/dashboard");
        }
      } catch {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
      } finally {
        setCheckingRole(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password } = formData;
    if (!name || !email || !mobile || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/admin_app/signup/", formData);

      toast.success(res.data?.message || "User created successfully");
      setFormData({ name: "", email: "", mobile: "", password: "" });

      // ✅ BACK TO USERS LIST
      navigate("/users");

    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Failed to create user";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Wait until role is checked
  if (checkingRole) return null;

  return (
    <div className="signupmain">
      <div className="signupcontainer">

        <div className="signup-left-section">
          <div className="signup-logo-box">
            <img
              className="tron-logo"
              src="Component 180.png"
              alt="Tron Logo"
            />
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-card">

            {/* 🔁 TEXT UPDATED */}
            <div className="signup-login-and-signup">
              <p className="signupname">Create User</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="signup-label">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="signup-input"
                placeholder="Enter name"
              />

              <label className="signup-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="signup-input"
                placeholder="Enter email"
              />

              <label className="signup-label">Mobile Number</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                className="signup-input"
                placeholder="Enter mobile number"
              />

              <label className="signup-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="signup-input password-input"
                placeholder="Enter password"
              />

              <button
                className="signupbutton"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
