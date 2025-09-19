"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type UserRole = "student" | "teacher" | "admin";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const roleCredentials = {
    student: { password: "student123", redirect: "/student" },
    teacher: { password: "teacher123", redirect: "/teacher/dashboard" },
    admin: { password: "admin123", redirect: "/admin" },
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setPassword("");
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedRole === "admin") {
      setError("Administration panel is currently in development");
      setIsLoading(false);
      return;
    }

    const credentials = roleCredentials[selectedRole];
    if (password === credentials.password) {
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("isAuthenticated", "true");

      router.push(credentials.redirect);
    } else {
      setError("Invalid password. Please try again.");
    }

    setIsLoading(false);
  };

  const resetSelection = () => {
    setSelectedRole(null);
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-transparent rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Lernix Logo" className="w-14 h-14" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Lernix</h1>
          <p className="text-gray-600 mt-2">
            Automated Student Attendance Monitoring and Analytics System for
            Colleges
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Built during{" "}
            <i>
              <strong>SIH'25</strong>
            </i>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!selectedRole ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Please select your role to continue
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect("student")}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Student</h3>
                    <p className="text-sm text-gray-600">
                      Access your attendance records
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("teacher")}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Teacher</h3>
                    <p className="text-sm text-gray-600">
                      Manage classes and attendance
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("admin")}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">
                      Administration
                    </h3>
                    <p className="text-sm text-gray-600">
                      System administration panel
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-gray-400">→</span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <button
                  onClick={resetSelection}
                  className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Back to role selection
                </button>

                <div
                  className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ${
                    selectedRole === "student"
                      ? "bg-blue-100"
                      : selectedRole === "teacher"
                      ? "bg-green-100"
                      : "bg-purple-100"
                  }`}
                >
                  <span className="text-2xl">
                    {selectedRole === "student"
                      ? "🎓"
                      : selectedRole === "teacher"
                      ? "👨‍🏫"
                      : "👨‍💼"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                  {selectedRole} Login
                </h2>
                <p className="text-gray-600">
                  {selectedRole === "student" &&
                    "Enter your student credentials"}
                  {selectedRole === "teacher" &&
                    "Enter your teacher credentials"}
                  {selectedRole === "admin" && "Administration access"}
                </p>
              </div>

              {selectedRole === "admin" ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚧</span>
                    <div>
                      <h3 className="font-medium text-yellow-800">
                        Under Development
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        The administration panel is currently being developed
                        and will be available soon.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Access Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isLoading || !password
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : selectedRole === "student"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </div>
  );
}
