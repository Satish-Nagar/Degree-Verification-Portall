import React, { useState } from "react";
import { mockAuditLogs } from "../utils/mockData";

const AuditLogs = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("All");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterAction === "All" || log.action === filterAction;

    return matchesSearch && matchesFilter;
  });

  const uniqueActions = [...new Set(logs.map((log) => log.action))];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Audit Logs</h1>
        <p className="page-description">
          System activity tracking and security monitoring
        </p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            placeholder="Search logs..."
            className="form-input"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="All">All Actions</option>
            {uniqueActions.map((action, index) => (
              <option key={index} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary">📥 Export Logs</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px", padding: "16px" }}>
        <div style={{ display: "flex", gap: "24px", fontSize: "14px" }}>
          <div>
            <strong>Total Logs:</strong> {logs.length}
          </div>
          <div>
            <strong>Filtered Results:</strong> {filteredLogs.length}
          </div>
          <div>
            <strong>Success Rate:</strong>{" "}
            {Math.round(
              (logs.filter((l) => l.status === "Success").length /
                logs.length) *
                100
            )}
            %
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontFamily: "monospace", fontSize: "13px" }}>
                  {log.timestamp}
                </td>
                <td style={{ fontWeight: "600" }}>{log.user}</td>
                <td>
                  <span className="badge info">{log.action}</span>
                </td>
                <td>{log.details}</td>
                <td style={{ fontFamily: "monospace", fontSize: "13px" }}>
                  {log.ipAddress}
                </td>
                <td>
                  <span
                    className={`badge ${
                      log.status === "Success" ? "success" : "danger"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
