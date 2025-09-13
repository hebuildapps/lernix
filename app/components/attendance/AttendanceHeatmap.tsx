'use client';

import React from 'react';
import { AttendanceRecord } from '../../types';

interface AttendanceHeatmapProps {
  attendanceData: AttendanceRecord[];
}

export default function AttendanceHeatmap({ attendanceData }: AttendanceHeatmapProps) {
  const getWeeksInYear = () => {
    const weeks = [];
    const startDate = new Date('2024-09-01');
    const endDate = new Date();
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 7)) {
      weeks.push(new Date(date));
    }
    return weeks;
  };

  const getDaysInWeek = (weekStart: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAttendanceForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayAttendance = attendanceData.filter(record => record.date === dateStr);
    
    if (dayAttendance.length === 0) return null;
    
    const presentCount = dayAttendance.filter(record => record.status === 'present').length;
    const totalClasses = dayAttendance.length;
    
    return {
      attendance: presentCount / totalClasses,
      records: dayAttendance
    };
  };

  const getColorIntensity = (attendance: number | null) => {
    if (attendance === null) return 'bg-gray-100';
    if (attendance >= 0.9) return 'bg-green-500';
    if (attendance >= 0.75) return 'bg-green-400';
    if (attendance >= 0.5) return 'bg-yellow-400';
    if (attendance >= 0.25) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const weeks = getWeeksInYear();
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Heatmap</h3>
        <p className="text-sm text-gray-600">Daily attendance overview for the current semester</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex items-center mb-4">
            <div className="w-12"></div>
            {weeks.map((week, index) => (
              <div key={index} className="w-12 text-xs text-gray-500 text-center">
                {week.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            ))}
          </div>

          {weekdays.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-gray-500 text-right pr-2">{day}</div>
              {weeks.map((week, weekIndex) => {
                const daysInWeek = getDaysInWeek(week);
                const currentDay = daysInWeek[dayIndex];
                const attendanceData = getAttendanceForDate(currentDay);
                const isToday = currentDay.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-10 h-10 m-0.5 rounded-sm ${getColorIntensity(
                      attendanceData?.attendance || null
                    )} ${isToday ? 'ring-2 ring-blue-500' : ''} hover:scale-110 transition-transform cursor-pointer`}
                    title={`${currentDay.toLocaleDateString()} - ${
                      attendanceData 
                        ? `${Math.round(attendanceData.attendance * 100)}% attendance (${attendanceData.records.length} classes)`
                        : 'No classes'
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          </div>
          <span className="text-sm text-gray-600">More</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Current semester • {attendanceData.length} total records
        </div>
      </div>
    </div>
  );
}