import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetails.css";
import api from "../../../api/api";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await api.get(`admin_app/view_tasks`);
      const foundTask = response.data.tasks.find(
        (t) => t.id === Number(id)
      );
      setTask(foundTask);
    } catch (error) {
      console.error("Failed to load task", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="taskdetails-page">

      <nav className="header-strip">
        Task Details
      </nav>

      <div className="task-main-container">

        {/* LEFT SIDE */}
        <div className="task-left">

          <div className="field-block">
            <label>Task Name</label>
            <input value={task.task_name} disabled />
          </div>

          <div className="field-block">
            <label>Description</label>
            <textarea value={task.description || ""} rows="5" disabled />
          </div>

          <div className="discussion-block">
            <label>Discussion</label>
            <div className="discussion-card">
              <div className="avatar">D</div>
              <textarea
                placeholder="Add a comment"
                className="comment-box"
                disabled
              />
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="task-right">

          <div className="right-row">
            <p className="label">Assigned To</p>
            <p className="value">{task.assignedto || "—"}</p>
          </div>

          <div className="two-col">
            <div>
              <p className="label">Priority</p>
              <span className={`priority-badge ${task.priority?.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>

            <div>
              <p className="label">Due Date</p>
              <p className="value">{task.due_date}</p>
            </div>
          </div>

          <div className="two-col">
            <div>
              <p className="label">Status</p>
              <p className="value">{task.status}</p>
            </div>

            <div>
              <p className="label">Effort Hours</p>
              <p className="value">{task.working_hours || "—"}</p>
            </div>
          </div>

          <div className="two-col">
            <div>
              <p className="label">Links</p>
              <button className="icon-btn">🔗</button>
            </div>

            <div>
              <p className="label">Attachments</p>
              <button className="icon-btn">📎</button>
            </div>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button className="cancel" onClick={() => navigate("/tasks")}>
          Cancel
        </button>
        <button className="save">Save</button>
      </div>

    </div>
  );
};

export default TaskDetails;
