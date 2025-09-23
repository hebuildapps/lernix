'use client';

import React, { useState } from 'react';
import { AttendanceCorrection } from '../../types/hod';

interface ApprovalQueueProps {
  pendingCorrections: AttendanceCorrection[];
  onApprove: (correctionId: string, comments?: string) => void;
  onReject: (correctionId: string, reason: string) => void;
  onBulkProcess: (correctionIds: string[], action: 'approve' | 'reject') => void;
}

export default function ApprovalQueue({
  pendingCorrections,
  onApprove,
  onReject,
  onBulkProcess
}: ApprovalQueueProps) {
  const [selectedCorrections, setSelectedCorrections] = useState<string[]>([]);
  const [activeCorrection, setActiveCorrection] = useState<string | null>(null);
  const [approvalComments, setApprovalComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const handleSelectCorrection = (correctionId: string) => {
    setSelectedCorrections(prev =>
      prev.includes(correctionId)
        ? prev.filter(id => id !== correctionId)
        : [...prev, correctionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCorrections.length === pendingCorrections.length) {
      setSelectedCorrections([]);
    } else {
      setSelectedCorrections(pendingCorrections.map(c => c.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return '🚨';
      case 'high': return '⚡';
      case 'medium': return '⚠️';
      case 'low': return '📝';
      default: return '📄';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedCorrections = pendingCorrections.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Approval Queue</h2>
          <p className="text-sm text-gray-600">
            {pendingCorrections.length} pending attendance corrections
          </p>
        </div>

        {pendingCorrections.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-3 py-2 text-sm font-medium text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50"
            >
              Bulk Actions
            </button>
            {selectedCorrections.length > 0 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {selectedCorrections.length} selected
              </span>
            )}
          </div>
        )}
      </div>

      {showBulkActions && selectedCorrections.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-purple-900">
              {selectedCorrections.length} corrections selected
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onBulkProcess(selectedCorrections, 'approve');
                  setSelectedCorrections([]);
                  setShowBulkActions(false);
                }}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
              >
                Approve All
              </button>
              <button
                onClick={() => {
                  onBulkProcess(selectedCorrections, 'reject');
                  setSelectedCorrections([]);
                  setShowBulkActions(false);
                }}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Reject All
              </button>
              <button
                onClick={() => {
                  setSelectedCorrections([]);
                  setShowBulkActions(false);
                }}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkActions && (
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={selectedCorrections.length === pendingCorrections.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700">Select All</span>
          </label>
        </div>
      )}

      <div className="space-y-4">
        {sortedCorrections.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-gray-500">No pending corrections</p>
            <p className="text-sm text-gray-400">All attendance corrections have been processed</p>
          </div>
        ) : (
          sortedCorrections.map((correction) => (
            <div
              key={correction.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  {showBulkActions && (
                    <input
                      type="checkbox"
                      checked={selectedCorrections.includes(correction.id)}
                      onChange={() => handleSelectCorrection(correction.id)}
                      className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(correction.priority)}`}>
                        {getPriorityIcon(correction.priority)} {correction.priority.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        Request #{correction.requestId}
                      </span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-1">
                      {correction.studentName} - {correction.subjectName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {correction.className} | {formatDate(correction.originalDate)}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Original Status</p>
                        <p className={`text-sm font-medium ${
                          correction.originalStatus === 'present' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {correction.originalStatus.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Requested Status</p>
                        <p className={`text-sm font-medium ${
                          correction.requestedStatus === 'present' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {correction.requestedStatus.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Reason</p>
                      <p className="text-sm text-gray-700">{correction.reason}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Justification</p>
                      <p className="text-sm text-gray-700">{correction.justification}</p>
                    </div>

                    {correction.documents && correction.documents.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Supporting Documents</p>
                        <div className="flex space-x-2">
                          {correction.documents.map((doc, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              📎 {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Requested by: {correction.facultyName} | {formatDate(correction.requestDate)}
                    </div>
                  </div>
                </div>
              </div>

              {activeCorrection === correction.id && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approval Comments (Optional)
                      </label>
                      <textarea
                        value={approvalComments}
                        onChange={(e) => setApprovalComments(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={3}
                        placeholder="Add any comments for approval..."
                      />
                      <button
                        onClick={() => {
                          onApprove(correction.id, approvalComments);
                          setActiveCorrection(null);
                          setApprovalComments('');
                        }}
                        className="w-full mt-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                      >
                        Approve Request
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason (Required)
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        rows={3}
                        placeholder="Provide reason for rejection..."
                      />
                      <button
                        onClick={() => {
                          if (rejectionReason.trim()) {
                            onReject(correction.id, rejectionReason);
                            setActiveCorrection(null);
                            setRejectionReason('');
                          }
                        }}
                        disabled={!rejectionReason.trim()}
                        className="w-full mt-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Reject Request
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeCorrection !== correction.id && (
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setActiveCorrection(correction.id)}
                    className="px-4 py-2 text-purple-600 border border-purple-300 text-sm font-medium rounded-md hover:bg-purple-50"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => onApprove(correction.id)}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                  >
                    Quick Approve
                  </button>
                </div>
              )}

              {activeCorrection === correction.id && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setActiveCorrection(null);
                      setApprovalComments('');
                      setRejectionReason('');
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
                  >
                    Cancel Review
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}