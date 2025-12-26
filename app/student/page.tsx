"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  GraduationCap,
  Shield,
  Bell,
  FileText,
  CheckCircle,
  XCircle,
  Upload,
  Eye,
  Download,
} from "lucide-react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

const allFields = [
  "StudentName",
  "MotherName",
  "FatherName",
  "DateOfBirth",
  "Caste",
  "Gender"
];

export default function StudentPanel() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "profile" | "requests" | "history" | "corrections"
  >("profile");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string>('');

  // Login state
  const [rollNumber, setRollNumber] = useState("");
  const [dob, setDob] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    // Check if student is logged in (you can use localStorage/session)
    const savedStudent = localStorage.getItem("student");
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
      setIsLoggedIn(true);
      loadRequests(JSON.parse(savedStudent).rollNumber);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, dob }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || "Login failed");
        setLoginLoading(false);
        return;
      }

      setStudent(data.student);
      setIsLoggedIn(true);
      localStorage.setItem("student", JSON.stringify(data.student));
      loadRequests(data.student.rollNumber);
      setLoginLoading(false);
    } catch (error) {
      setLoginError("Network error. Please try again.");
      setLoginLoading(false);
    }
  };

  const loadRequests = async (rollNum: string) => {
    try {
      const response = await fetch(
        `/api/student/requests?rollNumber=${rollNum}`
      );
      const data = await response.json();
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error("Failed to load requests:", error);
    }
  };

  const handleRequestAction = async (
    requestId: string,
    action: "approve" | "deny",
    approvedFields: string[]
  ) => {
    try {
      const response = await fetch("/api/student/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action, approvedFields }),
      });

      const data = await response.json();
      if (data.success) {
        loadRequests(student.rollNumber);
        setSelectedFields([]);
        setSelectedRequestId('');
      }
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudent(null);
    setRequests([]);
    localStorage.removeItem("student");
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-6">
              <GraduationCap className="w-16 h-16 mx-auto text-primary-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">
                Student Login
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your credentials to access your academic records
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Roll Number
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your roll number"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Date of Birth
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="DD/MM/YYYY (e.g., 07/01/1988)"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: DD/MM/YYYY (Day/Month/Year)
                </p>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm">{loginError}</div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="btn-primary w-full"
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome, {student?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: "profile", label: "Profile", icon: GraduationCap },
            { id: "requests", label: "Access Requests", icon: Bell },
            { id: "history", label: "Verification History", icon: FileText },
            { id: "corrections", label: "Data Corrections", icon: Upload },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Academic Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Roll Number
                </label>
                <p className="mt-1 text-gray-900 font-semibold">
                  {student?.rollNumber}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Name
                </label>
                <p className="mt-1 text-gray-900 font-semibold">
                  {student?.name}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Date of Birth
                </label>
                <p className="mt-1 text-gray-900">{student?.dob}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  University
                </label>
                <p className="mt-1 text-gray-900">{student?.university}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  College
                </label>
                <p className="mt-1 text-gray-900">{student?.college}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Program
                </label>
                <p className="mt-1 text-gray-900">{student?.program}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Academic Year
                </label>
                <p className="mt-1 text-gray-900">{student?.academicYear}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Result
                </label>
                <p className="mt-1 text-gray-900">
                  {student?.result} - {student?.percentage}% (
                  {student?.division})
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Status
                </label>
                <span
                  className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${
                    student?.status === "REGULAR"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {student?.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Certificate
              </button>
            </div>
          </div>
        )}

        {/* Access Requests Tab */}
        {activeTab === "requests" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">
              Recruiter Access Requests
            </h2>
            {requests.length === 0 ? (
              <p className="text-gray-600">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{req.organizationName}</p>
                        <p className="text-sm text-gray-600">
                          Request Type: {req.requestType}
                        </p>
                        <p className="text-xs text-gray-500">
                          Requested on:{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {req.status === "pending" ? (
                          <>
                            <button
                              onClick={() => {
                                setOpen(true);
                                setSelectedRequestId(req.id);
                              }}
                              className="btn-primary btn-sm flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleRequestAction(req.id, "deny", selectedFields)
                              }
                              className="btn-secondary btn-sm flex items-center gap-1"
                            >
                              <XCircle className="w-4 h-4" />
                              Deny
                            </button>
                          </>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              req.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pop up modal */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      Recruiter request approval
                    </h2>
                    <form className="space-y-4">
                      {/* Checkbox fields for selecting student data */}
                      <div>
                        <label className="text-sm text-gray-600 font-medium block mb-2">
                          Select fields to correct
                        </label>
                        <div className="flex flex-col gap-2">
                          <div>
                            <input
                              type="checkbox"
                              id="selectAll"
                              checked={
                                selectedFields.length === allFields.length &&
                                allFields.length > 0
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFields([...allFields]);
                                } else {
                                  setSelectedFields([]);
                                }
                              }}
                              className="mr-2"
                            />
                            <label
                              htmlFor="selectAll"
                              className="font-semibold cursor-pointer"
                            >
                              Select All
                            </label>
                          </div>
                          {allFields.map((field) => (
                            <div key={field}>
                              <input
                                type="checkbox"
                                id={field}
                                checked={selectedFields.includes(field)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedFields([
                                      ...selectedFields,
                                      field,
                                    ]);
                                  } else {
                                    setSelectedFields(
                                      selectedFields.filter((f) => f !== field)
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor={field} className="cursor-pointer">
                                {field}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    // onClick={() => setOpen(false)}
                    onClick={() => {
                      handleRequestAction(selectedRequestId, "approve", selectedFields);
                      setOpen(false);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpen(false);
                      setSelectedRequestId('');
                      setSelectedFields([]);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        {/* Verification History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Verification History</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Self Verification</p>
                    <p className="text-sm text-gray-600">
                      Verified on: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Corrections Tab */}
        {activeTab === "corrections" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Request Data Correction</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Field to Correct
                </label>
                <select className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3">
                  <option>Name</option>
                  <option>Date of Birth</option>
                  <option>Program</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Description
                </label>
                <textarea
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  rows={4}
                  placeholder="Describe the correction needed..."
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Supporting Documents
                </label>
                <input type="file" className="mt-2 w-full" multiple />
              </div>
              <button type="submit" className="btn-primary">
                Submit Correction Request
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
