"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "./utils/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (isAuthenticated && userRole) {
      // Redirect to appropriate dashboard based on role
      switch (userRole) {
        case 'student':
          router.push('/student');
          break;
        case 'teacher':
          router.push('/teacher/dashboard');
          break;
        case 'admin':
          router.push('/admin');
          break;
        case 'hod':
          router.push('/hod/dashboard');
          break;
        default:
          router.push('/login');
      }
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);

  // Show loading spinner while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
          <span className="text-white font-bold text-2xl">L</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lernix</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
