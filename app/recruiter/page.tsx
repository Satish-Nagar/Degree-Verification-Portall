"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, Search, AlertTriangle, CheckCircle, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function RecruiterPanel() {
  const [rollNumber, setRollNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [batch, setBatch] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestAccessLoading, setRequestAccessLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const response = await fetch('/api/recruiter/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNumber, university, batch }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Verification failed');
        setLoading(false);
        return;
      }

      setVerificationResult(data);
      setLoading(false);
    } catch (error) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleRequestAccess = async () => {
    if (!verificationResult) return;

    setRequestAccessLoading(true);
    try {
      const response = await fetch('/api/recruiter/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: verificationResult.verification.rollNumber,
          recruiterId: 'recruiter_123', // Replace with actual recruiter ID from session
          organizationName: 'Your Organization', // Replace with actual org name
          requestType: 'full_details',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Access request submitted successfully! Waiting for student approval.');
      }
    } catch (error) {
      console.error('Failed to request access:', error);
    }
    setRequestAccessLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Briefcase className="w-16 h-16 mx-auto text-primary-600 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Recruiter Verification Portal</h1>
          <p className="text-gray-600 mt-2">Verify student credentials and request access to academic records</p>
        </div>

        {/* Verification Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">Roll Number</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter roll number"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">University</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="University name"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Batch/Year (Optional)</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 2019-2020"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Verifying...' : 'Verify Student'}
            </button>
          </form>
          <Link
              href="/recruiter/recruiter-requests"
              target="_blank"
              className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
            >
              Request Hstory
            </Link>
        </div>

        {/* Verification Results */}
        {verificationResult && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Verification Results</h2>
              {verificationResult.fraudDetected && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Fraud Detected!</span>
                </div>
              )}
            </div>

            {verificationResult.fraudDetected && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">
                  Warning: This roll number appears {verificationResult.duplicateCount} times in the database.
                  Please verify the student details carefully.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm text-gray-600 font-medium">Name</label>
                <p className="mt-1 text-gray-900 font-semibold text-lg">
                  {verificationResult.verification.name}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Roll Number</label>
                <p className="mt-1 text-gray-900 font-semibold">{verificationResult.verification.rollNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Enrollment Year</label>
                <p className="mt-1 text-gray-900">{verificationResult.verification.enrollmentYear}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Program</label>
                <p className="mt-1 text-gray-900">{verificationResult.verification.program}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">University</label>
                <p className="mt-1 text-gray-900">{verificationResult.verification.university}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">College</label>
                <p className="mt-1 text-gray-900">{verificationResult.verification.college}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Result</label>
                <p className="mt-1 text-gray-900">
                  {verificationResult.verification.result} - {verificationResult.verification.percentage}%
                  ({verificationResult.verification.division})
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Verification Status</label>
                <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${
                  verificationResult.verification.verificationStatus === 'Verified'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {verificationResult.verification.verificationStatus}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleRequestAccess}
                disabled={requestAccessLoading}
                className="btn-primary flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {requestAccessLoading ? 'Requesting...' : 'Request Full Academic Details'}
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Verification Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

