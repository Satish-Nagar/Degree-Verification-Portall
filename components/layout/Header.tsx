'use client';

import React from 'react';
import { Bell, Phone, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary-600 text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-gold-500" />
          <span className="text-sm font-medium">Secure Portal</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Emergency Helpline: 1800-XXX-XXXX</span>
          </div>
          <button className="relative p-2 hover:bg-primary-700 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

