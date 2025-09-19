'use client';

import React, { useState } from 'react';
import { StudentWithAttendance } from '../../types/teacher';

interface DefaultersAlertProps {
  defaulters: StudentWithAttendance[];
  threshold: number;
  onSendNotification: (studentIds: string[]) => void;
  onViewStudent: (studentId: string) => void;
}

export default function DefaultersAlert({
  defaulters,
  threshold = 75,
  onSendNotification,
  onViewStudent
}: DefaultersAlertProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === displayedDefaulters.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(displayedDefaulters.map(student => student.id));
    }
  };

  const criticalDefaulters = defaulters.filter(student => student.attendancePercentage < 60);
  const warningDefaulters = defaulters.filter(student =>
    student.attendancePercentage >= 60 && student.attendancePercentage < threshold
  );

  const displayedDefaulters = showAll ? defaulters : defaulters.slice(0, 5);

  if (defaulters.length === 0) {
    return (
      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🎉</div>
          <div>
            <h3 className="text-lg font-semibold text-green-900">Great News!</h3>
            <p className="text-sm text-green-700">
              All students are maintaining good attendance (≥{threshold}%)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="mr-2">⚠️</span>
            Attendance Alerts
          </h3>
          <p className="text-sm text-gray-600">
            {defaulters.length} students below {threshold}% attendance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
            {criticalDefaulters.length} Critical
          </span>
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
            {warningDefaulters.length} Warning
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">Critical (&lt;60%)</p>
              <p className="text-2xl font-bold text-red-600">{criticalDefaulters.length}</p>
            </div>
            <div className="text-2xl">🚨</div>
          </div>
          <p className="text-xs text-red-700 mt-2">Immediate attention required</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-900">Warning (60-{threshold-1}%)</p>
              <p className="text-2xl font-bold text-yellow-600">{warningDefaulters.length}</p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
          <p className="text-xs text-yellow-700 mt-2">Monitor closely</p>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selectedStudents.length === displayedDefaulters.length && displayedDefaulters.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            {selectedStudents.length > 0 ? `${selectedStudents.length} selected` : 'Select all'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onSendNotification(selectedStudents)}
            disabled={selectedStudents.length === 0}
            className={`px-3 py-2 text-xs font-medium rounded transition-colors ${
              selectedStudents.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📧 Send Warning
          </button>
          <button
            onClick={() => onSendNotification(criticalDefaulters.map(s => s.id))}
            disabled={criticalDefaulters.length === 0}
            className={`px-3 py-2 text-xs font-medium rounded transition-colors ${
              criticalDefaulters.length > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            🚨 Alert Critical
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {displayedDefaulters.map((student) => {
          const isCritical = student.attendancePercentage < 60;
          const isSelected = selectedStudents.includes(student.id);

          return (
            <div
              key={student.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                isCritical
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelectStudent(student.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCritical ? 'bg-red-200' : 'bg-yellow-200'
                }`}>
                  <span className={`text-sm font-medium ${
                    isCritical ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-600">{student.rollNumber}</p>
                  <p className="text-xs text-gray-500">
                    Last attended: {student.lastAttendance.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    isCritical ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {student.attendancePercentage.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    {student.presentSessions}/{student.totalSessions} sessions
                  </p>
                  {student.medicalLeaves > 0 && (
                    <p className="text-xs text-blue-600">
                      {student.medicalLeaves} medical leaves
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => onViewStudent(student.id)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    👤 View
                  </button>
                  <button
                    onClick={() => onSendNotification([student.id])}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      isCritical
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    📧 Notify
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {defaulters.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          >
            {showAll ? 'Show Less' : `Show All ${defaulters.length} Students`}
          </button>
        </div>
      )}

      {/* Action Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">📋 Recommended Actions</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Send immediate warnings to critical defaulters (&lt;60%)</li>
          <li>• Schedule one-on-one meetings with struggling students</li>
          <li>• Consider offering make-up sessions or extra support</li>
          <li>• Review medical leave applications for validity</li>
        </ul>
      </div>
    </div>
  );
}