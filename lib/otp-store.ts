// Simple in-memory OTP store (use Redis or database in production)
interface OTPData {
  otp: string;
  identifier: string;
  purpose: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

const otpStore = new Map<string, OTPData>();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(identifier: string, purpose: string, otp: string): void {
  const key = `${identifier}:${purpose}`;
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
  otpStore.set(key, {
    otp,
    identifier,
    purpose,
    expiresAt,
    attempts: 0,
    createdAt: Date.now(),
  });
  
  // Clean up expired OTPs after 10 minutes
  setTimeout(() => {
    otpStore.delete(key);
  }, 10 * 60 * 1000);
}

export function verifyOTP(identifier: string, purpose: string, inputOTP: string): { valid: boolean; message: string } {
  const key = `${identifier}:${purpose}`;
  const data = otpStore.get(key);
  
  if (!data) {
    return { valid: false, message: 'OTP not found. Please request a new OTP.' };
  }
  
  if (Date.now() > data.expiresAt) {
    otpStore.delete(key);
    return { valid: false, message: 'OTP has expired. Please request a new OTP.' };
  }
  
  if (data.attempts >= 3) {
    otpStore.delete(key);
    return { valid: false, message: 'Maximum attempts exceeded. Please request a new OTP.' };
  }
  
  data.attempts++;
  
  if (data.otp !== inputOTP) {
    return { valid: false, message: `Invalid OTP. ${3 - data.attempts} attempts remaining.` };
  }
  
  // OTP verified successfully
  otpStore.delete(key);
  return { valid: true, message: 'OTP verified successfully.' };
}

export function getOTPData(identifier: string, purpose: string): OTPData | null {
  const key = `${identifier}:${purpose}`;
  return otpStore.get(key) || null;
}

