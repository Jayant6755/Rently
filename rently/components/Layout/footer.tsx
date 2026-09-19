import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 relative w-full">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Compass className="h-7 w-7 text-teal-400" />
              <span>Rently</span>
            </div>
            <p className="text-sm text-gray-400">
              Find your ideal ride wherever you are. Quick, affordable, and local vehicle rentals made simple.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Scooters</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Motorbikes</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Cars</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Locations</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">List Your Vehicle</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-slate-800 p-2.5 hover:bg-slate-700 hover:text-teal-400 transition-colors">
                {/* <Facebook className="h-5 w-5" /> */}
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2.5 hover:bg-slate-700 hover:text-teal-400 transition-colors">
                {/* <Instagram className="h-5 w-5" /> */}
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-2.5 hover:bg-slate-700 hover:text-teal-400 transition-colors">
                {/* <Twitter className="h-5 w-5" /> */}
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-gray-500 md:flex md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Rently Inc. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}