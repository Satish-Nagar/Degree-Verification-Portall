'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: Shield,
    title: 'Prevent Fake Degrees',
    description: 'AI-powered verification system eliminates fraudulent academic credentials and ensures authenticity.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: CheckCircle2,
    title: 'Secure & AI-Verified',
    description: 'Advanced encryption and machine learning algorithms verify credentials with 99.9% accuracy.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Trusted by All',
    description: 'Used by universities, recruiters, government bodies, and educational institutions nationwide.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: AlertTriangle,
    title: 'Real-time Fraud Detection',
    description: 'Instant alerts for duplicate records, suspicious patterns, and unauthorized access attempts.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
];

export const WhySection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => new Set(prev).add(index));
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why This Portal Exists
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Addressing the critical need for transparent, secure, and reliable academic credential verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.has(index);
            return (
              <div
                key={index}
                ref={(el) => {cardRefs.current[index] = el;}}
                className={`
                  transform transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                `}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card
                  hover
                  className={`
                    ${feature.bgColor} 
                    group cursor-pointer
                    hover:scale-105 hover:shadow-2xl
                    transition-all duration-300
                  `}
                >
                  <div className={`${feature.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{feature.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

