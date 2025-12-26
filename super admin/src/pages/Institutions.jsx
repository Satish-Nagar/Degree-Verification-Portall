import React, { useState } from "react";
import { mockInstitutions, mockUniversities } from "../utils/mockData";

const Institutions = () => {
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [showModal, setShowModal] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    universityId: "",
    code: "",
    address: "",
    contactPerson: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const handleAdd = () => {
    setEditingInstitution(null);
    setFormData({
      name: "",
      universityId: "",
      code: "",
      address: "",
      contactPerson: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEdit = (institution) => {
    setEditingInstitution(institution);
    setFormData(institution);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this institution?")) {
      setInstitutions(institutions.filter((i) => i.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const university = mockUniversities.find(
      (u) => u.id === parseInt(formData.universityId)
    );

    if (editingInstitution) {
      setInstitutions(
        institutions.map((i) =>
          i.id === editingInstitution.id
            ? { ...i, ...formData, universityName: university.name }
            : i
        )
      );
    } else {
      const newInstitution = {
        ...formData,
        id: institutions.length + 1,
        universityName: university.name,
        studentCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setInstitutions([...institutions, newInstitution]);
    }
    setShowModal(false);
  };

  const filteredInstitutions = institutions.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.universityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Institutions Management</h1>
        <p className="page-description">
          Manage colleges and institutions under universities
        </p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search institutions..."
            className="form-input"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add Institution
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>University</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstitutions.map((institution) => (
              <tr key={institution.id}>
                <td style={{ fontWeight: "600" }}>{institution.name}</td>
                <td>{institution.code}</td>
                <td>{institution.universityName}</td>
                <td>{institution.contactPerson}</td>
                <td>{institution.email}</td>
                <td>{institution.phone}</td>
                <td>{institution.studentCount.toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      institution.status === "Active" ? "success" : "danger"
                    }`}
                  >
                    {institution.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(institution)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(institution.id)}
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
                {editingInstitution
                  ? "Edit Institution"
                  : "Add New Institution"}
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
                <label className="form-label">Institution Name *</label>
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
                <label className="form-label">University *</label>
                <select
                  className="form-select"
                  value={formData.universityId}
                  onChange={(e) =>
                    setFormData({ ...formData, universityId: e.target.value })
                  }
                  required
                >
                  <option value="">Select University</option>
                  {mockUniversities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Institution Code *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
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
                  {editingInstitution ? "Update" : "Add"} Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Institutions;
