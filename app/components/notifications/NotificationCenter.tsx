'use client';

import React, { useState } from 'react';
import { Notification } from '../../types';

interface NotificationCenterProps {
  notifications: Notification[];
}

export default function NotificationCenter({ notifications }: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'attendance' | 'medical' | 'academic'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return '📅';
      case 'medical':
        return '🏥';
      case 'academic':
        return '📚';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'attendance', label: 'Attendance', count: notifications.filter(n => n.type === 'attendance').length },
    { value: 'medical', label: 'Medical', count: notifications.filter(n => n.type === 'medical').length },
    { value: 'academic', label: 'Academic', count: notifications.filter(n => n.type === 'academic').length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 ${getPriorityColor(notification.priority)} p-4 rounded-r-lg ${
              !notification.read ? 'ring-2 ring-blue-100' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(notification.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {notification.priority}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      notification.type === 'attendance' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'medical' ? 'bg-purple-100 text-purple-800' :
                      notification.type === 'academic' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {notification.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {!notification.read && (
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Mark Read
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="text-lg">×</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📬</div>
          <p className="text-gray-500">No notifications found for the selected filter</p>
        </div>
      )}

      {filteredNotifications.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Mark All as Read
          </button>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View Notification Settings
          </button>
        </div>
      )}
    </div>
  );
}