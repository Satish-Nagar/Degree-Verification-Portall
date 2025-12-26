'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Building2, CheckCircle, Briefcase, Shield } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Total Students', value: 2500000, suffix: '+' },
  { icon: Building2, label: 'Total Institutions', value: 5000, suffix: '+' },
  { icon: CheckCircle, label: 'Verified Students', value: 1800000, suffix: '+' },
  { icon: Briefcase, label: 'Recruiter Organizations', value: 12000, suffix: '+' },
  { icon: Shield, label: 'Fraud Prevented', value: 45000, suffix: '+' },
];

export const StatsSection: React.FC = () => {
  const [counted, setCounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [counted]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portal Statistics</h2>
          <p className="text-lg text-primary-100">Real-time data showcasing our impact</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {counted ? (
                    <CountUpAnimation target={stat.value} suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CountUpAnimation: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animate = () => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
          
          // Reset and restart after a short pause for continuous loop
          setTimeout(() => {
            setCount(0);
            animate(); // Restart animation
          }, 1000);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);
    };

    animate();
  }, [target]);

  return (
    <span className="inline-block">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

