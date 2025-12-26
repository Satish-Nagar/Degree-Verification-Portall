'use client';

import React, { useState } from 'react';
import { Bell, Calendar, MessageCircle, HelpCircle, X } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const sidebarItems = [
    { icon: Bell, label: 'Alerts', color: 'text-red-500' },
    { icon: Calendar, label: 'Calendar', color: 'text-blue-500' },
    { icon: MessageCircle, label: 'Notifications', color: 'text-green-500' },
    { icon: HelpCircle, label: 'Help Desk', color: 'text-purple-500' },
  ];

  return (
    <>
      {/* Floating Sidebar Icons */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 space-y-3">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                setActivePanel(item.label);
                setIsOpen(true);
              }}
              className={`
                w-12 h-12 rounded-full bg-white shadow-lg
                flex items-center justify-center
                hover:scale-110 transition-transform
                ${item.color}
              `}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>

      {/* Sidebar Panel */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 animate-slide-down">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">{activePanel}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            {activePanel === 'Alerts' && (
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-sm font-medium text-red-900">Security Alert</p>
                  <p className="text-xs text-red-700 mt-1">New verification request pending</p>
                </div>
              </div>
            )}
            {activePanel === 'Notifications' && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm font-medium text-blue-900">System Update</p>
                  <p className="text-xs text-blue-700 mt-1">Portal maintenance scheduled</p>
                </div>
              </div>
            )}
            {activePanel === 'Help Desk' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Need help? Contact our support team.</p>
                <button className="btn-primary w-full">Chat Now</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

