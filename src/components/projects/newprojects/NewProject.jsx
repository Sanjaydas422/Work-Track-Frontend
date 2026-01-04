import React, { useRef, useEffect, useState } from "react";
import "./NewProject.css";
import { toast } from "react-toastify";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    project_name: "",
    company_name: "",
    description: "",
    assigned_by: "",
    due_date: "",
    est_hr: "",
    priority: "",
    links: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [users, setUsers] = useState([]);          // <-- USERS STATE
  const fileInputRef = useRef(null);

  // ---------- FETCH USERS ----------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("admin_app/users");  // same API used in tasks
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttachmentClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
    e.target.value = null;
  };

  const handleRemoveAttachment = (i) => {
    setAttachments(prev => prev.filter((_, index) => index !== i));
  };

  const handleLinkIconClick = () => {
    if (formData.links?.trim()) {
      const url = formData.links.startsWith("http")
        ? formData.links
        : `https://${formData.links}`;
      window.open(url, "_blank");
      return;
    }
    setShowLinkInput(s => !s);
  };

  const validateRequired = () => {
    const { project_name, company_name, description, assigned_by, due_date, est_hr } = formData;
    if (!project_name || !company_name || !description || !assigned_by || !due_date || !est_hr) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRequired()) return;

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("project_name", formData.project_name);
      payload.append("company_name", formData.company_name);
      payload.append("description", formData.description);

      // ---------- MAIN IMPORTANT ----------
      payload.append("assigned_by", formData.assigned_by);   // USER ID GOING
      // ------------------------------------

      payload.append("due_date", formData.due_date);
      payload.append("est_hr", formData.est_hr);
      payload.append("priority", formData.priority || "");
      payload.append("links", formData.links || "");

      attachments.forEach(f => payload.append("attachments", f));

      const res = await api.post("/admin_app/add_projects", payload);
      toast.success(res.data?.message || "Project Added Successfully");
      navigate("/projects");   // your project list route

      setFormData({
        project_name: "",
        company_name: "",
        description: "",
        assigned_by: "",
        due_date: "",
        est_hr: "",
        priority: "",
        links: "",
      });

      setAttachments([]);
      setShowLinkInput(false);

    } catch (err) {
      toast.error("Project Add Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="newproject-title">New Project</div>

      <form className="newproject-container" onSubmit={handleSubmit}>
        <div className="newproject-leftform">

          <label>Project Name</label>
          <input
            type="text"
            className="newproject-input"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
          />

          <label>Company Name</label>
          <input
            type="text"
            className="newproject-input"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            className="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="newproject-rightform">

          {/* -------- ASSIGNED TO DROPDOWN -------- */}
          <label>Assigned To</label>
          <select
            name="assigned_by"
            className="newproject-input"
            value={formData.assigned_by}
            onChange={handleChange}
          >
            <option value="">Select User</option>

            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.first_name || u.email}
              </option>
            ))}
          </select>

          <div className="date-hour">
            <div className="dates">
              <label>Due Date</label>
              <input
                type="date"
                className="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>

            <div className="est-hour">
              <label>Est.hour</label>
              <input
                type="text"
                className="esthour"
                name="est_hr"
                placeholder="00hr"
                value={formData.est_hr}
                onChange={handleChange}
              />
            </div>
          </div>




          <div className="priority-link-project">
            <div className="project-priority">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="priority-select"
                aria-label="Priority"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Link icon (toggles inline input). Clicking image opens link if present */}
            <div className="attachment-block">
              <button
                type="button"
                className="project-attachment-link"
                onClick={handleLinkIconClick}
                title={formData.links ? "Open link in new tab" : "Add link"}
              >
                <img src="link icon.svg" alt="link" className="icon-img" />
              </button>

              {showLinkInput && (
                <input
                  type="url"
                  name="links"
                  value={formData.links}
                  placeholder="https://example.com"
                  onChange={handleChange}
                  className="small-link-input"
                />
              )}

              {!showLinkInput && formData.links && (
                <div className="selected-meta">
                  {formData.links.length > 30 ? formData.links.slice(0, 30) + "..." : formData.links}
                </div>
              )}
            </div>

            {/* File attachment icon */}
            <div className="attachment-block">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden-file"
                onChange={handleFileChange}
                multiple
                accept="*/*"
              />
              <button
                type="button"
                className="project-attachment-link"
                onClick={handleAttachmentClick}
                title="Add attachment(s)"
              >
                <img src="link.svg" alt="attachment" className="icon-img" />
              </button>

              <div className="files-list selected-meta">
                {attachments.length === 0 ? (
                  <span className="no-file">No file</span>
                ) : (
                  attachments.map((f, i) => (
                    <div key={`${f.name}-${f.size}-${i}`} className="file-item">
                      <span className="file-name">{f.name.length > 18 ? f.name.slice(0, 18) + "..." : f.name}</span>
                      <button type="button" className="remove-file" onClick={() => handleRemoveAttachment(i)}>
                        &times;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={() => {
              // optional: reset form or navigate back
              setFormData({
                project_name: "",
                company_name: "",
                description: "",
                assigned_by: "",
                due_date: "",
                est_hr: "",
                priority: "",
                links: "",
              });
              setAttachments([]);
            }}>
              Cancel
            </button>
            <button className="save-btn" type="submit" disabled={loading}>
              {loading ? "Adding Project...." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProject;
