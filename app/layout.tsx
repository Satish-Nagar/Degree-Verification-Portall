import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Government Academic Verification Portal",
  description: "Centralized Academic Verification Portal for Universities, Institutions, Students, and Recruiters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

