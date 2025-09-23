'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { checkAuth } from '../../utils/auth';
import DepartmentOverview from './components/DepartmentOverview';
import ProgramComparison from './components/ProgramComparison';
import FacultyGrid from './components/FacultyGrid';
import ApprovalQueue from './components/ApprovalQueue';
import DefaultersAlert from './components/DefaultersAlert';
import QuickActions from './components/QuickActions';
import {
  mockHoDUser,
  mockDepartmentStats,
  mockProgramsWithStats,
  mockFacultyWithPerformance,
  mockAttendanceCorrections,
  mockDepartmentDefaulters,
  mockQuickActions,
  mockTimeRanges,
  mockComparisonMetrics
} from '../data/mockHoDData';

export default function HoDDashboard() {
  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (userRole !== 'hod') {
      // Redirect to appropriate dashboard based on role
      switch (userRole) {
        case 'student':
          router.push('/student');
          break;
        case 'teacher':
          router.push('/teacher/dashboard');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/login');
      }
    }
  }, [router]);

  const handleDrillDown = (level: 'program' | 'year' | 'section', id: string) => {
    console.log(`Drilling down to ${level}: ${id}`);
    if (level === 'program') {
      router.push(`/hod/programs/analysis?program=${id}`);
    }
  };

  const handleProgramSelect = (programId: string) => {
    console.log(`Selected program: ${programId}`);
    router.push(`/hod/programs/analysis?program=${programId}`);
  };

  const handleFacultyAction = (facultyId: string, action: 'remind' | 'view') => {
    console.log(`Faculty action: ${action} for ${facultyId}`);
    if (action === 'view') {
      router.push(`/hod/faculty/performance?faculty=${facultyId}`);
    } else if (action === 'remind') {
      alert(`Reminder sent to faculty ${facultyId}`);
    }
  };

  const handleApprove = (correctionId: string, comments?: string) => {
    console.log(`Approving correction ${correctionId}:`, comments);
    alert(`Correction ${correctionId} approved`);
  };

  const handleReject = (correctionId: string, reason: string) => {
    console.log(`Rejecting correction ${correctionId}:`, reason);
    alert(`Correction ${correctionId} rejected: ${reason}`);
  };

  const handleBulkProcess = (correctionIds: string[], action: 'approve' | 'reject') => {
    console.log(`Bulk ${action} for corrections:`, correctionIds);
    alert(`${correctionIds.length} corrections ${action === 'approve' ? 'approved' : 'rejected'}`);
  };

  const handleStudentAction = (studentId: string, action: 'view' | 'notify' | 'contact_parent') => {
    console.log(`Student action: ${action} for ${studentId}`);
    switch (action) {
      case 'view':
        router.push(`/hod/students/profile?student=${studentId}`);
        break;
      case 'notify':
        alert(`Notification sent to student ${studentId}`);
        break;
      case 'contact_parent':
        alert(`Parent contact initiated for student ${studentId}`);
        break;
    }
  };

  const handleQuickAction = (actionId: string) => {
    const action = mockQuickActions.find(a => a.id === actionId);
    if (action) {
      router.push(action.route);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {mockHoDUser.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Head of Department - {mockHoDUser.department.name}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Department Programs</p>
            <p className="text-2xl font-bold text-purple-700">{mockDepartmentStats.totalPrograms}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-900">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{mockDepartmentStats.totalStudents}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Faculty Members</p>
                <p className="text-2xl font-bold text-blue-600">{mockDepartmentStats.totalFaculty}</p>
              </div>
              <div className="text-3xl">👩‍🏫</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600">{mockDepartmentStats.overallAttendance}%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900">Critical Defaulters</p>
                <p className="text-2xl font-bold text-red-600">{mockDepartmentStats.criticalDefaulters}</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <QuickActions
          actions={mockQuickActions}
          onActionClick={handleQuickAction}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Department Overview */}
            <DepartmentOverview
              departmentId={mockHoDUser.department.id}
              programs={mockProgramsWithStats}
              overallStats={mockDepartmentStats}
              onDrillDown={handleDrillDown}
            />

            {/* Program Comparison */}
            <ProgramComparison
              programs={mockProgramsWithStats}
              comparisonMetric="attendance"
              timeRange={mockTimeRanges[1]}
              onProgramSelect={handleProgramSelect}
            />

            {/* Faculty Performance Grid */}
            <FacultyGrid
              facultyList={mockFacultyWithPerformance}
              complianceThreshold={85}
              onFacultyAction={handleFacultyAction}
              showPerformanceDetails={true}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Approval Queue */}
            <ApprovalQueue
              pendingCorrections={mockAttendanceCorrections}
              onApprove={handleApprove}
              onReject={handleReject}
              onBulkProcess={handleBulkProcess}
            />

            {/* Critical Defaulters Alert */}
            <DefaultersAlert
              defaulters={mockDepartmentDefaulters}
              onStudentAction={handleStudentAction}
              showContactParent={true}
            />
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Department Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Faculty Compliance Update</p>
                <p className="text-sm text-gray-600">
                  {mockDepartmentStats.facultyCompliance}% faculty have updated attendance in last 24h
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+2.1%</p>
                <p className="text-xs text-gray-600">vs last week</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Program Performance</p>
                <p className="text-sm text-gray-600">
                  M.Tech programs showing highest attendance rates
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">88.4%</p>
                <p className="text-xs text-gray-600">average</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Correction Requests</p>
                <p className="text-sm text-gray-600">
                  {mockAttendanceCorrections.length} pending approvals from faculty
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-xs text-gray-600">review needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}