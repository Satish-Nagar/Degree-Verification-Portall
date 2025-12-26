import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="prose max-w-4xl">
          <p className="text-lg text-gray-600 mb-6">
            The Government Academic Verification Portal is a centralized platform designed to ensure
            transparency, security, and authenticity in academic credential verification.
          </p>
          <p className="text-lg text-gray-600">
            This page will be fully developed in the next phase.
          </p>
        </div>
      </div>
      <Footer />
      <Sidebar />
    </main>
  );
}

