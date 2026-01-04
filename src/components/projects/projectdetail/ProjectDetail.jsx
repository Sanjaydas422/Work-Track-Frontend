import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------ FETCH PROJECT ------------
  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/admin_app/view-project/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((res) => setData(res.project))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  // ------------ LINK OPEN ------------
  const openLink = () => {
    if (!data?.Links) return;
    const url = data.Links.startsWith("http")
      ? data.Links
      : `https://${data.Links}`;
    window.open(url, "_blank");
  };

  // ------------ ATTACHMENT OPEN ------------
  const openAttachment = () => {
    if (!data?.Attachments) return;
    window.open(data.Attachments, "_blank");
  };

  // ------------ SAVE UPDATE ------------
  const handleSave = async () => {
    if (!data) return;

    const form = new FormData();
    form.append("project_name", data.Project_Name || "");
    form.append("company_name", data.Company_Name || "");
    form.append("description", data.Description || "");
    form.append("priority", data.Priority || "");
    form.append("due_date", data.Due_Date?.slice(0, 10) || "");
    form.append("links", data.Links || "");
    form.append("status", data.Status || "");

    try {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/admin_app/update_projects/${id}/`,
        {
          method: "POST",
          body: form,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Update failed");
        return;
      }

      alert(result.message || "Updated Successfully");
      navigate("/projects");
    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <div>
      <div className="project-detail-title">Project Details</div>

      <div className="project-detail-container">
        {/* LEFT */}
        <div className="project-detail-leftform">
          <form>
            <label>Project Name</label>
            <br />
            <input
              type="text"
              className="project-detail-input"
              value={data.Project_Name || ""}
              onChange={(e) =>
                setData({ ...data, Project_Name: e.target.value })
              }
            />

            <label>Company Name</label>
            <br />
            <input
              type="text"
              className="project-detail-input"
              value={data.Company_Name || ""}
              onChange={(e) =>
                setData({ ...data, Company_Name: e.target.value })
              }
            />

            <label>Description</label>
            <br />
            <textarea
              className="description"
              value={data.Description || ""}
              onChange={(e) =>
                setData({ ...data, Description: e.target.value })
              }
            />
          </form>
        </div>

        {/* RIGHT */}
        <div className="project-detail-rightform">
          <form>
            <label>Assigned to</label>
            <br />
            <textarea
              className="project-detail-input"
              value={(data.Assigned_to || []).join(", ")}
              readOnly
            />

            <div className="date-hour">
              <div className="est-hour">
                <label>Priority</label>
                <br />
                <input
                  type="text"
                  className="esthour"
                  value={data.Priority || ""}
                  onChange={(e) =>
                    setData({ ...data, Priority: e.target.value })
                  }
                />
              </div>

              <div className="dates">
                <label>Due Date</label>
                <br />
                <input
                  type="date"
                  className="date"
                  value={data.Due_Date ? data.Due_Date.slice(0, 10) : ""}
                  onChange={(e) =>
                    setData({ ...data, Due_Date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* LINKS */}
            <div className="link-project">
              <div
                className="project-attachment-link"
                onClick={openLink}
                title={data.Links || "No link"}
              >
                <img src="link icon.svg" alt="link" />
              </div>

              <div
                className="project-attachment-link"
                onClick={openAttachment}
                title={data.Attachments || "No attachment"}
              >
                <img src="link.svg" alt="attachment" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="form-buttons">
        <button className="cancel-btn">Cancel</button>

        <button className="save-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
