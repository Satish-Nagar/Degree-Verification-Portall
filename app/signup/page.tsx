"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Building2, GraduationCap, Briefcase, Upload, Mail } from 'lucide-react';

const roles = [
  { id: 'super-admin', label: 'Super Admin', icon: Shield },
  { id: 'institution-admin', label: 'Institution Admin', icon: Building2 },
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'recruiter', label: 'Recruiter', icon: Briefcase },
];

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState('super-admin');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const role = params.get('role');
      if (role) setSelectedRole(role);
    } catch (e) {
      // ignore in non-browser environments
    }
  }, []);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setInterval(() => setOtpTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [otpTimer]);

  const roleFields: Record<
    string,
    { label: string; placeholder?: string; type?: string; required?: boolean; textarea?: boolean; select?: string[] }[]
  > = {
    'super-admin': [
      { label: 'Full Name', required: true },
      { label: 'Designation', required: true, placeholder: 'Registrar / Controller / Director' },
      { label: 'Phone Number', required: true, type: 'tel', placeholder: '10 digits' },
      { label: 'Email ID', required: true, type: 'email' },
      { label: 'Password', required: true, type: 'password' },
      { label: 'Confirm Password', required: true, type: 'password' },
    ],
    'institution-admin': [
      { label: 'University / College Name', required: true },
      { label: 'Institution Code', required: true },
      { label: 'Admin Full Name', required: true },
      { label: 'Official Email ID', required: true, type: 'email' },
      { label: 'Phone Number', required: true, type: 'tel', placeholder: '10 digits' },
      { label: 'Address', required: true, textarea: true },
      { label: 'Password', required: true, type: 'password' },
      { label: 'Confirm Password', required: true, type: 'password' },
    ],
    student: [
      { label: 'Student Name', required: true },
      { label: 'Roll Number', required: true },
      { label: 'Date of Birth', required: true, type: 'date' },
      { label: 'Phone Number', required: true, type: 'tel', placeholder: '10 digits' },
      { label: 'Batch / Year', required: true, select: ['2021', '2022', '2023', '2024'] },
      { label: 'Course / Branch', required: true, select: ['CSE', 'ECE', 'ME', 'CE', 'MBA'] },
      { label: 'Email ID', required: true, type: 'email' },
      { label: 'Password', required: true, type: 'password' },
    ],
    recruiter: [
      { label: 'Organization Name', required: true },
      { label: 'Company Type', required: true, select: ['IT', 'Consulting', 'Manufacturing', 'Finance', 'Other'] },
      { label: 'HR / Contact Person Name', required: true },
      { label: 'Official Email ID', required: true, type: 'email' },
      { label: 'Phone Number', required: true, type: 'tel', placeholder: '10 digits' },
      { label: 'Company Address', required: true, textarea: true },
      { label: 'Password', required: true, type: 'password' },
      { label: 'Confirm Password', required: true, type: 'password' },
      { label: 'Website / LinkedIn', required: false },
    ],
  };

  const currentFields = roleFields[selectedRole] || roleFields['super-admin'];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary-600">Create Account</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Sign up to continue</h1>
          <p className="text-gray-600 mt-2">Select your role and complete onboarding</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-xl border p-4 text-left transition-all card-hover ${
                  isActive ? 'border-primary-500 shadow-lg bg-primary-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-primary-500 text-white' : 'bg-gray-100 text-primary-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{role.label}</p>
                    <p className="text-xs text-gray-500">Onboarding for {role.label}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="grid md:grid-cols-2 gap-4">
            {currentFields.map((field) => (
              <div key={field.label} className={field.textarea ? 'md:col-span-2' : ''}>
                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  {field.label}
                  {field.required && <span className="text-red-500 text-xs">*Required</span>}
                </label>
                {field.select ? (
                  <select
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required={field.required}
                    value={formData[field.label] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  >
                    <option value="">Select</option>
                    {field.select.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.textarea ? (
                  <textarea
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.label] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={field.placeholder || field.label}
                    required={field.required}
                    value={formData[field.label] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  />
                )}
              </div>
            ))}

            {/* Profile photo / logo upload */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                Profile Photo / Logo
                <span className="text-red-500 text-xs">*Required</span>
              </label>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 border flex items-center justify-center text-gray-500 text-xs">
                  {fileName ? 'Added' : 'Auto'}
                </div>
                <label className="btn-secondary flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  {fileName ? 'Change Photo' : 'Upload'}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
                {fileName && <span className="text-xs text-gray-600 truncate max-w-[120px]">{fileName}</span>}
              </div>
            </div>

            {/* Email OTP */}
            <div className="md:col-span-2 grid md:grid-cols-3 gap-3 items-end">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  Email OTP (6 digits) {otpSent && <span className="text-green-600 text-xs">Sent</span>}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter OTP"
                  required
                  value={formData['OTP'] || ''}
                  onChange={(e) => setFormData({ ...formData, OTP: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {otpSent
                    ? `OTP sent to email. Expires in 5 minutes. ${otpTimer > 0 ? `Resend in ${otpTimer}s` : 'You can resend now.'}`
                    : 'Expires in 5 minutes. Max attempts: 3. Resend after 30s.'}
                </p>
                {otpSuccess && <p className="text-xs text-green-600 mt-1">{otpSuccess}</p>}
                {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
              </div>
              <button
                type="button"
                onClick={async () => {
                  const email = formData['Email ID'] || formData['Official Email ID'] || formData['Email'];
                  if (!email || !email.includes('@')) {
                    setOtpError('Please enter a valid email address first');
                    return;
                  }
                  
                  setLoading(true);
                  setOtpError(null);
                  setOtpSuccess(null);
                  
                  try {
                    const response = await fetch('/api/auth/otp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, purpose: 'signup' }),
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                      setOtpError(data.error || 'Failed to send OTP');
                      setLoading(false);
                      return;
                    }
                    
                    setOtpSent(true);
                    setOtpTimer(30);
                    setOtpSuccess(data.message || 'OTP sent successfully!');
                    setLoading(false);
                  } catch (error) {
                    setOtpError('Network error. Please try again.');
                    setLoading(false);
                  }
                }}
                disabled={otpTimer > 0 || loading}
                className={`btn-secondary w-full flex items-center justify-center gap-2 ${otpTimer > 0 || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <Mail className="w-4 h-4" />
                {loading ? 'Sending...' : otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Get OTP'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" required /> I agree to the{' '}
            <Link href="/terms" className="text-primary-600 font-semibold hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-600 font-semibold hover:underline">
              Privacy Policy
            </Link>
          </div>

          <button className="btn-primary w-full mt-6">Create account as {roles.find(r => r.id === selectedRole)?.label}</button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href={`/login?role=${selectedRole}`} className="text-primary-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

