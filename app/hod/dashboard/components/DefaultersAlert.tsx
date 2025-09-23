'use client';

import React, { useState } from 'react';
import { DepartmentDefaulter } from '../../types/hod';

interface DefaultersAlertProps {
  defaulters: DepartmentDefaulter[];
  onStudentAction: (studentId: string, action: 'view' | 'notify' | 'contact_parent') => void;
  showContactParent: boolean;
}

export default function DefaultersAlert({
  defaulters,
  onStudentAction,
  showContactParent
}: DefaultersAlertProps) {
  const [sortBy, setSortBy] = useState<'attendance' | 'risk' | 'name' | 'program'>('risk');
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'high' | 'moderate'>('all');

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'moderate': return '⚡';
      default: return '📋';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 75) return 'text-yellow-600';
    if (attendance >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDaysAgo = (date?: Date) => {
    if (!date) return 'Never';
    const diffTime = Date.now() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const sortedAndFilteredDefaulters = defaulters
    .filter(defaulter => filterRisk === 'all' || defaulter.riskLevel === filterRisk)
    .sort((a, b) => {
      switch (sortBy) {
        case 'attendance':
          return a.overallAttendance - b.overallAttendance;
        case 'risk':
          const riskOrder = { critical: 3, high: 2, moderate: 1 };
          return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
        case 'name':
          return a.studentName.localeCompare(b.studentName);
        case 'program':
          return a.program.localeCompare(b.program);
        default:
          return 0;
      }
    });

  const riskStats = {
    critical: defaulters.filter(d => d.riskLevel === 'critical').length,
    high: defaulters.filter(d => d.riskLevel === 'high').length,
    moderate: defaulters.filter(d => d.riskLevel === 'moderate').length
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Critical Defaulters</h2>
          <p className="text-sm text-gray-600">
            {defaulters.length} students below attendance threshold
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'attendance' | 'risk' | 'name' | 'program')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="risk">Sort by Risk</option>
            <option value="attendance">Sort by Attendance</option>
            <option value="name">Sort by Name</option>
            <option value="program">Sort by Program</option>
          </select>

          {/* Risk Filter */}
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value as 'all' | 'critical' | 'high' | 'moderate')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>
      </div>

      {/* Risk Level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">Critical Risk</p>
              <p className="text-2xl font-bold text-red-600">{riskStats.critical}</p>
            </div>
            <div className="text-2xl">🚨</div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-900">High Risk</p>
              <p className="text-2xl font-bold text-orange-600">{riskStats.high}</p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-900">Moderate Risk</p>
              <p className="text-2xl font-bold text-yellow-600">{riskStats.moderate}</p>
            </div>
            <div className="text-2xl">⚡</div>
          </div>
        </div>
      </div>

      {/* Defaulters List */}
      <div className="space-y-4">
        {sortedAndFilteredDefaulters.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-500">No defaulters match the current filter</p>
          </div>
        ) : (
          sortedAndFilteredDefaulters.map((defaulter) => (
            <div
              key={defaulter.studentId}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(defaulter.riskLevel)}`}>
                      {getRiskIcon(defaulter.riskLevel)} {defaulter.riskLevel.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {defaulter.studentCode}
                    </span>
                  </div>

                  <h3 className="font-medium text-gray-900 mb-1">
                    {defaulter.studentName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {defaulter.program} - {defaulter.year} {defaulter.section}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Overall Attendance</p>
                      <p className={`text-lg font-semibold ${getAttendanceColor(defaulter.overallAttendance)}`}>
                        {defaulter.overallAttendance}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Classes Missed</p>
                      <p className="text-lg font-semibold text-gray-900">{defaulter.totalClassesMissed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Critical Subjects</p>
                      <p className="text-lg font-semibold text-red-600">{defaulter.criticalSubjects.length}</p>
                    </div>
                  </div>

                  {/* Critical Subjects */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Critical Subjects</p>
                    <div className="space-y-1">
                      {defaulter.criticalSubjects.slice(0, 2).map((subject, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{subject.subjectName}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getAttendanceColor(subject.attendancePercentage)}`}>
                              {subject.attendancePercentage}%
                            </span>
                            <span className="text-gray-500">
                              ({subject.classesMissed}/{subject.totalClasses})
                            </span>
                          </div>
                        </div>
                      ))}
                      {defaulter.criticalSubjects.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{defaulter.criticalSubjects.length - 2} more subjects
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Parent Contact Info */}
                  <div className="text-xs text-gray-500 mb-3">
                    <p>Parent: {defaulter.parentContactInfo.parentName}</p>
                    <p>Contact: {defaulter.parentContactInfo.phoneNumber}</p>
                    <p>Last notification: {getDaysAgo(defaulter.lastNotificationSent)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => onStudentAction(defaulter.studentId, 'view')}
                  className="px-3 py-1 text-purple-600 border border-purple-300 text-sm font-medium rounded-md hover:bg-purple-50"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onStudentAction(defaulter.studentId, 'notify')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Send Notice
                </button>
                {showContactParent && (
                  <button
                    onClick={() => onStudentAction(defaulter.studentId, 'contact_parent')}
                    className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700"
                  >
                    Contact Parent
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {defaulters.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {sortedAndFilteredDefaulters.length} of {defaulters.length} defaulters
            </p>
            <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
              Export List →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}