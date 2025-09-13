'use client';

import React from 'react';
import Layout from './components/layout/Layout';
import AttendanceStats from './components/attendance/AttendanceStats';
import AttendanceHeatmap from './components/attendance/AttendanceHeatmap';
import RecentAttendance from './components/attendance/RecentAttendance';
import NotificationCenter from './components/notifications/NotificationCenter';
import { generateMockAttendance, mockNotifications, mockSubjects } from './data/mockData';
import { calculateSubjectAttendance } from './utils/attendanceUtils';

export default function Dashboard() {
  const attendanceData = generateMockAttendance();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
            <p className="text-gray-600 mt-1">Here's your academic overview for today</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Current Semester</p>
            <p className="text-2xl font-bold text-slate-700">6</p>
          </div>
        </div>

        {/* Attendance Overview */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Overview</h2>
          <AttendanceStats attendanceData={attendanceData} />
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* Attendance Heatmap */}
            <AttendanceHeatmap attendanceData={attendanceData} />
            
            {/* Subject Performance Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
              <div className="space-y-4">
                {mockSubjects.map(subject => {
                  const subjectStats = calculateSubjectAttendance(attendanceData, subject.name);
                  
                  return (
                    <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{subject.name}</h4>
                        <p className="text-sm text-gray-600">{subject.code} • {subject.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${
                          subjectStats.attendanceRate >= 75 ? 'text-emerald-700' : 'text-red-700'
                        }`}>
                          {subjectStats.attendanceRate.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500">
                          {subjectStats.attended}/{subjectStats.totalClasses} classes
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Notifications */}
            <NotificationCenter notifications={mockNotifications} />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <p className="font-medium text-slate-800">Request Medical Leave</p>
                    <p className="text-sm text-slate-600">Submit a new leave application</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-medium text-emerald-800">View Academic Hub</p>
                    <p className="text-sm text-emerald-600">Access courses and materials</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-medium text-amber-800">View Full Attendance</p>
                    <p className="text-sm text-amber-600">Detailed attendance report</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <RecentAttendance attendanceData={attendanceData} />
        </section>
      </div>
    </Layout>
  );
}
