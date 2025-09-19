'use client';

import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import SubjectAnalytics from '../../dashboard/components/SubjectAnalytics';
import { mockTeacher } from '../../data/mockTeacherData';
import { SubjectAnalytics as SubjectAnalyticsType } from '../../types/teacher';

export default function SubjectAnalyticsPage() {
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester'>('month');
  const [selectedClass, setSelectedClass] = useState('all');

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
      },
      {
        className: 'CS301-C',
        averageAttendance: 85.1,
        totalStudents: 42,
        defaulterCount: 1
      }
    ],
    attendanceHeatmap: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      attendanceRate: Math.random() * 40 + 60,
      totalStudents: 40,
      presentStudents: Math.floor(Math.random() * 16 + 24)
    })),
    defaulters: [
      {
        id: "std-003",
        name: "Diya Gupta",
        rollNumber: "1032231231",
        profileImage: "/api/placeholder/40/40",
        attendancePercentage: 73.3,
        totalSessions: 45,
        presentSessions: 33,
        absentSessions: 12,
        medicalLeaves: 3,
        lastAttendance: new Date("2024-12-11"),
        attendanceStatus: 'warning'
      },
      {
        id: "std-005",
        name: "Ananya Reddy",
        rollNumber: "1032231233",
        profileImage: "/api/placeholder/40/40",
        attendancePercentage: 67.8,
        totalSessions: 45,
        presentSessions: 30,
        absentSessions: 15,
        medicalLeaves: 1,
        lastAttendance: new Date("2024-12-09"),
        attendanceStatus: 'critical'
      }
    ]
  };

  const classes = ['all', 'CS301-A', 'CS301-B', 'CS301-C'];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subject Analytics</h1>
            <p className="text-gray-600 mt-1">
              Detailed performance analysis for your subjects
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active Analysis</p>
            <p className="text-lg font-bold text-gray-900">{selectedSubject}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {mockTeacher.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Filter
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className === 'all' ? 'All Classes' : className}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Average Attendance</p>
                <p className="text-2xl font-bold text-blue-600">82.4%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
            <p className="text-xs text-blue-700 mt-2">+2.3% from last month</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Total Students</p>
                <p className="text-2xl font-bold text-green-600">120</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <p className="text-xs text-green-700 mt-2">Across 3 classes</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">Classes Conducted</p>
                <p className="text-2xl font-bold text-yellow-600">45</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
            <p className="text-xs text-yellow-700 mt-2">This semester</p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900">At-Risk Students</p>
                <p className="text-2xl font-bold text-red-600">7</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
            <p className="text-xs text-red-700 mt-2">Below 75% attendance</p>
          </div>
        </div>

        {/* Subject Analytics Component */}
        <SubjectAnalytics
          subjectData={mockSubjectAnalytics}
          showComparison={true}
        />

        {/* Detailed Performance Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Breakdown by Class</h3>
          <div className="space-y-4">
            {mockSubjectAnalytics.classComparison?.map((classPerf, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-900">{classPerf.className}</h4>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    classPerf.averageAttendance >= 80
                      ? 'bg-green-100 text-green-800'
                      : classPerf.averageAttendance >= 70
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {classPerf.averageAttendance.toFixed(1)}% Average
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-gray-900">{classPerf.totalStudents}</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-green-600">
                      {classPerf.totalStudents - classPerf.defaulterCount}
                    </p>
                    <p className="text-sm text-gray-600">Good Attendance</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-2xl font-bold text-red-600">{classPerf.defaulterCount}</p>
                    <p className="text-sm text-gray-600">Need Attention</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${classPerf.averageAttendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">📧 Send Notifications</h4>
              <p className="text-sm text-blue-800 mb-3">
                Alert students and parents about attendance concerns
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Send Bulk Notifications
              </button>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">📊 Generate Report</h4>
              <p className="text-sm text-green-800 mb-3">
                Create detailed attendance report for administration
              </p>
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                Generate Report
              </button>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">🎯 Set Targets</h4>
              <p className="text-sm text-yellow-800 mb-3">
                Set attendance improvement targets for next month
              </p>
              <button className="px-4 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors">
                Set Targets
              </button>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">📈 View Trends</h4>
              <p className="text-sm text-purple-800 mb-3">
                Analyze attendance trends over time
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                View Trends
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}