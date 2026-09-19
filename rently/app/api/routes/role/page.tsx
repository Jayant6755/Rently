"use client";

import RoleSelection from "@/components/RBACpage/role";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function RolePage() {
  const router = useRouter();

  const handleRoleSelect = useCallback((role: "OWNER" | "CUSTOMER") => {
    // Store the selected role in localStorage
    localStorage.setItem("userRole", role);
    
    // Redirect based on role
    if (role === "OWNER") {
      router.push("/api/routes/signup?role=OWNER");
    } else {
      router.push("/api/routes/signup?role=CUSTOMER");
    }
  }, [router]);

  return (
    <main className="min-h-screen">
      <RoleSelection onRoleSelect={handleRoleSelect} />
    </main>
  );
}
