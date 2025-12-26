import React, { useState } from "react";
import { mockRecruiters } from "../utils/mockData";

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState(mockRecruiters);
  const [showModal, setShowModal] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    status: "Active",
    subscriptionType: "Basic",
  });

  const handleAdd = () => {
    setEditingRecruiter(null);
    setFormData({
      organizationName: "",
      contactPerson: "",
      email: "",
      phone: "",
      status: "Active",
      subscriptionType: "Basic",
    });
    setShowModal(true);
  };

  const handleEdit = (recruiter) => {
    setEditingRecruiter(recruiter);
    setFormData(recruiter);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this recruiter?")) {
      setRecruiters(recruiters.filter((r) => r.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingRecruiter) {
      setRecruiters(
        recruiters.map((r) =>
          r.id === editingRecruiter.id ? { ...r, ...formData } : r
        )
      );
    } else {
      const newRecruiter = {
        ...formData,
        id: recruiters.length + 1,
        verificationsCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
        lastActive: "Never",
      };
      setRecruiters([...recruiters, newRecruiter]);
    }
    setShowModal(false);
  };

  const filteredRecruiters = recruiters.filter(
    (r) =>
      r.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Recruiters Management</h1>
        <p className="page-description">
          Manage recruiter organizations and their access
        </p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search recruiters..."
            className="form-input"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add Recruiter
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Verifications</th>
              <th>Subscription</th>
              <th>Last Active</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecruiters.map((recruiter) => (
              <tr key={recruiter.id}>
                <td style={{ fontWeight: "600" }}>
                  {recruiter.organizationName}
                </td>
                <td>{recruiter.contactPerson}</td>
                <td>{recruiter.email}</td>
                <td>{recruiter.phone}</td>
                <td>{recruiter.verificationsCount}</td>
                <td>
                  <span
                    className={`badge ${
                      recruiter.subscriptionType === "Enterprise"
                        ? "info"
                        : "success"
                    }`}
                  >
                    {recruiter.subscriptionType}
                  </span>
                </td>
                <td>{recruiter.lastActive}</td>
                <td>
                  <span
                    className={`badge ${
                      recruiter.status === "Active" ? "success" : "danger"
                    }`}
                  >
                    {recruiter.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(recruiter)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(recruiter.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingRecruiter ? "Edit Recruiter" : "Add New Recruiter"}
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Organization Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organizationName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subscription Type *</label>
                <select
                  className="form-select"
                  value={formData.subscriptionType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subscriptionType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Basic">Basic</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingRecruiter ? "Update" : "Add"} Recruiter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruiters;
