"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-600">These are placeholder terms. Replace with your official policy.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>Use of the portal is subject to applicable laws and regulations.</li>
          <li>Data uploads must be accurate and authorized by the institution.</li>
          <li>Verification and audit activities are logged for security.</li>
          <li>Account access is role-based and must be protected with strong passwords/OTP.</li>
        </ul>
      </div>
    </main>
  );
}

