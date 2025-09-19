'use client';

import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import AcademicCalendar from '../../dashboard/components/AcademicCalendar';
import PlanningAssistant from '../../dashboard/components/PlanningAssistant';
import {
  mockHolidays,
  mockLongWeekends,
  mockPlanningSuggestions,
  mockAcademicEvents
} from '../../data/mockTeacherData';

export default function AcademicPlanningPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePlanningSelect = (suggestion: unknown) => {
    console.log('Planning suggestion selected:', suggestion);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Planning</h1>
            <p className="text-gray-600 mt-1">
              Plan your academic activities around holidays and long weekends
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Previous
            </button>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2">
              <p className="text-lg font-bold text-gray-900">
                {monthNames[currentMonth]} {currentYear}
              </p>
            </div>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Planning Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">This Month&apos;s Holidays</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockHolidays.filter(h =>
                    h.date.getMonth() === currentMonth && h.date.getFullYear() === currentYear
                  ).length}
                </p>
              </div>
              <div className="text-3xl">🎉</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900">Long Weekends</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockLongWeekends.filter(lw =>
                    lw.startDate.getMonth() === currentMonth && lw.startDate.getFullYear() === currentYear
                  ).length}
                </p>
              </div>
              <div className="text-3xl">🌴</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Optimal Dates</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockPlanningSuggestions.filter(s => s.type === 'optimal_date').length}
                </p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        {/* Main Planning Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="xl:col-span-2">
            <AcademicCalendar
              month={currentMonth}
              year={currentYear}
              holidays={mockHolidays}
              events={mockAcademicEvents}
              onDateSelect={handleDateSelect}
              showPlanningInsights={true}
            />

            {/* Event Planning Form */}
            {selectedDate && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Plan Event for {selectedDate.toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Assignment Deadline</option>
                      <option>Test/Quiz</option>
                      <option>Exam</option>
                      <option>Project Submission</option>
                      <option>Presentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Data Structures & Algorithms</option>
                      <option>Database Management Systems</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter event title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Event description..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Schedule Event
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Planning Assistant */}
          <div>
            <PlanningAssistant
              currentMonth={currentMonth}
              currentYear={currentYear}
              suggestions={mockPlanningSuggestions}
              onPlanningSelect={handlePlanningSelect}
            />
          </div>
        </div>

        {/* Quick Planning Tools */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Planning Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-blue-800">Bulk Schedule Assignments</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-green-800">Plan Test Schedule</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="text-2xl">📅</span>
              <span className="text-sm font-medium text-purple-800">Set Semester Calendar</span>
            </button>
            <button className="flex flex-col items-center space-y-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <span className="text-2xl">🔔</span>
              <span className="text-sm font-medium text-orange-800">Schedule Reminders</span>
            </button>
          </div>
        </div>

        {/* Upcoming Events Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events & Deadlines</h3>
          <div className="space-y-3">
            {mockAcademicEvents.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {event.date.toLocaleDateString()}
                  </p>
                  <span className={`px-2 py-1 text-xs rounded ${
                    event.isOptimal
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {event.isOptimal ? 'Optimal' : 'Review Timing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}