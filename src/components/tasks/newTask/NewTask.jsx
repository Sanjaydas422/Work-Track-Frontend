import React, { useState, useEffect } from "react";
import "./NewTask.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api";

const NewTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    workingHours: "",
    priority: "",
  });

  // 🔹 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin_app/users/list/");
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit task
  const handleSubmit = async () => {
    if (
      !formData.taskName ||
      !formData.priority ||
      !formData.dueDate ||
      !formData.assignedTo
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        task_name: formData.taskName,
        description: formData.description,
        due_date: formData.dueDate,
        working_hours: Number(formData.workingHours || 0),
        priority: formData.priority,
        status: "Pending",
        assigned_to: [Number(formData.assignedTo)],
      };

      const res = await api.post("/admin_app/add_tasks/", payload);

      if (res.status === 201) {
        toast.success("Task added successfully");
        navigate("/tasks");
      }
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="newtask-title">New Task</div>

      <div className="newtask-container">
        {/* LEFT */}
        <div className="newtask-leftform">
          <label>Task Name *</label>
          <input
            type="text"
            name="taskName"
            className="newtask-input"
            value={formData.taskName}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            className="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT */}
        <div className="newtask-rightform">
          <label>Assigned To *</label>
          <select
            name="assignedTo"
            className="newtask-input"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.first_name || u.email}
              </option>
            ))}
          </select>

          <div className="date-hour">
            <div>
              <label>Due Date *</label>
              <input
                type="date"
                name="dueDate"
                className="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Est. Hours</label>
              <input
                type="number"
                name="workingHours"
                className="esthour"
                min="0"
                value={formData.workingHours}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Priority *</label>
          <select
            name="priority"
            className="newtask-input"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate("/tasks")}>
          Cancel
        </button>

        <button className="save-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
};

export default NewTask;
