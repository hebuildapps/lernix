"use client";

import React, { useState } from "react";
import { mockNotifications } from "../../data/mockData";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-0 md:left-64 right-0 z-30">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <span className="text-gray-600 text-xl">☰</span>
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Student Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="View notifications"
            >
              <span className="text-xl" role="img" aria-label="Notifications">
                🔔
              </span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {mockNotifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.priority === "high"
                              ? "bg-red-500"
                              : notification.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                Heramb Salunkhe
              </p>
              <p className="text-xs text-gray-500">Semester 6</p>
            </div>
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">SJ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
