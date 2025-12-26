import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Universities from "./pages/Universities";
import Institutions from "./pages/Institutions";
import Admins from "./pages/Admins";
import Recruiters from "./pages/Recruiters";
import DataApprovals from "./pages/DataApprovals";
import StudentDatabase from "./pages/StudentDatabase";
import Analytics from "./pages/Analytics";
import AuditLogs from "./pages/AuditLogs";

function App() {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/approvals" element={<DataApprovals />} />
            <Route path="/students" element={<StudentDatabase />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
