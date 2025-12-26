"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, KeyRound, ShieldCheck } from 'lucide-react';

type Step = 'email' | 'otp' | 'reset' | 'success';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
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
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary-600">Account Recovery</p>
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
            <p className="text-gray-600 mt-2">Complete the 3-step verification to reset your password.</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <StepBadge active step="1" label="Email" />
            <StepBadge active={step !== 'email'} step="2" label="OTP" />
            <StepBadge active={step === 'reset' || step === 'success'} step="3" label="Reset" />
          </div>

          {step === 'email' && (
            <div className="space-y-4">
              <label className="text-sm text-gray-600 font-medium">Registered Email ID</label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {otpError && <p className="text-xs text-red-600">{otpError}</p>}
              {otpSuccess && <p className="text-xs text-green-600">{otpSuccess}</p>}
              <button
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={async () => {
                  if (!email || !email.includes('@')) {
                    setOtpError('Please enter a valid email address');
                    return;
                  }
                  
                  setLoading(true);
                  setOtpError(null);
                  setOtpSuccess(null);
                  
                  try {
                    const response = await fetch('/api/auth/otp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, purpose: 'password-reset' }),
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
                    setStep('otp');
                    setLoading(false);
                  } catch (error) {
                    setOtpError('Network error. Please try again.');
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                <Mail className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <p className="text-xs text-gray-500">We will email a 6-digit OTP. Expires in 5 minutes. Max attempts: 3.</p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                Enter OTP {otpSent && <span className="text-green-600 text-xs">Sent</span>}
              </label>
              <input
                type="text"
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 tracking-widest text-center"
                placeholder="000000"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Expiry: 5 minutes</span>
                <span>Max attempts: 3</span>
              </div>
              {otpError && <p className="text-xs text-red-600">{otpError}</p>}
              {otpSuccess && <p className="text-xs text-green-600">{otpSuccess}</p>}
              <div className="flex gap-3">
                <button 
                  className={`btn-secondary w-full ${otpTimer > 0 || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={otpTimer > 0 || loading}
                  onClick={async () => {
                    setLoading(true);
                    setOtpError(null);
                    setOtpSuccess(null);
                    
                    try {
                      const response = await fetch('/api/auth/otp/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, purpose: 'password-reset' }),
                      });
                      
                      const data = await response.json();
                      
                      if (!response.ok) {
                        setOtpError(data.error || 'Failed to send OTP');
                        setLoading(false);
                        return;
                      }
                      
                      setOtpTimer(30);
                      setOtpSuccess(data.message || 'OTP resent successfully!');
                      setLoading(false);
                    } catch (error) {
                      setOtpError('Network error. Please try again.');
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? 'Sending...' : otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                </button>
                <button 
                  className="btn-primary w-full" 
                  onClick={async () => {
                    if (!otp || otp.length !== 6) {
                      setOtpError('Please enter a valid 6-digit OTP');
                      return;
                    }
                    
                    setLoading(true);
                    setOtpError(null);
                    
                    try {
                      const response = await fetch('/api/auth/otp/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, otp, purpose: 'password-reset' }),
                      });
                      
                      const data = await response.json();
                      
                      if (!response.ok) {
                        setOtpError(data.error || 'Invalid OTP');
                        setLoading(false);
                        return;
                      }
                      
                      setOtpSuccess('OTP verified successfully!');
                      setStep('reset');
                      setLoading(false);
                    } catch (error) {
                      setOtpError('Network error. Please try again.');
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </div>
            </div>
          )}

          {step === 'reset' && (
            <div className="space-y-4">
              <label className="text-sm text-gray-600 font-medium">New Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Min 8 chars, uppercase, number, special char"
                required
              />
              <label className="text-sm text-gray-600 font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Re-enter password"
                required
              />
              <button className="btn-primary w-full" onClick={() => setStep('success')}>
                Reset Password
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-lg font-semibold text-gray-900">Password has been reset successfully.</p>
              <p className="text-sm text-gray-600">Please login with your new credentials.</p>
              <a href="/login" className="btn-primary inline-flex justify-center">
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function StepBadge({ step, label, active }: { step: string; label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          active ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        {step}
      </span>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

