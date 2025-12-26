import React from "react";
import { NavLink } from "react-router-dom";
import mpLogo from "../../assets/mp-govt-logo.png"; // Import logo
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/universities", icon: "🏛️", label: "Universities" },
    { path: "/institutions", icon: "🏫", label: "Institutions" },
    { path: "/admins", icon: "👤", label: "Admins" },
    { path: "/recruiters", icon: "💼", label: "Recruiters" },
    { path: "/approvals", icon: "✅", label: "Approvals" },
    { path: "/students", icon: "🎓", label: "Student Database" },
    { path: "/analytics", icon: "📈", label: "Analytics" },
    { path: "/audit-logs", icon: "📋", label: "Audit Logs" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* MP Government Logo */}
        <div className="mp-logo">
          <div className="logo-emblem">
            <img
              src={mpLogo}
              alt="MP Government Logo"
              style={{
                width: "56px",
                height: "56px",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              }}
            />
          </div>
          <div className="logo-text">
            <h2 className="sidebar-title">Super Admin Panel</h2>
            <p className="sidebar-subtitle-hindi">मध्य प्रदेश सरकार</p>
            <p className="sidebar-subtitle">Government of Madhya Pradesh</p>
          </div>
        </div>

        {/* MP State Motto */}
        <div className="mp-motto">
          <div className="motto-icon">🎯</div>
          <div className="motto-text">
            <div className="motto-hindi">
              मध्य प्रदेश: सत्यापित शिक्षा से विश्वसनीय रोजगार
            </div>
            <div className="motto-english">
              Madhya Pradesh: Verified Education for Trusted Employment
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="admin-info">
          <div className="admin-avatar">MSB</div>
          <div className="admin-details">
            <div className="admin-name">Mriganka Shekhar Barman</div>
            <div className="admin-role">Super Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
