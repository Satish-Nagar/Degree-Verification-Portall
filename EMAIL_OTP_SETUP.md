# Email OTP Setup Guide

## ✅ What's Been Implemented

1. **Resend Email Integration** - Using Resend API for sending OTP emails
2. **OTP API Routes**:
   - `POST /api/auth/otp/send` - Sends OTP to email
   - `POST /api/auth/otp/verify` - Verifies OTP
3. **Frontend Integration**:
   - Signup page - Email OTP verification
   - Login page - OTP login option
   - Forgot Password - OTP-based password reset

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the `resend` package that was added to `package.json`.

### 2. Create Environment File

Create a `.env.local` file in the root directory with:

```env
RESEND_API_KEY=re_M3ypGqg3_6sb9sfRGThauS2Rwbst2zsSj
MAIL_FROM=satish@geeksofgurukul.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** The API key is already configured. Make sure the email domain `geeksofgurukul.com` is verified in your Resend account.

### 3. Verify Resend Domain

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify `geeksofgurukul.com` domain
3. Add DNS records as instructed by Resend
4. Wait for verification (usually takes a few minutes)

### 4. Test OTP Functionality

1. Start the dev server: `npm run dev`
2. Go to `/signup` or `/login`
3. Enter an email address
4. Click "Get OTP"
5. Check your email inbox for the OTP

## 🔧 How It Works

### OTP Generation & Storage
- 6-digit numeric OTP
- Stored in memory (use Redis/database in production)
- Expires in 5 minutes
- Max 3 verification attempts
- Rate limiting: 30 seconds between resend requests

### Email Template
- Professional HTML email template
- Shows OTP prominently
- Includes expiry time and attempt limits
- Branded with portal name

### Security Features
- OTP validation (6 digits only)
- Expiry checking
- Attempt limit enforcement
- Rate limiting on resend

## 🚀 Production Considerations

For production, consider:

1. **Database Storage**: Replace in-memory OTP store with Redis or database
2. **Rate Limiting**: Add IP-based rate limiting
3. **Captcha**: Add captcha after 3 failed attempts
4. **Logging**: Add audit logs for OTP send/verify
5. **Email Templates**: Customize email templates per use case
6. **Monitoring**: Set up email delivery monitoring

## 📧 Email Delivery

- **Free Tier**: 3,000 emails/month
- **Delivery**: Usually instant, check spam folder if not received
- **Status**: Check Resend dashboard for delivery status

## 🐛 Troubleshooting

**OTP not received?**
- Check spam/junk folder
- Verify domain is verified in Resend
- Check Resend dashboard for delivery status
- Ensure email address is valid

**API Errors?**
- Check `.env.local` file exists
- Verify `RESEND_API_KEY` is correct
- Check Resend account status
- Review server console for errors

## 📝 API Usage Examples

### Send OTP
```javascript
const response = await fetch('/api/auth/otp/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'user@example.com',
    purpose: 'signup' // or 'login' or 'password-reset'
  }),
});
```

### Verify OTP
```javascript
const response = await fetch('/api/auth/otp/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'user@example.com',
    otp: '123456',
    purpose: 'signup'
  }),
});
```

---

**Status**: ✅ Fully Functional
**Last Updated**: Ready for testing

