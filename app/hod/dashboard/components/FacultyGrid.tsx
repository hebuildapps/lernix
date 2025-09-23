'use client';

import React, { useState } from 'react';
import { FacultyWithPerformance } from '../../types/hod';

interface FacultyGridProps {
  facultyList: FacultyWithPerformance[];
  complianceThreshold: number;
  onFacultyAction: (facultyId: string, action: 'remind' | 'view') => void;
  showPerformanceDetails: boolean;
}

export default function FacultyGrid({
  facultyList,
  complianceThreshold,
  onFacultyAction,
  showPerformanceDetails
}: FacultyGridProps) {
  const [sortBy, setSortBy] = useState<'name' | 'compliance' | 'performance' | 'students'>('compliance');
  const [filterPerformance, setFilterPerformance] = useState<'all' | 'excellent' | 'good' | 'needs_improvement'>('all');

  const getPerformanceColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs_improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= complianceThreshold) return 'text-green-600';
    if (compliance >= complianceThreshold - 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDaysAgo = (date: Date) => {
    const diffTime = Date.now() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedAndFilteredFaculty = facultyList
    .filter(faculty => filterPerformance === 'all' || faculty.performanceRating === filterPerformance)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'compliance':
          return b.attendanceUpdateCompliance - a.attendanceUpdateCompliance;
        case 'performance':
          const ratingOrder = { excellent: 3, good: 2, needs_improvement: 1 };
          return ratingOrder[b.performanceRating] - ratingOrder[a.performanceRating];
        case 'students':
          return b.totalStudentsHandled - a.totalStudentsHandled;
        default:
          return 0;
      }
    });

  const complianceStats = {
    total: facultyList.length,
    compliant: facultyList.filter(f => f.attendanceUpdateCompliance >= complianceThreshold).length,
    nonCompliant: facultyList.filter(f => f.attendanceUpdateCompliance < complianceThreshold).length
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Faculty Performance Grid</h2>
        <div className="flex items-center space-x-4">
          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'compliance' | 'performance' | 'students')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="compliance">Sort by Compliance</option>
            <option value="performance">Sort by Performance</option>
            <option value="students">Sort by Students</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Performance Filter */}
          <select
            value={filterPerformance}
            onChange={(e) => setFilterPerformance(e.target.value as 'all' | 'excellent' | 'good' | 'needs_improvement')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Performance</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="needs_improvement">Needs Improvement</option>
          </select>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Total Faculty</p>
              <p className="text-2xl font-bold text-blue-600">{complianceStats.total}</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Compliant</p>
              <p className="text-2xl font-bold text-green-600">{complianceStats.compliant}</p>
              <p className="text-sm text-green-700">
                {((complianceStats.compliant / complianceStats.total) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">Non-Compliant</p>
              <p className="text-2xl font-bold text-red-600">{complianceStats.nonCompliant}</p>
              <p className="text-sm text-red-700">
                {((complianceStats.nonCompliant / complianceStats.total) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {sortedAndFilteredFaculty.map((faculty) => (
          <div key={faculty.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{faculty.name}</h3>
                <p className="text-sm text-gray-600">{faculty.designation}</p>
                <p className="text-sm text-gray-500">{faculty.employeeId}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(faculty.performanceRating)}`}>
                  {faculty.performanceRating.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onFacultyAction(faculty.id, 'view')}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onFacultyAction(faculty.id, 'remind')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Remind
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">Compliance</p>
                <p className={`text-sm font-semibold ${getComplianceColor(faculty.attendanceUpdateCompliance)}`}>
                  {faculty.attendanceUpdateCompliance}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Students</p>
                <p className="text-sm font-semibold text-gray-900">{faculty.totalStudentsHandled}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg Attendance</p>
                <p className="text-sm font-semibold text-gray-900">{faculty.averageClassAttendance}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Responsiveness</p>
                <p className="text-sm font-semibold text-gray-900">{faculty.responsiveness}%</p>
              </div>
            </div>

            {showPerformanceDetails && (
              <div className="space-y-2">
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Subject Assignments</h4>
                  <div className="space-y-1">
                    {faculty.subjects.slice(0, 2).map((subject, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{subject.subjectName}</span>
                        <span className="text-gray-900">{subject.averageAttendance}%</span>
                      </div>
                    ))}
                    {faculty.subjects.length > 2 && (
                      <p className="text-xs text-gray-500">
                        +{faculty.subjects.length - 2} more subjects
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Class Assignments</h4>
                  <div className="space-y-1">
                    {faculty.classesAssigned.slice(0, 2).map((classAssignment, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {classAssignment.className} ({classAssignment.role.replace('_', ' ')})
                        </span>
                        <span className="text-gray-900">{classAssignment.averageAttendance}%</span>
                      </div>
                    ))}
                    {faculty.classesAssigned.length > 2 && (
                      <p className="text-xs text-gray-500">
                        +{faculty.classesAssigned.length - 2} more classes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
              <div className="text-xs text-gray-500">
                Last update: {getDaysAgo(faculty.lastUpdateDate)} days ago
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>📧 {faculty.notificationsSent} notifications</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredFaculty.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No faculty members match the current filter criteria.</p>
        </div>
      )}
    </div>
  );
}