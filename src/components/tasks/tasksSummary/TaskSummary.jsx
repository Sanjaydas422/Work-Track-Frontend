import React, { useEffect, useRef, useState } from "react";
import "./TaskSummary.css";
import api from "../../../api/api";

const TaskSummary = () => {
  const [tasks, setTasks] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [search, setSearch] = useState("");
  const menuRef = useRef(null);

       useEffect(() => {
  fetchTasks();
}, []);

  // Debounce search effect (prevents hanging)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTasks = async (query = "") => {
    try {
      const response = await api.get(
        `admin_app/view_tasks${query ? `?search=${query}` : ""}`
      );
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
 <>

      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned By</th>
            <th>Actions</th>
          </tr>
        </thead>



<tbody>
  {tasks.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No tasks found
      </td>
    </tr>
  ) : (
    tasks.map((task) => (
      <tr key={task.id}>
        <td>{task.task_name}</td>

        <td>
          <span className={`priority-pill ${task.priority?.toLowerCase()}`}>
            {task.priority}
          </span>
        </td>

        <td>{task.due_date}</td>

        <td className={`status ${task.status?.toLowerCase().replace(" ", "-")}`}>
          {task.status}
        </td>

        <td>{task.assigned_by}</td>

        <td className="actions">
          ...
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </>
  );
};

export default TaskSummary;
