'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Search, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const announcements = [
  '🎓 New Universities Added: 15+ Institutions Now Verified',
  '🔒 Enhanced Security: AI-Powered Fraud Detection Active',
  '📢 Minister Announcement: Digital Verification Mandatory from 2024',
  '✅ 1 Million+ Students Verified Successfully',
];

const backgroundImages = ['/pic-1.jpg', '/pic-2.jpg', '/pic-3.jpg'];

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const [rollNumber, setRollNumber] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleVerifyStudent = () => {
    if (rollNumber && selectedUniversity) {
      router.push(`/verify?roll=${rollNumber}&university=${selectedUniversity}`);
    } else {
      alert('Please enter roll number and select university');
    }
  };

  const handleExploreUniversities = () => {
    router.push('/universities');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Sliding Background Images - One by One from Left to Right */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((img, index) => {
          const isActive = index === currentBgImage;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 translate-x-0 z-0'
                  : 'opacity-0 translate-x-full z-0'
              }`}
            >
              <Image
                src={img}
                alt={`Background ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          );
        })}
        {/* Fixed Overlay - More transparent */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-gov-dark opacity-50 z-10"></div>
      </div>

      {/* 3D Animated Overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        {/* Rotating Announcement Banner */}
        <div className="mb-8 animate-slide-down">
          <div className="bg-gold-500 text-gov-dark px-6 py-3 rounded-lg inline-block shadow-lg">
            <p className="font-semibold text-sm md:text-base">
              {announcements[currentAnnouncement]}
            </p>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Government Academic
            <br />
            <span className="text-gold-500">Verification Portal</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-slide-up">
            Secure, Transparent, and AI-Powered Academic Credential Verification
            <br />
            Trusted by Universities, Recruiters, and Government Bodies
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              variant="gold" 
              size="lg" 
              className="animate-scale-in"
              onClick={handleVerifyStudent}
            >
              <CheckCircle className="w-5 h-5 inline mr-2" />
              Verify Student
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="animate-scale-in" 
              style={{ animationDelay: '0.1s' }}
              onClick={handleExploreUniversities}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              Explore Universities
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white hover:bg-white hover:text-primary-600 animate-scale-in" 
              style={{ animationDelay: '0.2s' }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          {/* Quick Search */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div className="flex-1">
                <select 
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="" className="text-gray-900">Select University</option>
                  <option value="rgpv" className="text-gray-900">BU Bhopal</option>
                  <option value="other" className="text-gray-900">Other Universities</option>
                </select>
              </div>
              <Button 
                variant="gold" 
                size="lg"
                onClick={handleVerifyStudent}
              >
                <Search className="w-5 h-5 inline mr-2" />
                Verify Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

