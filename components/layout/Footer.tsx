import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">About Portal</h3>
            <p className="text-sm text-gray-300 mb-4">
              Centralized Academic Verification Portal ensuring transparency and preventing fraud in academic credentials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-gold-500 transition-colors">
                  Universities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-gold-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/rti" className="hover:text-gold-500 transition-colors">
                  RTI Information
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-gold-500 transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Government Building,<br />
                  New Delhi, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">support@verification.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Government Academic Verification Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

