import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp-store';

export async function POST(request: NextRequest) {
  try {
    const { email, phone, otp, purpose = 'signup' } = await request.json();

    const recipient = resolveRecipient(email, phone);

    if (!recipient.valid) {
      return NextResponse.json(
        { error: recipient.error },
        { status: 400 }
      );
    }

    if (!otp) {
      return NextResponse.json(
        { error: 'OTP is required' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'OTP must be 6 digits' },
        { status: 400 }
      );
    }

    const result = verifyOTP(recipient.key, purpose, otp);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function resolveRecipient(email?: string, phone?: string): { valid: boolean; key: string; error?: string } {
  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedPhone = phone?.toString().trim();

  if (trimmedPhone) {
    const normalized = normalizePhone(trimmedPhone);
    if (!normalized) {
      return { valid: false, key: '', error: 'Valid phone number is required (10-15 digits).' };
    }
    return { valid: true, key: `phone:${normalized}` };
  }

  if (trimmedEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
    return { valid: true, key: `email:${trimmedEmail}` };
  }

  return { valid: false, key: '', error: 'Provide a valid email or phone number to verify OTP.' };
}

function normalizePhone(raw: string): string | null {
  const digitsOnly = raw.replace(/[^\d]/g, '');
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }
  if (digitsOnly.length >= 11 && digitsOnly.length <= 15) {
    return `+${digitsOnly}`;
  }
  return null;
}

