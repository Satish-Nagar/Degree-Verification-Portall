"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Building2, GraduationCap, Briefcase, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';

const roles = [
  { id: 'super-admin', label: 'Super Admin', icon: Shield, description: 'University / Education Board' },
  { id: 'institution-admin', label: 'Institution Admin', icon: Building2, description: 'College / Institution' },
  { id: 'student', label: 'Student', icon: GraduationCap, description: 'Academic Records Access' },
  { id: 'recruiter', label: 'Recruiter', icon: Briefcase, description: 'Organization / Company' },
];

export default function LoginPage() {
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
  const [showPassword, setShowPassword] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setInterval(() => setOtpTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [otpTimer]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary-600">Access Portal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Login to your account</h1>
          <p className="text-gray-600 mt-2">Choose your role to continue</p>
        </div>

        {/* Role selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = role.id === selectedRole;
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
                    <p className="text-xs text-gray-500">{role.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-sm text-gray-600 font-medium">Email or Mobile</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com or +91XXXXXXXXXX"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded-full inline-flex items-center gap-2">
                  <KeyRound className="w-4 h-4" /> Use {useOtp ? 'OTP' : 'Password'}
                </span>
                <button
                  type="button"
                  onClick={() => setUseOtp((v) => !v)}
                  className="text-primary-600 hover:underline"
                >
                  Switch to {useOtp ? 'Password' : 'OTP'}
                </button>
              </div>
            </div>

            {!useOtp && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="text-xs text-primary-600 hover:underline inline-flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {useOtp && (
              <div className="grid md:grid-cols-3 gap-3 items-end">
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  OTP (6 digits) {otpSent && <span className="text-green-600 text-xs">Sent</span>}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                <p className="text-xs text-gray-500 mt-1">
                  {otpSent
                    ? `OTP sent. Expires in 5 minutes. ${otpTimer > 0 ? `Resend in ${otpTimer}s` : 'You can resend now.'}`
                    : 'Expires in 5 minutes. Max attempts: 3. Resend after 30s.'}
                </p>
                {otpSuccess && <p className="text-xs text-green-600 mt-1">{otpSuccess}</p>}
                {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
                </div>
                <button
                  type="button"
                onClick={async () => {
                  const payload = buildOtpPayload(contact);
                  if (!payload) {
                    setOtpError('Enter a valid email address or phone number first');
                    return;
                  }
                  
                  setLoading(true);
                  setOtpError(null);
                  setOtpSuccess(null);
                  
                  try {
                    const response = await fetch('/api/auth/otp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...payload, purpose: 'login' }),
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
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Remember me
              </label>
              <button className="text-primary-600 hover:underline" type="button">Forgot password?</button>
            </div>

            <button className="btn-primary w-full text-center">Login as {roles.find(r => r.id === selectedRole)?.label}</button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href={`/signup?role=${selectedRole}`} className="text-primary-600 font-semibold hover:underline">
                Create account
              </Link>
            </p>
            <p className="text-center text-sm text-primary-600">
              <Link href="/forgot-password" className="font-semibold hover:underline">
                Forgot Password?
              </Link>
            </p>
            <p className="text-center text-xs text-gray-600">
              By continuing you agree to our{' '}
              <Link href="/terms" className="text-primary-600 hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function buildOtpPayload(value: string): { email?: string; phone?: string } | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
    return { email: trimmed.toLowerCase() };
  }

  const normalizedPhone = normalizePhoneInput(trimmed);
  if (normalizedPhone) {
    return { phone: normalizedPhone };
  }

  return null;
}

function normalizePhoneInput(raw: string): string | null {
  const digitsOnly = raw.replace(/[^\d]/g, '');
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }
  if (digitsOnly.length >= 11 && digitsOnly.length <= 15) {
    return `+${digitsOnly}`;
  }
  return null;
}

