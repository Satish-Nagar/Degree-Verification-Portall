import React from "react";
import { dashboardStats } from "../utils/mockData";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", verifications: 4200, students: 18000 },
    { month: "Feb", verifications: 5100, students: 22000 },
    { month: "Mar", verifications: 6800, students: 28000 },
    { month: "Apr", verifications: 8500, students: 35000 },
    { month: "May", verifications: 10200, students: 42000 },
    { month: "Jun", verifications: 12800, students: 51000 },
  ];

  const topInstitutions = [
    {
      name: "Lakshmi Narain College of Technology (LNCT)",
      city: "Bhopal",
      verifications: 3250,
    },
    { name: "SGSITS", city: "Indore", verifications: 2890 },
    {
      name: "Madhav Institute of Technology and Science (MITS)",
      city: "Gwalior",
      verifications: 2560,
    },
    {
      name: "Government Holkar Science College",
      city: "Indore",
      verifications: 2120,
    },
    {
      name: "Prestige Institute of Management",
      city: "Indore",
      verifications: 1840,
    },
  ];

  const districtWiseData = [
    {
      district: "Indore",
      institutions: 145,
      students: 285000,
      verifications: 15200,
    },
    {
      district: "Bhopal",
      institutions: 132,
      students: 245000,
      verifications: 13800,
    },
    {
      district: "Gwalior",
      institutions: 98,
      students: 168000,
      verifications: 9500,
    },
    {
      district: "Jabalpur",
      institutions: 87,
      students: 142000,
      verifications: 7800,
    },
    {
      district: "Ujjain",
      institutions: 76,
      students: 128000,
      verifications: 6900,
    },
  ];

  const programWiseVerifications = [
    { program: "B.Tech / B.E.", count: 28500, percentage: 42 },
    { program: "B.Sc / M.Sc", count: 15200, percentage: 22 },
    { program: "B.Com / M.Com", count: 12800, percentage: 19 },
    { program: "MBA / PGDM", count: 8100, percentage: 12 },
    { program: "Others", count: 3290, percentage: 5 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-description">
          Madhya Pradesh Academic Verification Performance Metrics
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Total Verifications</div>
            <div
              className="stat-icon"
              style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}
            >
              ✅
            </div>
          </div>
          <div className="stat-value">
            {dashboardStats.totalVerifications.toLocaleString()}
          </div>
          <div className="stat-change positive">
            +{dashboardStats.monthlyGrowth.verifications}% this month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Active Recruiters</div>
            <div
              className="stat-icon"
              style={{ backgroundColor: "#10b98120", color: "#10b981" }}
            >
              💼
            </div>
          </div>
          <div className="stat-value">{dashboardStats.activeTech}</div>
          <div className="stat-change positive">Across MP</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Student Growth Rate</div>
            <div
              className="stat-icon"
              style={{ backgroundColor: "#f59e0b20", color: "#f59e0b" }}
            >
              📈
            </div>
          </div>
          <div className="stat-value">
            +{dashboardStats.monthlyGrowth.students}%
          </div>
          <div className="stat-change positive">Monthly increase</div>
        </div>
      </div>

      <div className="card">
        <h2
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}
        >
          📊 MP Monthly Verification Trends
        </h2>
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "24px",
              minHeight: "300px",
              padding: "20px 0",
            }}
          >
            {monthlyData.map((data, index) => (
              <div key={index} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: `${(data.verifications / 15000) * 250}px`,
                    background:
                      "linear-gradient(180deg, #c41e3a 0%, #8b0000 100%)",
                    borderRadius: "8px 8px 0 0",
                    marginBottom: "8px",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: "12px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px rgba(196, 30, 58, 0.3)",
                  }}
                  title={`${data.verifications} verifications`}
                >
                  {data.verifications}
                </div>
                <div style={{ fontWeight: "600", color: "#64748b" }}>
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}
        >
          🏆 Top Performing Institutions in Madhya Pradesh
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Institution Name</th>
                <th>City</th>
                <th>Total Verifications</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topInstitutions.map((inst, index) => (
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color:
                          index === 0
                            ? "#ff9933"
                            : index === 1
                            ? "#c0c0c0"
                            : index === 2
                            ? "#cd7f32"
                            : "#64748b",
                      }}
                    >
                      #{index + 1}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{inst.name}</td>
                  <td>{inst.city}</td>
                  <td>{inst.verifications.toLocaleString()}</td>
                  <td>
                    <div
                      style={{
                        width: "100%",
                        background: "#e2e8f0",
                        borderRadius: "8px",
                        height: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            (inst.verifications /
                              topInstitutions[0].verifications) *
                            100
                          }%`,
                          background:
                            "linear-gradient(90deg, #c41e3a 0%, #ff9933 100%)",
                          height: "100%",
                          borderRadius: "8px",
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}
        >
          🗺️ District-wise Performance in Madhya Pradesh
        </h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>District</th>
                <th>Total Institutions</th>
                <th>Enrolled Students</th>
                <th>Verifications</th>
                <th>Activity Rate</th>
              </tr>
            </thead>
            <tbody>
              {districtWiseData.map((district, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "600" }}>{district.district}</td>
                  <td>{district.institutions}</td>
                  <td>{district.students.toLocaleString()}</td>
                  <td>{district.verifications.toLocaleString()}</td>
                  <td>
                    <span className="badge success">
                      {(
                        (district.verifications / district.students) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}
        >
          📚 Program-wise Verification Distribution
        </h2>
        <div style={{ padding: "20px 0" }}>
          {programWiseVerifications.map((program, index) => (
            <div key={index} style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontWeight: "600", color: "#212121" }}>
                  {program.program}
                </span>
                <span style={{ fontWeight: "600", color: "#c41e3a" }}>
                  {program.count.toLocaleString()} ({program.percentage}%)
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  background: "#e2e8f0",
                  borderRadius: "8px",
                  height: "12px",
                }}
              >
                <div
                  style={{
                    width: `${program.percentage * 2}%`,
                    background:
                      "linear-gradient(90deg, #c41e3a 0%, #ff9933 100%)",
                    height: "100%",
                    borderRadius: "8px",
                    transition: "width 0.3s",
                    boxShadow: "0 2px 6px rgba(196, 30, 58, 0.3)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
