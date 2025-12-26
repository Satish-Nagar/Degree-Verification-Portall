'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Shield, Building2, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const panels = [
  {
    icon: Shield,
    title: 'Super Admin',
    subtitle: 'University / Education Board',
    description: 'Manage universities, approve institutions, upload student data, and monitor system-wide activities.',
    color: 'from-purple-500 to-purple-700',
    iconColor: 'text-purple-500',
    href: '/login?role=super-admin',
  },
  {
    icon: Building2,
    title: 'Institution Admin',
    subtitle: 'College / Institution',
    description: 'Upload student records, manage profiles, approve updates, and handle verification requests.',
    color: 'from-blue-500 to-blue-700',
    iconColor: 'text-blue-500',
    href: '/login?role=institution-admin',
  },
  {
    icon: GraduationCap,
    title: 'Student',
    subtitle: 'Academic Records',
    description: 'View your academic records, approve recruiter access, request corrections, and track verifications.',
    color: 'from-green-500 to-green-700',
    iconColor: 'text-green-500',
    href: '/login?role=student',
  },
  {
    icon: Briefcase,
    title: 'Recruiter',
    subtitle: 'Organization / Company',
    description: 'Verify student credentials, download certificates, track verification history, and detect fraud.',
    color: 'from-orange-500 to-orange-700',
    iconColor: 'text-orange-500',
    href: '/login?role=recruiter',
  },
];

export const UserPanelsSection: React.FC = () => {
  const router = useRouter();
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Portal Access Panels
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((panel, index) => {
            const Icon = panel.icon;
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
                <div
                  className="bg-white rounded-xl shadow-lg p-6 group cursor-pointer
                    hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                    transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${panel.color} flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 text-center group-hover:text-primary-600 transition-colors">
                    {panel.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 text-center">{panel.subtitle}</p>
                  <p className="text-gray-600 text-sm mb-6 text-center group-hover:text-gray-700 transition-colors">
                    {panel.description}
                  </p>
                  <Button
                    variant="primary"
                    className="w-full group-hover:bg-primary-600 transition-colors"
                    onClick={() => router.push(panel.href)}
                  >
                    Access Panel
                    <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

