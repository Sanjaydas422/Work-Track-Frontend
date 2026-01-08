import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const AdminAuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get("/admin_app/current_user/");
        if (res.data.role === "admin") {
          setAuthorized(true);
        }
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return null; // or loader

  if (!authorized) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminAuthGuard;
