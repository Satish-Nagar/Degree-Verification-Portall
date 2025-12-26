import React from "react";
import { dashboardStats, mockAuditLogs } from "../utils/mockData";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Universities",
      value: dashboardStats.totalUniversities,
      change: `+${dashboardStats.monthlyGrowth.universities}%`,
      icon: "🏛️",
      color: "#3b82f6",
    },
    {
      label: "Total Institutions",
      value: dashboardStats.totalInstitutions.toLocaleString(),
      change: `+${dashboardStats.monthlyGrowth.institutions}%`,
      icon: "🏫",
      color: "#10b981",
    },
    {
      label: "Total Students",
      value: (dashboardStats.totalStudents / 1000000).toFixed(2) + "M",
      change: `+${dashboardStats.monthlyGrowth.students}%`,
      icon: "🎓",
      color: "#f59e0b",
    },
    {
      label: "Total Verifications",
      value: dashboardStats.totalVerifications.toLocaleString(),
      change: `+${dashboardStats.monthlyGrowth.verifications}%`,
      icon: "✅",
      color: "#8b5cf6",
    },
    {
      label: "Pending Approvals",
      value: dashboardStats.pendingApprovals,
      change: "Requires attention",
      icon: "⏳",
      color: "#ef4444",
    },
    {
      label: "Active Recruiters",
      value: dashboardStats.activeTech,
      change: "This month",
      icon: "💼",
      color: "#06b6d4",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Overview of the verification portal system
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-label">{stat.label}</div>
              <div
                className="stat-icon"
                style={{
                  backgroundColor: stat.color + "20",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change positive">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2
          style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}
        >
          Recent Activity
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditLogs.slice(0, 5).map((log) => (
                <tr key={log.id}>
                  <td>{log.timestamp}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                  <td>
                    <span className="badge success">{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
