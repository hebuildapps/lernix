'use client';

import React from 'react';
import { MedicalLeave } from '../../types';

interface MedicalLeaveListProps {
  leaves: MedicalLeave[];
}

export default function MedicalLeaveList({ leaves }: MedicalLeaveListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
      default:
        return '❓';
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const sortedLeaves = leaves.sort((a, b) => 
    new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Leave History</h3>
        <p className="text-sm text-gray-600">Your medical leave applications and their status</p>
      </div>

      <div className="space-y-4">
        {sortedLeaves.map((leave) => (
          <div key={leave.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getStatusIcon(leave.status)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(leave.status)}`}>
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{leave.reason}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Duration: {calculateDuration(leave.startDate, leave.endDate)} days</span>
                    <span>Submitted: {new Date(leave.submittedDate).toLocaleDateString()}</span>
                    {leave.reviewDate && (
                      <span>Reviewed: {new Date(leave.reviewDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {leave.documents && leave.documents.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {leave.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      📎 {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {leave.reviewedBy && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Reviewed by:</span> {leave.reviewedBy}
                </p>
                {leave.notes && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Notes:</span> {leave.notes}
                  </p>
                )}
              </div>
            )}

            {leave.status === 'pending' && (
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Edit Request
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium">
                  Cancel Request
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedLeaves.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏥</div>
          <p className="text-gray-500 text-lg">No medical leave applications found</p>
          <p className="text-gray-400 text-sm mt-2">
            When you submit medical leave requests, they will appear here
          </p>
        </div>
      )}

      {sortedLeaves.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">
                {sortedLeaves.filter(l => l.status === 'approved').length}
              </p>
              <p className="text-sm text-green-600">Approved</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-yellow-600">
                {sortedLeaves.filter(l => l.status === 'pending').length}
              </p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-600">
                {sortedLeaves.filter(l => l.status === 'rejected').length}
              </p>
              <p className="text-sm text-red-600">Rejected</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}