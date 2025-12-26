import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Twilio } from 'twilio';
import { generateOTP, storeOTP, getOTPData } from '@/lib/otp-store';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;
const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = twilioAccountSid && twilioAuthToken ? new Twilio(twilioAccountSid, twilioAuthToken) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, phone, purpose = 'signup' } = await request.json();

    const recipient = resolveRecipient(email, phone);

    if (!recipient.valid) {
      return NextResponse.json(
        { error: recipient.error },
        { status: 400 }
      );
    }

    // Check if OTP was sent recently (rate limiting - 30 seconds)
    const existingData = getOTPData(recipient.key, purpose);
    if (existingData && Date.now() - existingData.createdAt < 30000) {
      const waitTime = Math.ceil((30000 - (Date.now() - existingData.createdAt)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitTime} seconds before requesting a new OTP.` },
        { status: 429 }
      );
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(recipient.key, purpose, otp);

    if (recipient.type === 'email') {
      if (!resend) {
        console.error('Missing Resend API key. Set RESEND_API_KEY in environment.');
        return NextResponse.json({ error: 'Email provider not configured. Please contact support.' }, { status: 500 });
      }

      const { error } = await resend.emails.send({
        from: process.env.MAIL_FROM || 'onboarding@resend.dev',
        to: recipient.value,
        subject: 'Your Verification Code - Academic Verification Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0066cc;">Verification Code</h2>
            <p>Your OTP for ${getPurposeLabel(purpose)} is:</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #0066cc; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #666;">This OTP will expire in <strong>5 minutes</strong>.</p>
          <p style="color: #666;">Maximum attempts: <strong>3</strong></p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Government Academic Verification Portal</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
          { error: 'Failed to send OTP email. Please try again.' },
        { status: 500 }
      );
      }
    } else {
      const smsResult = await sendSmsOTP(recipient.value, otp, purpose);
      if (!smsResult.ok) {
        return NextResponse.json({ error: smsResult.error }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to your ${recipient.type === 'email' ? 'email' : 'mobile number'}.`,
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function resolveRecipient(email?: string, phone?: string): { valid: boolean; key: string; value: string; type: 'email' | 'phone'; error?: string } {
  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedPhone = phone?.toString().trim();

  if (trimmedPhone) {
    const normalized = normalizePhone(trimmedPhone);
    if (!normalized) {
      return { valid: false, key: '', value: '', type: 'phone', error: 'Valid phone number is required (10-15 digits).' };
    }
    return { valid: true, key: `phone:${normalized}`, value: normalized, type: 'phone' };
  }

  if (trimmedEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
    return { valid: true, key: `email:${trimmedEmail}`, value: trimmedEmail, type: 'email' };
  }

  return { valid: false, key: '', value: '', type: 'email', error: 'Provide a valid email or phone number to receive OTP.' };
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

function getPurposeLabel(purpose: string): string {
  if (purpose === 'signup') return 'account creation';
  if (purpose === 'login') return 'login';
  if (purpose === 'password-reset') return 'password reset';
  return 'verification';
}

async function sendSmsOTP(phone: string, otp: string, purpose: string): Promise<{ ok: boolean; error?: string }> {
  if (!twilioClient) {
    console.error('Twilio credentials not configured.');
    return { ok: false, error: 'SMS provider not configured. Please contact support.' };
  }

  const from = twilioMessagingServiceSid || twilioFromNumber;
  if (!from) {
    console.error('Twilio from number or messaging service SID missing.');
    return { ok: false, error: 'SMS sender not configured. Please contact support.' };
  }

  try {
    await twilioClient.messages.create({
      to: phone,
      from: twilioMessagingServiceSid ? undefined : from,
      messagingServiceSid: twilioMessagingServiceSid || undefined,
      body: `Your ${getPurposeLabel(purpose)} OTP is ${otp}. It will expire in 5 minutes.`,
    });
    return { ok: true };
  } catch (error) {
    console.error('Twilio SMS error:', error);
    return { ok: false, error: 'Failed to send OTP via SMS. Please try again.' };
  }
}

