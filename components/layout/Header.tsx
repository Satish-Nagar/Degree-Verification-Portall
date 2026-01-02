"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Bell, Phone, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [studentRequests, setStudentRequests] = useState<any[]>([]);
  const [recruiterRequests, setRecruiterRequests] = useState<any[]>([]);
  const [superadminRequests, setSuperadminRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'student' | 'recruiter' | 'superadmin'>('student');
  const [allowedTabs, setAllowedTabs] = useState<Array<'student' | 'recruiter' | 'superadmin'>>([
    'student',
    'recruiter',
    'superadmin',
  ]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);

    loadRequests();
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // detect role from localStorage or pathname and restrict visible tabs
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
      const path = typeof window !== 'undefined' ? window.location.pathname : '';
      const roleFromPath = path.startsWith('/student')
        ? 'student'
        : path.startsWith('/recruiter')
          ? 'recruiter'
          : path.startsWith('/super-admin') || path.startsWith('/super%20admin')
            ? 'superadmin'
            : null;

      const role = (stored as any) || (roleFromPath as any) || null;
      if (role === 'student' || role === 'recruiter' || role === 'superadmin') {
        setAllowedTabs([role]);
        setActiveTab(role);
      } else {
        setAllowedTabs(['student', 'recruiter', 'superadmin']);
      }
    } catch (e) {
      setAllowedTabs(['student', 'recruiter', 'superadmin']);
    }
  }, []);

  const loadRequests = async () => {
    try {
      const response = await fetch("/api/request-notifications");
      const data = await response.json();
      if (data.success) {
        setStudentRequests(data.requests.filter((req: any) => req.status === 'pending'));
        setSuperadminRequests(data.requests);
        setRecruiterRequests(data.requests.filter((req: any) => req.status !== 'pending'));
      }
    } catch (error) {
      console.error("Failed to load requests:", error);
    }
  };

  return (
    <header className="bg-primary-600 text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-gold-500" />
          <span className="text-sm font-medium">Secure Portal</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Emergency Helpline: 1800-XXX-XXXX</span>
          </div>
          <div ref={ref} className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative p-2 hover:bg-primary-700 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 z-50">
                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div className="flex space-x-1">
                    {allowedTabs.includes('student') && (
                      <button
                        onClick={() => setActiveTab('student')}
                        className={`px-3 py-1 rounded ${activeTab === 'student' ? 'bg-primary-600 text-white' : 'text-sm text-gray-600'}`}
                      >
                        Student
                      </button>
                    )}
                    {allowedTabs.includes('recruiter') && (
                      <button
                        onClick={() => setActiveTab('recruiter')}
                        className={`px-3 py-1 rounded ${activeTab === 'recruiter' ? 'bg-primary-600 text-white' : 'text-sm text-gray-600'}`}
                      >
                        Recruiter
                      </button>
                    )}
                    {allowedTabs.includes('superadmin') && (
                      <button
                        onClick={() => setActiveTab('superadmin')}
                        className={`px-3 py-1 rounded ${activeTab === 'superadmin' ? 'bg-primary-600 text-white' : 'text-sm text-gray-600'}`}
                      >
                        Super Admin
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 px-2">Notifications</div>
                </div>

                <div className="p-3 max-h-60 overflow-auto">
                  {activeTab === 'student' && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Student Notifications</div>
                      {/* <div className="text-sm text-gray-600">No student notifications.</div> */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {/* <h2 className="text-2xl font-bold mb-6">
                                    Recruiter Access Requests
                                  </h2> */}
                        {studentRequests.length === 0 ? (
                          <p className="text-gray-600">No pending requests</p>
                        ) : (
                          <div className="space-y-4">
                            {studentRequests.map((req) => (
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
                                        
                                        
                                      </>
                                    ) : (
                                      <span
                                        className={`px-3 py-1 rounded-full text-sm ${req.status === "approved"
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
                    </div>
                  )}

                  {activeTab === 'recruiter' && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Recruiter Notifications</div>
                      {/* <div className="text-sm text-gray-600">You have 2 access requests pending.</div> */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {/* <h2 className="text-2xl font-bold mb-6">
                                    Recruiter Access Requests
                                  </h2> */}
                        {recruiterRequests.length === 0 ? (
                          <p className="text-gray-600">No pending requests</p>
                        ) : (
                          <div className="space-y-4">
                            {recruiterRequests.map((req) => (
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
                                     <p className="text-sm text-gray-600">
                                      Student RollNumber: {req.studentDetails?.rollNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Student Name: {req.studentDetails?.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {req.status === "pending" ? (
                                      <>
                                      </>
                                    ) : (
                                      <span
                                        className={`px-3 py-1 rounded-full text-sm ${req.status === "approved"
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
                    </div>
                  )}

                  {activeTab === 'superadmin' && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Super Admin Notifications</div>
                      {/* <div className="text-sm text-gray-600">System reports: All services operational.</div> */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {/* <h2 className="text-2xl font-bold mb-6">
                          Recruiter Access Requests
                        </h2> */}
                        {superadminRequests.length === 0 ? (
                          <p className="text-gray-600">No pending requests</p>
                        ) : (
                          <div className="space-y-4">
                            {superadminRequests.map((req) => (
                              <div
                                key={req._id}
                                className="border border-gray-200 rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold">{req.organizationName}</p>

                                    <p className="text-xs text-gray-500">
                                      Requested on:{" "}
                                      {new Date(req.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Student RollNumber: {req.studentDetails?.rollNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Student Name: {req.studentDetails?.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm ${req.status === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      {req.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-2 border-t border-gray-100 text-right">
                  <a href="/recruiter/recruiter-requests" className="text-sm text-primary-600 hover:underline">View requests</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

