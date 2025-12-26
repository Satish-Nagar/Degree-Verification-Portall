# Government Academic Verification Portal

A modern, role-based academic credential verification portal built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for universities, students, and recruiters, it allows secure, OTP-based authentication, role-based dashboards, and smooth verification workflows.

---

## 🚀 Features

### Core Features

* **Role-based Access**: Super Admin, Institution Admin, Student, Recruiter
* **OTP Authentication**: Email & SMS OTP for login, signup, and password reset
* **Profile Management**: Editable profile, email/phone OTP verification, password change
* **Super Admin Dashboard**: Stats, approvals, fraud monitoring, audit logs, verification activity table
* **UI/UX**: Modern government theme (Royal Blue/White/Gold), sticky navbar, floating sidebar, smooth animations, responsive design

### Home Page

* Hero section with rotating announcements
* Quick verification form
* Stats counters
* “Why choose us” cards
* User panels
* Step-by-step verification wizard
* Image carousel

### Security & Reliability

* OTP length: 6 digits, expires in 5 mins, max 3 attempts
* Resend cooldown: 30 seconds
* In-memory OTP for development (replace with Redis/DB in production)
* Planned IP-based rate limiting and captcha

---

## 🛠 Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations & Icons**: Framer Motion, lucide-react
* **Email OTP**: Resend API

---

## 📂 Project Structure

```
├── app/
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About
│   ├── services/page.tsx    # Services
│   ├── contact/page.tsx     # Contact
│   ├── universities/page.tsx# Universities info
│   ├── login/page.tsx       # Role-based login (password/OTP)
│   ├── signup/page.tsx      # Role-based signup (OTP, file upload)
│   ├── forgot-password/page.tsx # Password reset flow
│   ├── profile/page.tsx     # User profile
│   └── super-admin/page.tsx # Super Admin dashboard
├── components/
│   ├── home/                # Home page sections
│   ├── layout/              # Header, Navbar, Footer
│   └── ui/                  # Buttons, inputs, modals, tables
├── lib/
│   └── otp-store.ts          # OTP storage (in-memory dev)
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

---

## ⚡ Installation & Setup

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

```bash
git clone https://github.com/your-username/Government-Academic-Verification-Portal.git
cd Government-Academic-Verification-Portal
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env.local`:

```env
# Email (Resend)
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=your_email@domain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
# Either set a messaging service SID or a from number
TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_sid
TWILIO_FROM_NUMBER=+1XXXXXXXXXX

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Verify your sending domain in Resend and configure a verified SMS sender in Twilio.

---

## 🔐 OTP Flow

* **Send OTP**: `POST /api/auth/otp/send` with `{ email | phone, purpose }` (`signup|login|password-reset`)
* **Verify OTP**: `POST /api/auth/otp/verify` with `{ email | phone, otp, purpose }`
* **Storage**: in-memory (dev); replace with Redis/DB in production
* **Security Enhancements**: IP rate limiting, captcha after multiple failed attempts

---

## 🖥 Pages & Routes

| Route              | Description           |
| ------------------ | --------------------- |
| `/`                | Home Page             |
| `/about`           | About Us              |
| `/services`        | Services              |
| `/contact`         | Contact               |
| `/universities`    | University Listings   |
| `/login`           | Role-based Login      |
| `/signup`          | Role-based Signup     |
| `/forgot-password` | Forgot Password       |
| `/profile`         | User Profile          |
| `/super-admin`     | Super Admin Dashboard |
| `/terms`           | Terms & Conditions    |
| `/privacy`         | Privacy Policy        |

---

## 🎨 Design System

### Colors

* Royal Blue: #402E7A
* Primary Blue: #4C3BCF
* Accent Blue: #4B70F5
* Sky Blue: #3DC2EC
* White: #FFFFFF

### Typography

* **Fonts**: Inter, Poppins, Roboto
* **Weights**: 300–800

### Components

* Buttons: Primary, Secondary, Gold, Outline
* Cards: Hover effects, animations
* Forms: Input, Select with validation
* Modals: Responsive
* Tables: Styled with hover effects

---

## 🏗 Scripts

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm start      # Start production server
npm run lint   # Lint project
```

---

## ✅ Quick Test Checklist

* Signup with email OTP (check inbox)
* Login via password and OTP
* Forgot password flow
* Super Admin dashboard loads correctly
* Terms & Privacy links resolve

---

## ⚠️ Production TODO

* Replace in-memory OTP with Redis/DB + IP rate limiting & captcha
* Implement secure auth/session (JWT or NextAuth)
* Hash passwords (bcrypt/argon2)
* Secure file uploads for logos/profile photos
* Persist audit logs
* Verification/search APIs & database models

---

## 📜 License

This project is for **educational and demonstration purposes**.
