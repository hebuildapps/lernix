'use client';

import React, { useState } from 'react';
import { Holiday, AcademicEvent } from '../../types/calendar';

interface AcademicCalendarProps {
  month: number;
  year: number;
  holidays: Holiday[];
  events: AcademicEvent[];
  onDateSelect?: (date: Date) => void;
  showPlanningInsights?: boolean;
}

export default function AcademicCalendar({
  month,
  year,
  holidays = [],
  events = [],
  onDateSelect,
  showPlanningInsights = true
}: AcademicCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isHoliday = (date: Date) => {
    return holidays.some(holiday =>
      holiday.date.toDateString() === date.toDateString()
    );
  };

  const isLongWeekend = (date: Date) => {
    return holidays.some(holiday =>
      holiday.date.toDateString() === date.toDateString() && holiday.isLongWeekend
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  };

  const getHolidaysForDate = (date: Date) => {
    return holidays.filter(holiday =>
      holiday.date.toDateString() === date.toDateString()
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const dayIsHoliday = isHoliday(date);
      const dayIsLongWeekend = isLongWeekend(date);
      const dayEvents = getEventsForDate(date);
      const dayHolidays = getHolidaysForDate(date);

      let dayClasses = 'h-10 w-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ';

      if (isToday) {
        dayClasses += 'bg-blue-600 text-white font-semibold ';
      } else if (dayIsLongWeekend) {
        dayClasses += 'bg-red-100 text-red-800 font-medium hover:bg-red-200 ';
      } else if (dayIsHoliday) {
        dayClasses += 'bg-orange-100 text-orange-800 font-medium hover:bg-orange-200 ';
      } else if (dayEvents.length > 0) {
        dayClasses += 'bg-green-100 text-green-800 hover:bg-green-200 ';
      } else {
        dayClasses += 'text-gray-700 hover:bg-gray-100 ';
      }

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => {
            setSelectedDate(date);
            onDateSelect?.(date);
          }}
          title={
            dayHolidays.length > 0
              ? dayHolidays.map(h => h.name).join(', ')
              : dayEvents.length > 0
                ? dayEvents.map(e => e.title).join(', ')
                : ''
          }
        >
          {day}
          {dayEvents.length > 0 && (
            <div className="absolute mt-6 w-1 h-1 bg-blue-600 rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  const upcomingHolidays = holidays
    .filter(holiday => holiday.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Academic Calendar - {monthNames[month]} {year}
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <span className="text-gray-600">Long Weekend</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-orange-100 rounded"></div>
            <span className="text-gray-600">Holiday</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span className="text-gray-600">Events</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative">
        {renderCalendarDays()}
      </div>

      {showPlanningInsights && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Holidays</h4>
            <div className="space-y-2">
              {upcomingHolidays.length > 0 ? (
                upcomingHolidays.map(holiday => (
                  <div key={holiday.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{holiday.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      holiday.isLongWeekend
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {holiday.date.toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No upcoming holidays</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Events</h4>
            <div className="space-y-2">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate">{event.title}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.isOptimal
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.date.toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          {getHolidaysForDate(selectedDate).length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-red-600 font-medium">Holidays:</p>
              {getHolidaysForDate(selectedDate).map(holiday => (
                <p key={holiday.id} className="text-xs text-gray-600">{holiday.name}</p>
              ))}
            </div>
          )}
          {getEventsForDate(selectedDate).length > 0 && (
            <div>
              <p className="text-xs text-green-600 font-medium">Events:</p>
              {getEventsForDate(selectedDate).map(event => (
                <p key={event.id} className="text-xs text-gray-600">{event.title}</p>
              ))}
            </div>
          )}
          {getHolidaysForDate(selectedDate).length === 0 && getEventsForDate(selectedDate).length === 0 && (
            <p className="text-xs text-gray-500">No events or holidays on this day</p>
          )}
        </div>
      )}
    </div>
  );
}