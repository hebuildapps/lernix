'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import AttendanceMarking from '../dashboard/components/AttendanceMarking';
import StudentGrid from '../dashboard/components/StudentGrid';
import SubjectAnalytics from '../dashboard/components/SubjectAnalytics';
import { mockStudentsCS301, mockTeacher, mockSessions } from '../data/mockTeacherData';
import { SubjectAnalytics as SubjectAnalyticsType } from '../types/teacher';
import { checkAuth } from '../../utils/auth';

export default function TeacherAttendancePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'mark' | 'analytics' | 'students'>('mark');
  const [selectedClass, setSelectedClass] = useState('CS301-A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated || userRole !== 'teacher') {
      router.push('/login');
      return;
    }
  }, [router]);

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent') => {
    console.log(`Marking ${studentId} as ${status}`);
  };

  const handleStudentSelect = (studentId: string) => {
    console.log(`Selected student: ${studentId}`);
  };

  const mockSubjectAnalytics: SubjectAnalyticsType = {
    subjectId: 'sub-001',
    subjectName: selectedSubject,
    totalClasses: 45,
    averageAttendance: 82.4,
    classComparison: [
      {
        className: 'CS301-A',
        averageAttendance: 82.4,
        totalStudents: 40,
        defaulterCount: 2
      },
      {
        className: 'CS301-B',
        averageAttendance: 78.9,
        totalStudents: 38,
        defaulterCount: 4
      }
    ],
    attendanceHeatmap: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      attendanceRate: Math.random() * 40 + 60,
      totalStudents: 40,
      presentStudents: Math.floor(Math.random() * 16 + 24)
    })),
    defaulters: mockStudentsCS301.filter(student => student.attendancePercentage < 75)
  };

  const classes = ['CS301-A', 'CS301-B', 'CS301-C'];
  const subjects = mockTeacher.subjects;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">
              Complete attendance management for your subjects
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Today's Date</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {classes.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Quick Actions:</span>
              <button className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                📊 Export Report
              </button>
              <button className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                📧 Send Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('mark')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'mark'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✅ Mark Attendance
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'students'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👥 Student Overview
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'mark' && (
              <AttendanceMarking
                classId={selectedClass}
                subjectId="sub-001"
                students={mockStudentsCS301}
                onMarkAttendance={handleMarkAttendance}
                sessionDate={new Date()}
              />
            )}

            {activeTab === 'analytics' && (
              <SubjectAnalytics
                subjectData={mockSubjectAnalytics}
                showComparison={true}
              />
            )}

            {activeTab === 'students' && (
              <StudentGrid
                students={mockStudentsCS301}
                attendanceThreshold={75}
                onStudentSelect={handleStudentSelect}
                showAttendancePercentage={true}
              />
            )}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              View All Sessions
            </button>
          </div>
          <div className="space-y-3">
            {mockSessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{session.topic || 'Session Topic'}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      session.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {session.date.toLocaleDateString()} • {session.class} • {session.subject}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {session.attendanceCount}/{session.totalStudents} present
                  </p>
                  <p className="text-xs text-gray-600">
                    {((session.attendanceCount / session.totalStudents) * 100).toFixed(1)}% attendance
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{mockStudentsCS301.length}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600">82.4%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">Sessions Conducted</p>
                <p className="text-2xl font-bold text-yellow-600">{mockSessions.length}</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900">Defaulters</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockStudentsCS301.filter(s => s.attendancePercentage < 75).length}
                </p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}