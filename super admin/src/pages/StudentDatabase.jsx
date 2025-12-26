import React, { useState } from "react";
import { mockStudents } from "../utils/mockData";

const StudentDatabase = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const viewStudent = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.institutionName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "All" || s.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Student Database</h1>
        <p className="page-description">
          View and manage verified student records
        </p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search by name, roll number..."
            className="form-input"
            style={{ width: "350px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select"
            style={{ width: "150px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary">📤 Export Data</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px", padding: "16px" }}>
        <div style={{ display: "flex", gap: "24px", fontSize: "14px" }}>
          <div>
            <strong>Total Students:</strong> {students.length.toLocaleString()}
          </div>
          <div>
            <strong>Filtered Results:</strong> {filteredStudents.length}
          </div>
          <div>
            <strong>Verified:</strong>{" "}
            {students.filter((s) => s.verificationStatus === "Verified").length}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Institution</th>
              <th>Program</th>
              <th>Enrollment Year</th>
              <th>Status</th>
              <th>Verification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ fontWeight: "600", fontFamily: "monospace" }}>
                  {student.rollNumber}
                </td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.institutionName}</td>
                <td>{student.program}</td>
                <td>{student.enrollmentYear}</td>
                <td>
                  <span
                    className={`badge ${
                      student.status === "Active"
                        ? "success"
                        : student.status === "Graduated"
                        ? "info"
                        : "danger"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      student.verificationStatus === "Verified"
                        ? "success"
                        : "pending"
                    }`}
                  >
                    {student.verificationStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => viewStudent(student)}
                  >
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && selectedStudent && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Student Details</h2>
              <button
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "20px 0" }}>
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>
                  Personal Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <strong>Roll Number:</strong> {selectedStudent.rollNumber}
                  </div>
                  <div>
                    <strong>Name:</strong> {selectedStudent.name}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong> {selectedStudent.dob}
                  </div>
                  <div>
                    <strong>Enrollment Year:</strong>{" "}
                    {selectedStudent.enrollmentYear}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>
                  Academic Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <strong>Institution:</strong>{" "}
                    {selectedStudent.institutionName}
                  </div>
                  <div>
                    <strong>Program:</strong> {selectedStudent.program}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        selectedStudent.status === "Active"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                  <div>
                    <strong>Verification:</strong>{" "}
                    <span
                      className={`badge ${
                        selectedStudent.verificationStatus === "Verified"
                          ? "success"
                          : "pending"
                      }`}
                    >
                      {selectedStudent.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary">
                📄 Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDatabase;
