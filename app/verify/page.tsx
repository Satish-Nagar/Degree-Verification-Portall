'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const rollNumber = searchParams.get('roll');
  const university = searchParams.get('university');

  // Mock verification result
  const isVerified = rollNumber && university;

  return (
    <main className="min-h-screen">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <div className="text-center mb-8">
              {isVerified ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Successful</h1>
                  <p className="text-gray-600">Student credentials verified successfully</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Failed</h1>
                  <p className="text-gray-600">Please provide valid roll number and university</p>
                </>
              )}
            </div>

            {isVerified && (
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Roll Number</p>
                      <p className="font-semibold text-gray-900">{rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-semibold text-gray-900">{university}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Header />
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </main>
    }>
      <VerifyContent />
    </Suspense>
  );
}

