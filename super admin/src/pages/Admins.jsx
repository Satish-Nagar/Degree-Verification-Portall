import React, { useState } from "react";
import { mockAdmins, mockInstitutions } from "../utils/mockData";

const Admins = () => {
  const [admins, setAdmins] = useState(mockAdmins);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institutionId: "",
    role: "College Admin",
    status: "Active",
    phone: "",
  });

  const handleAdd = () => {
    setEditingAdmin(null);
    setFormData({
      name: "",
      email: "",
      institutionId: "",
      role: "College Admin",
      status: "Active",
      phone: "",
    });
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData(admin);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((a) => a.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const institution = mockInstitutions.find(
      (i) => i.id === parseInt(formData.institutionId)
    );

    if (editingAdmin) {
      setAdmins(
        admins.map((a) =>
          a.id === editingAdmin.id
            ? { ...a, ...formData, institutionName: institution.name }
            : a
        )
      );
    } else {
      const newAdmin = {
        ...formData,
        id: admins.length + 1,
        institutionName: institution.name,
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
      };
      setAdmins([...admins, newAdmin]);
    }
    setShowModal(false);
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Admin Management</h1>
        <p className="page-description">Manage institution admin accounts</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search admins..."
            className="form-input"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add Admin
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Institution</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td style={{ fontWeight: "600" }}>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.institutionName}</td>
                <td>{admin.phone}</td>
                <td>{admin.role}</td>
                <td>{admin.lastLogin}</td>
                <td>
                  <span
                    className={`badge ${
                      admin.status === "Active" ? "success" : "danger"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(admin)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(admin.id)}
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
                {editingAdmin ? "Edit Admin" : "Add New Admin"}
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
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                <label className="form-label">Institution *</label>
                <select
                  className="form-select"
                  value={formData.institutionId}
                  onChange={(e) =>
                    setFormData({ ...formData, institutionId: e.target.value })
                  }
                  required
                >
                  <option value="">Select Institution</option>
                  {mockInstitutions.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </select>
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
                <label className="form-label">Role *</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="College Admin">College Admin</option>
                  <option value="Data Manager">Data Manager</option>
                  <option value="Verification Officer">
                    Verification Officer
                  </option>
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
                  {editingAdmin ? "Update" : "Add"} Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;
