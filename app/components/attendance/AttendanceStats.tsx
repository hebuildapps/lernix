'use client';

import React from 'react';
import { AttendanceRecord } from '../../types';
import { calculateAttendanceStats } from '../../utils/attendanceUtils';

interface AttendanceStatsProps {
  attendanceData: AttendanceRecord[];
}

export default function AttendanceStats({ attendanceData }: AttendanceStatsProps) {
  const stats = calculateAttendanceStats(attendanceData);

  const statItems = [
    {
      label: 'Overall Attendance',
      value: `${stats.attendanceRate.toFixed(1)}%`,
      color: stats.attendanceRate >= 75 ? 'text-emerald-700' : 'text-red-700',
      bgColor: stats.attendanceRate >= 75 ? 'bg-emerald-50' : 'bg-red-50',
      icon: '📊'
    },
    {
      label: 'Classes Attended',
      value: stats.attended.toString(),
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      icon: '✅'
    },
    {
      label: 'Total Classes',
      value: stats.totalClasses.toString(),
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      icon: '📚'
    },
    {
      label: 'Late Arrivals',
      value: stats.late.toString(),
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      icon: '⏰'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <div key={index} className={`${item.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className={`text-2xl font-bold ${item.color} mt-1`}>{item.value}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
          
          {item.label === 'Overall Attendance' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    stats.attendanceRate >= 75 ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${Math.min(stats.attendanceRate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.attendanceRate >= 75 ? 'Good standing' : 'Below required 75%'}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}