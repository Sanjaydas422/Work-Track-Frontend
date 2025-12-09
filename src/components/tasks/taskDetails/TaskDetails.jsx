import React from "react";
import "./TaskDetails.css";

const TaskDetails = () => {
  return (
    <div className="taskdetails-page">

      {/* Header / Title box (keeps your original structure) */}
      <div className="taskdetails-titlebox">
        <p className="taskdetails-text">Task Details</p>
      </div>

      {/* Main grid */}
      <div className="taskdetails-grid">

        {/* LEFT COLUMN */}
        <div className="task-left">
          {/* Task Name */}
          <div className="section">
            <label htmlFor="taskName" className="label">Task Name</label>
            <input
              id="taskName"
              className="taskname-input"
              type="text"
              placeholder="Design Landing Page"
            />
          </div>

          {/* Description */}
          <div className="section">
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              className="textarea"
              rows="6"
              placeholder="Create a visually appealing landing page that effectively presents the app’s core features and adapts seamlessly across all devices."
            />
          </div>

          {/* Discussion */}
          <div className="discussion-section">
            <label className="discussion-text">Discussion</label>
            <div className="discussion-card">
              <div className="avatar">D</div>
              <textarea
                className="comment-input"
                placeholder="Add a comment"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN / SIDEBAR */}
        <aside className="task-right">
          <div className="right-block">
            <div className="mini-label">Assigned to</div>
            <div className="right-value">Project Lead</div>
          </div>

          <div className="two-col">
            <div>
              <div className="mini-label">Priority</div>
              <div className="priority-badge high">High</div>
            </div>

            <div>
              <div className="mini-label">Due Date</div>
              <div className="right-value">Jul 17</div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="mini-label">Status</div>
              <div className="right-value">In Progress</div>
            </div>

            <div>
              <div className="mini-label">Effort Hours</div>
              <div className="right-value">5hr</div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="mini-label">Links</div>
              <button className="icon-btn" aria-label="links">🔗</button>
            </div>

            <div>
              <div className="mini-label">Attachments</div>
              <button className="icon-btn" aria-label="attachments">📎</button>
            </div>
          </div>
        </aside>
      </div>

      {/* Action buttons */}
      <div className="action-row">
        <button className="btn cancel">Cancel</button>
        <button className="btn save">Save</button>
      </div>
    </div>
  );
};

export default TaskDetails;
