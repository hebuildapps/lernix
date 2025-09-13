"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: "📊" },
  { id: "attendance", label: "Attendance", href: "/attendance", icon: "📅" },
  { id: "medical", label: "Medical Leave", href: "/medical", icon: "🏥" },
  { id: "academic", label: "Academic Hub", href: "/academic", icon: "📚" },
  {
    id: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: "🔔",
  },
  { id: "profile", label: "Profile", href: "/profile", icon: "👤" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-64 bg-white shadow-lg border-r border-gray-200 h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lernix</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <span className="text-gray-500 text-xl">×</span>
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-100 text-slate-800 border-r-4 border-slate-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">SJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Heramb Salunkhe
                </p>
                <p className="text-xs text-gray-500 truncate">LX2024001</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
