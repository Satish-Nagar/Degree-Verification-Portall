import React, { useState } from "react";
import { mockUniversities } from "../utils/mockData";

const Universities = () => {
  const [universities, setUniversities] = useState(mockUniversities);
  const [showModal, setShowModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    ugcCode: "",
    state: "",
    type: "State",
    status: "Active",
  });

  const handleAdd = () => {
    setEditingUniversity(null);
    setFormData({
      name: "",
      ugcCode: "",
      state: "",
      type: "State",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData(university);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this university?")) {
      setUniversities(universities.filter((u) => u.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUniversity) {
      setUniversities(
        universities.map((u) =>
          u.id === editingUniversity.id ? { ...u, ...formData } : u
        )
      );
    } else {
      const newUniversity = {
        ...formData,
        id: universities.length + 1,
        collegeCount: 0,
        studentCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUniversities([...universities, newUniversity]);
    }
    setShowModal(false);
  };

  const filteredUniversities = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.ugcCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Universities Management</h1>
        <p className="page-description">
          Add and manage universities in the system
        </p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search universities..."
            className="form-input"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add University
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UGC Code</th>
              <th>State</th>
              <th>Type</th>
              <th>Colleges</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUniversities.map((university) => (
              <tr key={university.id}>
                <td style={{ fontWeight: "600" }}>{university.name}</td>
                <td>{university.ugcCode}</td>
                <td>{university.state}</td>
                <td>{university.type}</td>
                <td>{university.collegeCount}</td>
                <td>{university.studentCount.toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      university.status === "Active" ? "success" : "danger"
                    }`}
                  >
                    {university.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(university)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(university.id)}
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
                {editingUniversity ? "Edit University" : "Add New University"}
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
                <label className="form-label">University Name *</label>
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
                <label className="form-label">UGC Code *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.ugcCode}
                  onChange={(e) =>
                    setFormData({ ...formData, ugcCode: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Type *</label>
                <select
                  className="form-select"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="State">State</option>
                  <option value="Central">Central</option>
                  <option value="Private">Private</option>
                  <option value="Deemed">Deemed</option>
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
                  {editingUniversity ? "Update" : "Add"} University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universities;
