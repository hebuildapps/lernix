'use client';

import React from 'react';
import { PlanningSuggestion } from '../../types/calendar';

interface PlanningAssistantProps {
  currentMonth: number;
  currentYear: number;
  suggestions: PlanningSuggestion[];
  onPlanningSelect?: (suggestion: PlanningSuggestion) => void;
}

export default function PlanningAssistant({
  currentMonth: _currentMonth,
  currentYear: _currentYear,
  suggestions = [],
  onPlanningSelect
}: PlanningAssistantProps) {
  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimal_date':
        return '✅';
      case 'avoid_date':
        return '⚠️';
      case 'reschedule':
        return '🔄';
      default:
        return '💡';
    }
  };

  const formatDateRange = (startDate: Date, endDate?: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    };

    if (endDate) {
      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    }
    return startDate.toLocaleDateString('en-US', options);
  };

  const planningTips = [
    {
      icon: '📅',
      title: 'Optimal Timing',
      description: 'Schedule important assessments mid-week for better attendance'
    },
    {
      icon: '🎉',
      title: 'Festival Planning',
      description: 'Avoid assignment deadlines near major festivals and long weekends'
    },
    {
      icon: '📊',
      title: 'Attendance Patterns',
      description: 'Monday and Friday classes typically have lower attendance'
    },
    {
      icon: '⏰',
      title: 'Advance Notice',
      description: 'Give at least 1 week notice for assignments and tests'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🧠</span>
          Academic Planning Assistant
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>

      {/* Planning Suggestions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Smart Suggestions</h4>
        <div className="space-y-3">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:shadow-sm ${getSeverityColor(suggestion.severity)}`}
                onClick={() => onPlanningSelect?.(suggestion)}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{getTypeIcon(suggestion.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium capitalize">
                        {suggestion.type.replace('_', ' ')}
                      </p>
                      <span className="text-xs opacity-75">
                        {formatDateRange(suggestion.date, suggestion.alternative)}
                      </span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">
                      {suggestion.reason}
                    </p>
                    {suggestion.alternative && (
                      <p className="text-xs mt-1 font-medium">
                        Suggested: {formatDateRange(suggestion.alternative)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No specific suggestions for this period</p>
              <p className="text-xs text-gray-400 mt-1">Check back closer to festivals and holidays</p>
            </div>
          )}
        </div>
      </div>

      {/* Planning Tips */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">General Planning Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {planningTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-lg">{tip.icon}</span>
              <div>
                <p className="text-xs font-medium text-gray-900">{tip.title}</p>
                <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            📝 Plan Assignment
          </button>
          <button className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            📊 Schedule Test
          </button>
          <button className="px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            📅 Set Deadline
          </button>
          <button className="px-3 py-2 text-xs bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            🔔 Send Reminder
          </button>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">💡</span>
          <p className="text-xs text-blue-800 font-medium">Planning Insight</p>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Students typically perform better on assessments scheduled on Tuesday-Thursday.
          Consider this when planning important evaluations.
        </p>
      </div>
    </div>
  );
}