'use client';

import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import AttendanceMarking from '../../dashboard/components/AttendanceMarking';
import { mockStudentsCS301, mockTeacher } from '../../data/mockTeacherData';

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('CS301-A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTopic, setSessionTopic] = useState('');

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent') => {
    console.log(`Marking ${studentId} as ${status}`);
  };

  const classes = ['CS301-A', 'CS301-B', 'CS301-C'];
  const subjects = mockTeacher.subjects;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
            <p className="text-gray-600 mt-1">
              Record student attendance for today&apos;s session
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Session Date</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date(sessionDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Session Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic (Optional)
              </label>
              <input
                type="text"
                value={sessionTopic}
                onChange={(e) => setSessionTopic(e.target.value)}
                placeholder="Today's topic..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Attendance Marking Component */}
        <AttendanceMarking
          students={mockStudentsCS301}
          onMarkAttendance={handleMarkAttendance}
          sessionDate={new Date(sessionDate)}
        />

        {/* Additional Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              📊 View Previous Sessions
            </button>
            <button className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              📋 Export Attendance
            </button>
            <button className="px-4 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              🔄 Import from Last Session
            </button>
            <button className="px-4 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              📧 Send Absent Notifications
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}