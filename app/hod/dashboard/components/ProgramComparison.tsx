'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ProgramWithStats, DateRange } from '../../types/hod';

interface ProgramComparisonProps {
  programs: ProgramWithStats[];
  comparisonMetric: 'attendance' | 'defaulters' | 'faculty_performance';
  timeRange: DateRange;
  onProgramSelect: (programId: string) => void;
}

export default function ProgramComparison({
  programs,
  comparisonMetric,
  onProgramSelect
}: ProgramComparisonProps) {
  const [selectedMetric, setSelectedMetric] = useState<'attendance' | 'defaulters' | 'faculty_performance'>(comparisonMetric);
  const [viewType, setViewType] = useState<'bar' | 'pie'>('bar');

  const getComparisonData = () => {
    return programs.map(program => ({
      name: program.code,
      fullName: program.name,
      value: selectedMetric === 'attendance' ? program.attendancePercentage :
             selectedMetric === 'defaulters' ? program.defaultersCount :
             85 + Math.random() * 10, // Mock faculty performance
      students: program.totalStudents,
      id: program.id
    }));
  };

  const chartData = getComparisonData();

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'attendance': return 'Attendance Rate';
      case 'defaulters': return 'Defaulter Count';
      case 'faculty_performance': return 'Faculty Performance';
    }
  };

  const getMetricUnit = () => {
    return selectedMetric === 'defaulters' ? '' : '%';
  };

  const getBestPerforming = () => {
    if (selectedMetric === 'defaulters') {
      return chartData.reduce((min, program) =>
        program.value < min.value ? program : min
      );
    } else {
      return chartData.reduce((max, program) =>
        program.value > max.value ? program : max
      );
    }
  };

  const getWorstPerforming = () => {
    if (selectedMetric === 'defaulters') {
      return chartData.reduce((max, program) =>
        program.value > max.value ? program : max
      );
    } else {
      return chartData.reduce((min, program) =>
        program.value < min.value ? program : min
      );
    }
  };

  const bestProgram = getBestPerforming();
  const worstProgram = getWorstPerforming();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Program Comparison</h2>
        <div className="flex items-center space-x-4">
          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'attendance' | 'defaulters' | 'faculty_performance')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="attendance">Attendance Rate</option>
            <option value="defaulters">Defaulter Count</option>
            <option value="faculty_performance">Faculty Performance</option>
          </select>

          {/* View Type Selector */}
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setViewType('bar')}
              className={`px-3 py-2 text-sm font-medium ${
                viewType === 'bar'
                  ? 'bg-purple-100 text-purple-700 border-r border-gray-300'
                  : 'text-gray-600 hover:text-gray-800 border-r border-gray-300'
              }`}
            >
              📊 Bar
            </button>
            <button
              onClick={() => setViewType('pie')}
              className={`px-3 py-2 text-sm font-medium ${
                viewType === 'pie'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🥧 Pie
            </button>
          </div>
        </div>
      </div>

      {/* Performance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Best Performing</p>
              <p className="text-lg font-bold text-green-600">{bestProgram.name}</p>
              <p className="text-sm text-green-700">
                {bestProgram.value.toFixed(1)}{getMetricUnit()} {getMetricLabel().toLowerCase()}
              </p>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">Needs Attention</p>
              <p className="text-lg font-bold text-red-600">{worstProgram.name}</p>
              <p className="text-sm text-red-700">
                {worstProgram.value.toFixed(1)}{getMetricUnit()} {getMetricLabel().toLowerCase()}
              </p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {getMetricLabel()} by Program
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)}${getMetricUnit()}`,
                    getMetricLabel()
                  ]}
                  labelFormatter={(label) => {
                    const program = chartData.find(p => p.name === label);
                    return program ? program.fullName : label;
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#8b5cf6"
                  name={getMetricLabel()}
                  onClick={(data) => data.id && onProgramSelect(data.id)}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${Number(value).toFixed(1)}${getMetricUnit()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(data) => data.id && onProgramSelect(data.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}${getMetricUnit()}`, getMetricLabel()]} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {getMetricLabel()}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{program.fullName}</div>
                    <div className="text-sm text-gray-500">{program.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {program.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    selectedMetric === 'defaulters'
                      ? (program.value <= 2 ? 'text-green-600' : program.value <= 5 ? 'text-yellow-600' : 'text-red-600')
                      : (program.value >= 85 ? 'text-green-600' : program.value >= 75 ? 'text-yellow-600' : 'text-red-600')
                  }`}>
                    {program.value.toFixed(1)}{getMetricUnit()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                  <button
                    onClick={() => onProgramSelect(program.id)}
                    className="hover:text-purple-800 font-medium"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}