import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Services</h1>
        <p className="text-lg text-gray-600">
          Services page content will be added here.
        </p>
      </div>
      <Footer />
      <Sidebar />
    </main>
  );
}

