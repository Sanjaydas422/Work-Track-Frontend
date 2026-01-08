import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Users.css";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin_app/users");
        setRows(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="table-loading">Loading...</p>;
  }

  return (
    <div className="users-page">
      {/* HEADER */}
      <div className="users-header">
        <h2>Users</h2>

        <button
          className="add-user-btn"
          onClick={() => navigate("/users/create")}
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Working Hours</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="user-cell">
                  <img
                    src={row.avatar || "/default-avatar.png"}
                    alt={row.user_name}
                    className="avatar"
                  />
                  <span>{row.user_name}</span>
                </td>

                <td>{row.task_name}</td>
                <td>{row.due_date}</td>

                <td>
                  <span
                    className={`status ${row.status
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td>{row.working_hours}</td>

                <td>
                  <span className={`priority ${row.priority.toLowerCase()}`}>
                    {row.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
