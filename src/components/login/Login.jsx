import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill both fields");
      return;
    }

    try {
  setLoading(true);

  const res = await api.post("/admin_app/login/", formData);

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  // 🔐 VERIFY USER FROM BACKEND
  const me = await api.get("/admin_app/current_user/");

  if (me.data.role !== "admin") {
    toast.error("You are not authorized to access admin dashboard");
    localStorage.clear();

    // optional redirect to user app
    window.location.href = "http://localhost:5174/";
    return;
  }

  toast.success("Login successful");
  navigate("/dashboard");

} catch (err) {
  const msg =
    err.response?.data?.error ||
    err.response?.data?.detail ||
    err.message ||
    "Login failed";
  toast.error(msg);
} finally {
  setLoading(false);
}
  };
const location = useLocation();
const shownRef = useRef(false);

useEffect(() => {
  if (
    location.state?.reason === "signup-disabled" &&
    !shownRef.current
  ) {
    toast.info("Login required. Only admins can create new users.");
    shownRef.current = true;
  }
}, [location.state]);

  return (
    <div className="signupmain">
      <div className="signupcontainer">

        <div className="signup-left-section">
          <div className="signup-logo-box">
            <img className="tron-logo" src="Component 180.png" alt="Tron Logo" />
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-card">

            <div className="signup-login-and-signup">
              <Link to="/signup">
                <p className="inactive">Sign Up</p>
              </Link>
              <p className="signupname">Login</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="signup-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="signup-input"
                placeholder="Enter your email"
              />

              <label className="signup-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="signup-input password-input"
                placeholder="Enter your password"
              />

              <button
                className="signupbutton"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
