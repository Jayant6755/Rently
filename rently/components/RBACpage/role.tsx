"use client";

import { useState } from "react";
import { Building2, Users, ArrowRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";



type UserRole = "OWNER" | "CUSTOMER" | null;

interface RoleSelectionProps {
  onRoleSelect?: (role: "OWNER" | "CUSTOMER") => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = async (role: "OWNER" | "CUSTOMER") => {
    setSelectedRole(role);
    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (onRoleSelect) {
      onRoleSelect(role);
    }
   


    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Welcome to <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Rently</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">Let's get you started</p>
          <p className="text-gray-500">Tell us how you'd like to use Rently</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Owner Card */}
          <Card
            onClick={() => !isLoading && handleRoleSelect("OWNER")}
            className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer group ${
              selectedRole === "OWNER"
                ? "border-teal-500 shadow-2xl scale-105"
                : "border-gray-200 hover:border-teal-300 hover:shadow-lg hover:scale-102"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-300 ${
                selectedRole === "OWNER"
                  ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white scale-110"
                  : "bg-teal-100 text-teal-600 group-hover:scale-110"
              }`}>
                <Car className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Rent out a Vehicle
              </h2>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                List your vehicles and earn passive income by renting them out to customers in your area.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>Earn money from your vehicles</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>Set your own rental rates</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>Full management dashboard</span>
                </li>
              </ul>

              {/* Selection Indicator */}
              {selectedRole === "OWNER" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Customer Card */}
          <Card
            onClick={() => !isLoading && handleRoleSelect("CUSTOMER")}
            className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer group ${
              selectedRole === "CUSTOMER"
                ? "border-cyan-500 shadow-2xl scale-105"
                : "border-gray-200 hover:border-cyan-300 hover:shadow-lg hover:scale-102"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-300 ${
                selectedRole === "CUSTOMER"
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110"
                  : "bg-cyan-100 text-cyan-600 group-hover:scale-110"
              }`}>
                <Users className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Rent a Vehicle
              </h2>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                Browse and rent affordable vehicles from verified owners near you.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Wide variety of vehicles</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Affordable rates & deals</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Safe & secure rentals</span>
                </li>
              </ul>

              {/* Selection Indicator */}
              {selectedRole === "CUSTOMER" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            disabled={!selectedRole || isLoading}
            className={`group rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 flex items-center gap-3 ${
              selectedRole
                ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-2xl hover:scale-105"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          You can change your role anytime in your account settings
        </p>
      </div>
    </div>
  );
}
