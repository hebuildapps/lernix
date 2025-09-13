'use client';

import React from 'react';
import { AttendanceRecord } from '../../types';

interface RecentAttendanceProps {
  attendanceData: AttendanceRecord[];
}

export default function RecentAttendance({ attendanceData }: RecentAttendanceProps) {
  const recentRecords = attendanceData.slice(0, 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'late':
        return '⏰';
      case 'excused':
        return '📋';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Attendance</h3>
        <p className="text-sm text-gray-600">Latest attendance records across all subjects</p>
      </div>

      <div className="space-y-4">
        {recentRecords.map((record) => (
          <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getStatusIcon(record.status)}</div>
              <div>
                <h4 className="font-medium text-gray-900">{record.subject}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                {record.timeIn && record.timeOut && (
                  <p className="text-xs text-gray-500">
                    {record.timeIn} - {record.timeOut}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
              {record.notes && (
                <p className="text-xs text-gray-500 mt-1 max-w-32 truncate">
                  {record.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {recentRecords.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-500">No attendance records found</p>
        </div>
      )}

      {attendanceData.length > 10 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium text-sm">
            View All Attendance Records ({attendanceData.length} total)
          </button>
        </div>
      )}
    </div>
  );
}