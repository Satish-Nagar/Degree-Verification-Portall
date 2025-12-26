import React, { useState } from "react";
import {
  mockPendingApprovals,
  mockCorrectionRequests,
} from "../utils/mockData";

const DataApprovals = () => {
  const [activeTab, setActiveTab] = useState("uploads");
  const [uploads, setUploads] = useState(mockPendingApprovals);
  const [corrections, setCorrections] = useState(mockCorrectionRequests);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleApprove = (id, type) => {
    if (type === "upload") {
      if (confirm("Are you sure you want to approve this data upload?")) {
        setUploads(
          uploads.map((u) => (u.id === id ? { ...u, status: "Approved" } : u))
        );
        alert("✅ Data upload approved successfully!");
      }
    } else {
      if (
        confirm("Are you sure you want to approve this correction request?")
      ) {
        setCorrections(
          corrections.map((c) =>
            c.id === id ? { ...c, status: "Approved" } : c
          )
        );
        alert("✅ Correction request approved successfully!");
      }
    }
  };

  const handleReject = (id, type) => {
    const reason = prompt("Please enter rejection reason:");
    if (reason) {
      if (type === "upload") {
        setUploads(
          uploads.map((u) => (u.id === id ? { ...u, status: "Rejected" } : u))
        );
      } else {
        setCorrections(
          corrections.map((c) =>
            c.id === id ? { ...c, status: "Rejected" } : c
          )
        );
      }
      alert("❌ Request rejected!");
    }
  };

  const viewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Data Approvals</h1>
        <p className="page-description">
          Review and approve data uploads and correction requests
        </p>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            borderBottom: "2px solid #e2e8f0",
            marginBottom: "20px",
          }}
        >
          <button
            className={`btn ${
              activeTab === "uploads" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveTab("uploads")}
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            📁 Bulk Data Uploads (
            {uploads.filter((u) => u.status === "Pending").length})
          </button>
          <button
            className={`btn ${
              activeTab === "corrections" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveTab("corrections")}
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            ✏️ Correction Requests (
            {corrections.filter((c) => c.status === "Pending").length})
          </button>
        </div>

        {activeTab === "uploads" && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>File Name</th>
                  <th>Records</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id}>
                    <td style={{ fontWeight: "600" }}>
                      {upload.institutionName}
                    </td>
                    <td>{upload.uploadedBy}</td>
                    <td>{upload.uploadDate}</td>
                    <td>{upload.fileName}</td>
                    <td>{upload.recordCount}</td>
                    <td>
                      <span
                        className={`badge ${
                          upload.status === "Pending"
                            ? "pending"
                            : upload.status === "Approved"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {upload.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm"
                          onClick={() => viewDetails(upload)}
                          style={{ background: "#6366f1", color: "white" }}
                        >
                          👁️ View
                        </button>
                        {upload.status === "Pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleApprove(upload.id, "upload")}
                            >
                              ✅ Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleReject(upload.id, "upload")}
                            >
                              ❌ Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "corrections" && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Institution</th>
                  <th>Request Type</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {corrections.map((correction) => (
                  <tr key={correction.id}>
                    <td style={{ fontWeight: "600" }}>
                      {correction.studentName}
                    </td>
                    <td>{correction.rollNumber}</td>
                    <td>{correction.institutionName}</td>
                    <td>{correction.requestType}</td>
                    <td style={{ color: "#ef4444" }}>{correction.oldValue}</td>
                    <td style={{ color: "#10b981" }}>{correction.newValue}</td>
                    <td>{correction.requestDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          correction.status === "Pending"
                            ? "pending"
                            : correction.status === "Approved"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {correction.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm"
                          onClick={() => viewDetails(correction)}
                          style={{ background: "#6366f1", color: "white" }}
                        >
                          👁️ View
                        </button>
                        {correction.status === "Pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleApprove(correction.id, "correction")
                              }
                            >
                              ✅ Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleReject(correction.id, "correction")
                              }
                            >
                              ❌ Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDetailModal && selectedItem && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {selectedItem.fileName
                  ? "Upload Details"
                  : "Correction Request Details"}
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "20px 0" }}>
              {selectedItem.fileName ? (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Institution:</strong> {selectedItem.institutionName}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Uploaded By:</strong> {selectedItem.uploadedBy}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>File Name:</strong> {selectedItem.fileName}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Total Records:</strong> {selectedItem.recordCount}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Upload Date:</strong> {selectedItem.uploadDate}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        selectedItem.status === "Pending"
                          ? "pending"
                          : selectedItem.status === "Approved"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {selectedItem.status}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Student Name:</strong> {selectedItem.studentName}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Roll Number:</strong> {selectedItem.rollNumber}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Institution:</strong> {selectedItem.institutionName}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Request Type:</strong> {selectedItem.requestType}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Old Value:</strong>{" "}
                    <span style={{ color: "#ef4444" }}>
                      {selectedItem.oldValue}
                    </span>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>New Value:</strong>{" "}
                    <span style={{ color: "#10b981" }}>
                      {selectedItem.newValue}
                    </span>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Documents:</strong>{" "}
                    {selectedItem.documents.join(", ")}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <strong>Request Date:</strong> {selectedItem.requestDate}
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataApprovals;
