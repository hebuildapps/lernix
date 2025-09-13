'use client';

import React, { useState } from 'react';
import { AcademicContent, Subject } from '../../types';

interface AcademicHubProps {
  content: AcademicContent[];
  subjects: Subject[];
}

export default function AcademicHub({ content, subjects }: AcademicHubProps) {
  const [filter, setFilter] = useState<'all' | 'lecture' | 'assignment' | 'quiz' | 'exam' | 'material'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredContent = content.filter(item => {
    const typeMatch = filter === 'all' || item.type === filter;
    const subjectMatch = selectedSubject === 'all' || item.subjectId === selectedSubject;
    return typeMatch && subjectMatch && item.status === 'published';
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return '🎓';
      case 'assignment':
        return '📝';
      case 'quiz':
        return '❓';
      case 'exam':
        return '📊';
      case 'material':
        return '📚';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assignment':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'quiz':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'material':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isUpcoming = (dueDate?: string) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const typeOptions = [
    { value: 'all', label: 'All Content', count: content.length },
    { value: 'lecture', label: 'Lectures', count: content.filter(c => c.type === 'lecture').length },
    { value: 'assignment', label: 'Assignments', count: content.filter(c => c.type === 'assignment').length },
    { value: 'quiz', label: 'Quizzes', count: content.filter(c => c.type === 'quiz').length },
    { value: 'exam', label: 'Exams', count: content.filter(c => c.type === 'exam').length },
    { value: 'material', label: 'Materials', count: content.filter(c => c.type === 'material').length }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Content Hub</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value as 'all' | 'lecture' | 'assignment' | 'quiz' | 'exam' | 'material')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.code} - {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                {isUpcoming(item.dueDate) && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    Due Soon!
                  </span>
                )}
              </div>

              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>

              <div className="space-y-2 mb-4">
                <p className="text-xs text-blue-600 font-medium">
                  {getSubjectName(item.subjectId)}
                </p>
                <p className="text-xs text-gray-500">
                  Published: {new Date(item.publishedDate).toLocaleDateString()}
                </p>
                {item.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {item.attachments && item.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Attachments:</p>
                  <div className="space-y-1">
                    {item.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm">📎</span>
                        <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer truncate">
                          {attachment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                {item.type === 'assignment' && (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Submit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-lg">No content found for the selected filters</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters or check back later for new content
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">📝</div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {content.filter(c => c.type === 'assignment' && c.dueDate && new Date(c.dueDate) > new Date()).length}
              </p>
              <p className="text-sm text-gray-600">Pending Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">❓</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {content.filter(c => c.type === 'quiz' && c.dueDate && new Date(c.dueDate) > new Date()).length}
              </p>
              <p className="text-sm text-gray-600">Upcoming Quizzes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🎓</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {content.filter(c => c.type === 'lecture').length}
              </p>
              <p className="text-sm text-gray-600">Total Lectures</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">📚</div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {content.filter(c => c.type === 'material').length}
              </p>
              <p className="text-sm text-gray-600">Study Materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}