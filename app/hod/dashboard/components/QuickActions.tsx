'use client';

import React from 'react';
import { QuickAction } from '../../types/hod';

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (actionId: string) => void;
}

export default function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  const getBadgeColor = (color?: string) => {
    switch (color) {
      case 'red': return 'bg-red-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => action.enabled && onActionClick(action.id)}
            disabled={!action.enabled}
            className={`
              relative p-4 text-left border-2 border-gray-200 rounded-lg transition-all duration-200
              ${action.enabled
                ? 'hover:border-purple-300 hover:shadow-md cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
              }
            `}
          >
            {/* Badge */}
            {action.badgeCount && action.badgeCount > 0 && (
              <div className={`
                absolute -top-2 -right-2 min-w-[24px] h-6 px-2 rounded-full text-xs font-bold
                flex items-center justify-center ${getBadgeColor(action.badgeColor)}
              `}>
                {action.badgeCount > 99 ? '99+' : action.badgeCount}
              </div>
            )}

            <div className="flex items-start space-x-3">
              <div className="text-2xl">{action.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  {action.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <span className="text-xs text-purple-600 font-medium">
                {action.enabled ? 'Click to access →' : 'Coming soon'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}