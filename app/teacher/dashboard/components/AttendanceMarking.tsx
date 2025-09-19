'use client';

import React, { useState } from 'react';
import { StudentWithAttendance } from '../../types/teacher';

interface AttendanceMarkingProps {
  classId: string;
  subjectId: string;
  students: StudentWithAttendance[];
  onMarkAttendance: (studentId: string, status: 'present' | 'absent') => void;
  sessionDate?: Date;
}

export default function AttendanceMarking({
  classId: _classId,
  subjectId: _subjectId,
  students,
  onMarkAttendance,
  sessionDate = new Date()
}: AttendanceMarkingProps) {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent'>>({});
  const [bulkAction, setBulkAction] = useState<'present' | 'absent' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
    onMarkAttendance(studentId, status);
  };

  const handleBulkAttendance = (status: 'present' | 'absent') => {
    const newAttendanceMap: Record<string, 'present' | 'absent'> = {};
    filteredStudents.forEach(student => {
      newAttendanceMap[student.id] = status;
      onMarkAttendance(student.id, status);
    });
    setAttendanceMap(prev => ({ ...prev, ...newAttendanceMap }));
    setBulkAction(status);
    setTimeout(() => setBulkAction(null), 1000);
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Attendance submitted successfully!');
    } catch (_error) {
      alert('Error submitting attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = Object.values(attendanceMap).filter(status => status === 'present').length;
  const absentCount = Object.values(attendanceMap).filter(status => status === 'absent').length;
  const totalMarked = presentCount + absentCount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
          <p className="text-sm text-gray-600">
            {sessionDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-xl font-bold text-gray-900">{students.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Marked</p>
            <p className="text-xl font-bold text-blue-600">{totalMarked}</p>
          </div>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search students by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleBulkAttendance('present')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              bulkAction === 'present'
                ? 'bg-green-600 text-white'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            ✅ Mark All Present
          </button>
          <button
            onClick={() => handleBulkAttendance('absent')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              bulkAction === 'absent'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            ❌ Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{presentCount}</p>
          <p className="text-xs text-gray-600">Present</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{absentCount}</p>
          <p className="text-xs text-gray-600">Absent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">{students.length - totalMarked}</p>
          <p className="text-xs text-gray-600">Unmarked</p>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filteredStudents.map((student) => {
          const attendanceStatus = attendanceMap[student.id];

          return (
            <div
              key={student.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                attendanceStatus === 'present'
                  ? 'border-green-200 bg-green-50'
                  : attendanceStatus === 'absent'
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                  <p className="text-xs text-gray-600">{student.rollNumber}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  student.attendanceStatus === 'good' ? 'bg-green-400' :
                  student.attendanceStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`} title={`Overall attendance: ${student.attendancePercentage}%`}></div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleAttendanceChange(student.id, 'present')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                    attendanceStatus === 'present'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  ✅ Present
                </button>
                <button
                  onClick={() => handleAttendanceChange(student.id, 'absent')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                    attendanceStatus === 'absent'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                  }`}
                >
                  ❌ Absent
                </button>
              </div>

              <div className="mt-2 text-center">
                <span className={`text-xs px-2 py-1 rounded ${
                  student.attendancePercentage >= 75
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {student.attendancePercentage}% overall
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {totalMarked} of {students.length} students marked
        </div>
        <button
          onClick={submitAttendance}
          disabled={totalMarked === 0 || isSubmitting}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
            totalMarked > 0 && !isSubmitting
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round((totalMarked / students.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(totalMarked / students.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}