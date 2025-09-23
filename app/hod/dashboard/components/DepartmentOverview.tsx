'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DepartmentStats, ProgramWithStats } from '../../types/hod';

interface DepartmentOverviewProps {
  departmentId: string;
  programs: ProgramWithStats[];
  overallStats: DepartmentStats;
  onDrillDown: (level: 'program' | 'year' | 'section', id: string) => void;
}

export default function DepartmentOverview({
  departmentId,
  programs,
  overallStats,
  onDrillDown
}: DepartmentOverviewProps) {
  const chartData = programs.map(program => ({
    name: program.code,
    attendance: program.attendancePercentage,
    students: program.totalStudents,
    defaulters: program.defaultersCount
  }));

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Department Overview</h2>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Attendance Trend Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Program-wise Attendance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value}${name === 'attendance' ? '%' : ''}`,
                  name === 'attendance' ? 'Attendance' :
                  name === 'students' ? 'Students' : 'Defaulters'
                ]}
              />
              <Bar dataKey="attendance" fill="#8b5cf6" name="attendance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onDrillDown('program', program.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{program.name}</h4>
                <p className="text-sm text-gray-600">{program.code}</p>
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(program.trend)}`}>
                <span className="text-lg">{getTrendIcon(program.trend)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600">Students</p>
                <p className="text-lg font-semibold text-gray-900">{program.totalStudents}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Sections</p>
                <p className="text-lg font-semibold text-gray-900">{program.sectionsCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Attendance</p>
                <p className={`text-lg font-semibold ${
                  program.attendancePercentage >= 85 ? 'text-green-600' :
                  program.attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {program.attendancePercentage}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Defaulters</p>
                <p className={`text-lg font-semibold ${
                  program.defaultersCount <= 2 ? 'text-green-600' :
                  program.defaultersCount <= 5 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {program.defaultersCount}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onDrillDown('program', program.id);
                }}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trend Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Trend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overallStats.monthlyTrend.map((month, index) => (
            <div key={index} className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">{month.month}</p>
              <p className="text-2xl font-bold text-purple-600">{month.attendanceRate}%</p>
              <p className="text-xs text-purple-700">
                {month.defaultersCount} defaulters
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}