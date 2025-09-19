'use client';

import React, { useState } from 'react';
import { SubjectAnalytics, ClassPerformance, AttendanceHeatmapData } from '../../types/teacher';

interface SubjectAnalyticsProps {
  subjectData: SubjectAnalytics;
  dateRange?: { start: Date; end: Date };
  classFilter?: string[];
  showComparison?: boolean;
}

export default function SubjectAnalytics({
  subjectData,
  dateRange,
  classFilter,
  showComparison = true
}: SubjectAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'heatmap' | 'defaulters'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester'>('month');

  const getAttendanceColor = (rate: number) => {
    if (rate >= 85) return 'bg-green-500';
    if (rate >= 75) return 'bg-yellow-500';
    if (rate >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAttendanceTextColor = (rate: number) => {
    if (rate >= 75) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderHeatmap = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date;
    });

    return (
      <div className="grid grid-cols-10 gap-1">
        {last30Days.map((date, index) => {
          const heatmapData = subjectData.attendanceHeatmap.find(
            data => new Date(data.date).toDateString() === date.toDateString()
          );
          const attendanceRate = heatmapData?.attendanceRate || 0;

          return (
            <div
              key={index}
              className={`w-6 h-6 rounded text-xs flex items-center justify-center text-white font-medium ${getAttendanceColor(attendanceRate)}`}
              title={`${date.toLocaleDateString()}: ${attendanceRate}% attendance`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Average Attendance</p>
              <p className={`text-2xl font-bold ${getAttendanceTextColor(subjectData.averageAttendance)}`}>
                {subjectData.averageAttendance.toFixed(1)}%
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Total Classes</p>
              <p className="text-2xl font-bold text-green-600">{subjectData.totalClasses}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">Defaulters</p>
              <p className="text-2xl font-bold text-red-600">{subjectData.defaulters.length}</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Class Comparison */}
      {showComparison && subjectData.classComparison && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Class Performance Comparison</h4>
          <div className="space-y-3">
            {subjectData.classComparison.map((classPerf, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{classPerf.className}</p>
                  <p className="text-sm text-gray-600">{classPerf.totalStudents} students</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${getAttendanceTextColor(classPerf.averageAttendance)}`}>
                    {classPerf.averageAttendance.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">{classPerf.defaulterCount} defaulters</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Trend */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Attendance Trend</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600">Last 30 Days</span>
            <span className="text-xs text-gray-600">Higher intensity = Better attendance</span>
          </div>
          {renderHeatmap()}
        </div>
      </div>
    </div>
  );

  const renderDefaulters = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Students Below 75% Attendance</h4>
        <span className="text-xs text-gray-600 bg-red-100 px-2 py-1 rounded">
          {subjectData.defaulters.length} students
        </span>
      </div>

      {subjectData.defaulters.length > 0 ? (
        <div className="space-y-3">
          {subjectData.defaulters.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-red-800">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-600">{student.rollNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">{student.attendancePercentage.toFixed(1)}%</p>
                <p className="text-xs text-gray-600">{student.presentSessions}/{student.totalSessions}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gray-600">No defaulters! All students have good attendance.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{subjectData.subjectName} Analytics</h3>
          <p className="text-sm text-gray-600">Subject performance overview and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'heatmap'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔥 Heatmap
        </button>
        <button
          onClick={() => setActiveTab('defaulters')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'defaulters'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚠️ Defaulters
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'heatmap' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Attendance Heatmap - Last 30 Days</h4>
            {renderHeatmap()}
            <p className="text-xs text-gray-600 mt-4">
              Each square represents a day. Darker colors indicate higher attendance rates.
            </p>
          </div>
        )}
        {activeTab === 'defaulters' && renderDefaulters()}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            📧 Send Warnings
          </button>
          <button className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            📊 Export Report
          </button>
          <button className="px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            📈 View Trends
          </button>
          <button className="px-3 py-2 text-xs bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            🎯 Set Targets
          </button>
        </div>
      </div>
    </div>
  );
}