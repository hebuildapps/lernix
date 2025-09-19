'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { checkAuth } from '../../utils/auth';
import AcademicCalendar from './components/AcademicCalendar';
import PlanningAssistant from './components/PlanningAssistant';
import AttendanceMarking from './components/AttendanceMarking';
import StudentGrid from './components/StudentGrid';
import SubjectAnalytics from './components/SubjectAnalytics';
import DefaultersAlert from './components/DefaultersAlert';
import {
  mockTeacher,
  mockStudentsCS301,
  mockSessions,
  mockHolidays,
  mockPlanningSuggestions,
  mockAcademicEvents
} from '../data/mockTeacherData';
import { SubjectAnalytics as SubjectAnalyticsType } from '../types/teacher';

export default function TeacherDashboard() {
  const router = useRouter();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (userRole !== 'teacher') {
      // Redirect to appropriate dashboard based on role
      if (userRole === 'student') {
        router.push('/student');
      } else if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent') => {
    console.log(`Marking ${studentId} as ${status}`);
  };

  const handleStudentSelect = (studentId: string) => {
    console.log(`Selected student: ${studentId}`);
  };

  const handleSendNotification = (studentIds: string[]) => {
    console.log(`Sending notification to: ${studentIds.join(', ')}`);
    alert(`Notification sent to ${studentIds.length} students`);
  };

  const handlePlanningSelect = (suggestion: unknown) => {
    console.log('Selected planning suggestion:', suggestion);
  };

  const mockSubjectAnalytics: SubjectAnalyticsType = {
    subjectId: 'sub-001',
    subjectName: 'Data Structures & Algorithms',
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

  const todaysDate = new Date();
  const defaulters = mockStudentsCS301.filter(student => student.attendancePercentage < 75);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {mockTeacher.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Subject Teacher Dashboard - {mockTeacher.department}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active Subjects</p>
            <p className="text-2xl font-bold text-blue-700">{mockTeacher.subjects.length}</p>
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
                <p className="text-sm font-medium text-green-900">Classes Conducted</p>
                <p className="text-2xl font-bold text-green-600">{mockSessions.length}</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">Avg Attendance</p>
                <p className="text-2xl font-bold text-yellow-600">82.4%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900">Defaulters</p>
                <p className="text-2xl font-bold text-red-600">{defaulters.length}</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="text-2xl">✅</span>
              <span className="text-sm font-medium text-blue-800">Mark Today&apos;s Attendance</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="text-2xl">📈</span>
              <span className="text-sm font-medium text-green-800">View Class Performance</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="text-2xl">📅</span>
              <span className="text-sm font-medium text-purple-800">Check Academic Calendar</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <span className="text-2xl">📧</span>
              <span className="text-sm font-medium text-orange-800">Send Notifications</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Today's Attendance Marking */}
            <AttendanceMarking
              classId="CS301-A"
              subjectId="sub-001"
              students={mockStudentsCS301}
              onMarkAttendance={handleMarkAttendance}
              sessionDate={todaysDate}
            />

            {/* Subject Analytics */}
            <SubjectAnalytics
              subjectData={mockSubjectAnalytics}
              showComparison={true}
            />

            {/* Student Grid */}
            <StudentGrid
              students={mockStudentsCS301}
              attendanceThreshold={75}
              onStudentSelect={handleStudentSelect}
              showAttendancePercentage={true}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Academic Calendar */}
            <AcademicCalendar
              month={currentMonth}
              year={currentYear}
              holidays={mockHolidays}
              events={mockAcademicEvents}
              onDateSelect={() => {}}
              showPlanningInsights={true}
            />

            {/* Planning Assistant */}
            <PlanningAssistant
              currentMonth={currentMonth}
              currentYear={currentYear}
              suggestions={mockPlanningSuggestions}
              onPlanningSelect={handlePlanningSelect}
            />

            {/* Defaulters Alert */}
            <DefaultersAlert
              defaulters={defaulters}
              threshold={75}
              onSendNotification={handleSendNotification}
              onViewStudent={handleStudentSelect}
            />
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {mockSessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.topic || 'Session Topic'}</p>
                  <p className="text-sm text-gray-600">
                    {session.date.toLocaleDateString()} • {session.class}
                  </p>
                </div>
                <div className="text-right">
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
      </div>
    </Layout>
  );
}