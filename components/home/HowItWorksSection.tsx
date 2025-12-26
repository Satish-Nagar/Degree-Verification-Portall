'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, UserCheck, Search, FileCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'University Uploads Data',
    description: 'Universities and institutions upload verified student academic records to the portal.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Student Approves',
    description: 'Students receive OTP/login notification and approve their data for verification.',
    color: 'from-green-500 to-green-700',
  },
  {
    number: '03',
    icon: Search,
    title: 'Recruiter Verifies',
    description: 'Recruiters search using roll number and university to verify student credentials.',
    color: 'from-orange-500 to-orange-700',
  },
  {
    number: '04',
    icon: FileCheck,
    title: 'Digital Certificate Issued',
    description: 'Portal generates and issues a secure digital verification certificate.',
    color: 'from-purple-500 to-purple-700',
  },
];

export const HowItWorksSection: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSteps((prev) => new Set(prev).add(index));
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Verification Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, secure, and transparent 4-step process
          </p>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-purple-500"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.has(index);
              return (
                <div 
                  key={index} 
                  className="relative"
                  ref={(el) => { stepRefs.current[index] = el; }}
                >
                  <div 
                    className={`
                      bg-white rounded-xl shadow-lg p-6 text-center
                      group cursor-pointer
                      transform transition-all duration-700 ease-out
                      hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                      ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                    `}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-gov-dark font-bold text-lg transform group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-20">
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

