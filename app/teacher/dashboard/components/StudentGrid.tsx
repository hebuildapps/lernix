'use client';

import React, { useState } from 'react';
import { StudentWithAttendance } from '../../types/teacher';

interface StudentGridProps {
  students: StudentWithAttendance[];
  attendanceThreshold: number;
  onStudentSelect: (studentId: string) => void;
  showAttendancePercentage?: boolean;
  viewMode?: 'grid' | 'list';
}

export default function StudentGrid({
  students,
  attendanceThreshold = 75,
  onStudentSelect,
  showAttendancePercentage = true,
  viewMode = 'grid'
}: StudentGridProps) {
  const [sortBy, setSortBy] = useState<'name' | 'attendance' | 'status'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'critical'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= attendanceThreshold) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const sortedAndFilteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || student.attendanceStatus === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'attendance':
          return b.attendancePercentage - a.attendancePercentage;
        case 'status':
          const statusOrder = { critical: 0, warning: 1, good: 2 };
          return statusOrder[a.attendanceStatus] - statusOrder[b.attendanceStatus];
        default:
          return 0;
      }
    });

  const statusCounts = students.reduce((acc, student) => {
    acc[student.attendanceStatus] = (acc[student.attendanceStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Overview</h3>
          <p className="text-sm text-gray-600">{students.length} students total</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {/* View mode functionality would be implemented here */}}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            ⊞
          </button>
          <button
            onClick={() => {/* View mode functionality would be implemented here */}}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{statusCounts.good || 0}</p>
          <p className="text-xs text-green-700">Good (≥75%)</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.warning || 0}</p>
          <p className="text-xs text-yellow-700">Warning (60-74%)</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">{statusCounts.critical || 0}</p>
          <p className="text-xs text-red-700">Critical (&lt;60%)</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'attendance' | 'status')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="attendance">Sort by Attendance</option>
            <option value="status">Sort by Status</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'good' | 'warning' | 'critical')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Students</option>
            <option value="good">Good</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Student Grid */}
      <div className={`grid gap-4 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {sortedAndFilteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => onStudentSelect(student.id)}
            className={`p-4 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 ${
              viewMode === 'list' ? 'flex items-center space-x-4' : ''
            }`}
          >
            <div className={`flex items-center space-x-3 ${viewMode === 'list' ? 'flex-1' : 'mb-3'}`}>
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                <p className="text-xs text-gray-600">{student.rollNumber}</p>
              </div>
            </div>

            <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : 'space-y-2'}`}>
              {showAttendancePercentage && (
                <div className={viewMode === 'list' ? 'text-right' : ''}>
                  <p className={`text-lg font-bold ${getAttendanceColor(student.attendancePercentage)}`}>
                    {student.attendancePercentage.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    {student.presentSessions}/{student.totalSessions}
                  </p>
                </div>
              )}

              <div className={viewMode === 'list' ? 'text-right' : ''}>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.attendanceStatus)}`}>
                  {student.attendanceStatus}
                </span>
                {student.medicalLeaves > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    {student.medicalLeaves} medical leaves
                  </p>
                )}
              </div>

              <div className={`text-xs text-gray-500 ${viewMode === 'list' ? 'text-right' : ''}`}>
                Last: {student.lastAttendance.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No students found matching your criteria</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('critical')}
            className="px-3 py-2 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            🚨 View Defaulters
          </button>
          <button
            onClick={() => setSortBy('attendance')}
            className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            📊 Sort by Attendance
          </button>
          <button className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            📧 Send Notifications
          </button>
          <button className="px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            📄 Export List
          </button>
        </div>
      </div>
    </div>
  );
}