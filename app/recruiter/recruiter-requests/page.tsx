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

export default function StudentPanel() {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await fetch("/api/recruiter/request-access", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error("Failed to load requests:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              recruter Dashboard
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6">Recruiter Access Requests</h2>

          {requests.length === 0 ? (
            <p className="text-gray-600">No pending requests</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
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
                      {req.status === "approved" ? (
                        <>
                          {/* VIEW BUTTON */}
                          <button
                            onClick={() => {
                              setOpen(true);
                              setSelectedRequest(req);
                            }}
                            className="btn-primary btn-sm flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <span
                            className={
                              "px-3 py-1 rounded-full text-smbg-green-100 text-green-800"
                            }
                          >
                            {req.status}
                          </span>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
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
                    {selectedRequest && (
                      <div className="space-y-4">
                        {!(selectedRequest.approvedFieldsData) || Object.keys(selectedRequest.approvedFieldsData).length === 0 ? (
                          <p className="text-gray-600">
                            No fields have been approved by the student.
                          </p>
                        ) : (
                          <div>
                            <table>
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 text-left text-gray-700">
                                    Field
                                  </th>
                                  <th className="px-4 py-2 text-left text-gray-700">
                                    Value
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(
                                  selectedRequest.approvedFieldsData
                                ).map(([field, value]: [string, any]) => (
                                  <tr key={field}>
                                    <td className="px-4 py-2 font-semibold text-gray-700">
                                      {field}
                                    </td>

                                    <td className="px-4 py-2 text-gray-900">
                                      {value ?? (
                                        <span className="italic text-gray-400">
                                          N/A
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpen(false);
                      setSelectedRequest(null);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>

      <Footer />
    </main>
  );
}
