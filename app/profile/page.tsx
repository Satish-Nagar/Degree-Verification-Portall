"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Upload, Mail, Phone, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Profile & Security</p>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            <button className="btn-primary">Save Profile</button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="w-28 h-28 rounded-full bg-gray-100 border flex items-center justify-center text-gray-500 text-sm mb-3">
                Photo
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </button>
              <p className="text-xs text-gray-500 mt-2">JPG/PNG up to 2MB.</p>
            </div>

            <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
              <Input label="Full Name" required placeholder="Your name" />
              <Input label="Designation" placeholder="For admins" />
              <Input label="Organization / College" placeholder="Org / College name" />
              <Input label="Department" placeholder="Dept (if applicable)" />
              <Input label="Address" placeholder="Address" />
              <Input label="City" placeholder="City" />
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                Email
                <Mail className="w-4 h-4 text-gray-500" />
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                  required
                />
                <button className="btn-secondary whitespace-nowrap" onClick={() => setEmailOtpSent(true)}>
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Email OTP"
              />
              {emailOtpSent && <p className="text-xs text-green-600">OTP sent to email. Expires in 5 minutes.</p>}
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                Phone
                <Phone className="w-4 h-4 text-gray-500" />
              </label>
              <div className="flex gap-3">
                <input
                  type="tel"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+91 98XXXXXX"
                  required
                />
                <button className="btn-secondary whitespace-nowrap" onClick={() => setPhoneOtpSent(true)}>
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Phone OTP"
              />
              {phoneOtpSent && <p className="text-xs text-green-600">OTP sent to phone. Expires in 5 minutes.</p>}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              Security
              <Shield className="w-4 h-4 text-primary-600" />
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Current Password" type="password" required />
              <Input label="New Password" type="password" required />
              <Input label="Confirm Password" type="password" required />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Password must be min 8 chars with uppercase, number, and special character. Captcha and rate limiting to be
              enforced on backend.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Input({
  label,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 font-medium flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-xs">*Required</span>}
      </label>
      <input
        type={type}
        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder={placeholder || label}
        required={required}
      />
    </div>
  );
}

