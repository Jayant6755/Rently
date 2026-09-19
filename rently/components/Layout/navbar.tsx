"use client";

import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
   
    { name: "How it Works", href: "#works" },
    { name: "Locate", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <a href="#home" onClick={() => setIsOpen(false)} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Rently
              </h1>
              <p className="text-xs text-gray-500 font-medium -mt-1">Your Ride Awaits</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:bg-clip-text hover:text-transparent transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex gap-4">
            <Link href="/api/routes/role">
              <Button className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Explore Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link href="/api/role" className="w-full">
                <Button className="w-full mt-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
