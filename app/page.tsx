import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { WhySection } from '@/components/home/WhySection';
import { UserPanelsSection } from '@/components/home/UserPanelsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ImageCarousel } from '@/components/home/ImageCarousel';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Navbar />
      <HeroSection />
      <WhySection />
      <UserPanelsSection />
      <StatsSection />
      <HowItWorksSection />
      <ImageCarousel />
      <Footer />
      <Sidebar />
    </main>
  );
}

