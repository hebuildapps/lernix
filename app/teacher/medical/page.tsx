'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { mockMedicalSubmissions, mockMedicalStats } from '../data/mockMedicalData';
import { MedicalLeaveSubmission } from '../types/medical';
import { checkAuth } from '../../utils/auth';

export default function TeacherMedicalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed' | 'all'>('pending');
  const [selectedSubmission, setSelectedSubmission] = useState<MedicalLeaveSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated || userRole !== 'teacher') {
      router.push('/login');
      return;
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceImpactColor = (impact: number) => {
    if (Math.abs(impact) <= 2) return 'text-green-600';
    if (Math.abs(impact) <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredSubmissions = mockMedicalSubmissions.filter(submission => {
    if (activeTab === 'pending') return submission.status === 'pending' || submission.status === 'under_review';
    if (activeTab === 'reviewed') return submission.status === 'approved' || submission.status === 'rejected';
    if (filterStatus !== 'all') return submission.status === filterStatus;
    return true;
  });

  const handleApprove = (submissionId: string) => {
    console.log(`Approving submission: ${submissionId}`);
    alert('Medical leave approved successfully!');
  };

  const handleReject = (submissionId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      console.log(`Rejecting submission: ${submissionId}, Reason: ${reason}`);
      alert('Medical leave rejected with reason provided.');
    }
  };

  const handleViewProof = (submission: MedicalLeaveSubmission) => {
    setSelectedSubmission(submission);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Leave Management</h1>
            <p className="text-gray-600 mt-1">
              Review and manage student medical leave applications
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Pending Reviews</p>
            <p className="text-2xl font-bold text-orange-600">{mockMedicalStats.pendingReview}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockMedicalStats.totalSubmissions}</p>
              <p className="text-sm text-blue-900">Total Submissions</p>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{mockMedicalStats.pendingReview}</p>
              <p className="text-sm text-yellow-900">Pending Review</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{mockMedicalStats.approved}</p>
              <p className="text-sm text-green-900">Approved</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{mockMedicalStats.rejected}</p>
              <p className="text-sm text-red-900">Rejected</p>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{mockMedicalStats.flaggedDocuments}</p>
              <p className="text-sm text-purple-900">Flagged Documents</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ⏳ Pending Review ({mockMedicalStats.pendingReview})
              </button>
              <button
                onClick={() => setActiveTab('reviewed')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'reviewed'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ✅ Reviewed ({mockMedicalStats.approved + mockMedicalStats.rejected})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-gray-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 All Applications
              </button>
            </div>

            {activeTab === 'all' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          </div>

          {/* Medical Leave Submissions */}
          <div className="space-y-4">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {submission.studentName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{submission.studentName}</h4>
                          <p className="text-sm text-gray-600">{submission.rollNumber} • {submission.subject}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(submission.status)}`}>
                          {submission.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Leave Details */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Leave Period</p>
                          <p className="font-medium">
                            {submission.startDate.toLocaleDateString()} - {submission.endDate.toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">{submission.totalDays} days</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Reason</p>
                          <p className="font-medium">{submission.reason}</p>
                        </div>
                      </div>

                      {/* Attendance Impact */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Attendance Impact Analysis</h5>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Current Attendance</p>
                            <p className={`font-bold ${
                              submission.studentAttendance.currentPercentage >= 75 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {submission.studentAttendance.currentPercentage}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Classes Missed</p>
                            <p className="font-bold text-gray-900">
                              {submission.studentAttendance.missedClasses}/{submission.studentAttendance.totalClasses}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Impact of This Leave</p>
                            <p className={`font-bold ${getAttendanceImpactColor(submission.studentAttendance.impactOnAttendance)}`}>
                              {submission.studentAttendance.impactOnAttendance > 0 ? '+' : ''}{submission.studentAttendance.impactOnAttendance}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">After Leave Attendance</p>
                            <p className={`font-bold ${
                              (submission.studentAttendance.currentPercentage + submission.studentAttendance.impactOnAttendance) >= 75
                                ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {(submission.studentAttendance.currentPercentage + submission.studentAttendance.impactOnAttendance).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      {submission.proofDocuments.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-900 mb-2">🤖 AI Document Analysis</h5>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm">
                                <span className="text-blue-700">Confidence Score: </span>
                                <span className={`font-bold ${getConfidenceColor(submission.reviewDetails?.confidenceScore || submission.proofDocuments[0].confidenceScore)}`}>
                                  {submission.reviewDetails?.confidenceScore || submission.proofDocuments[0].confidenceScore}%
                                </span>
                              </p>
                              <p className="text-xs text-blue-600 mt-1">
                                Document Type: {submission.proofDocuments[0].analysisDetails.documentType}
                              </p>
                              {submission.proofDocuments[0].analysisDetails.flags.length > 0 && (
                                <p className="text-xs text-red-600 mt-1">
                                  ⚠️ Flags: {submission.proofDocuments[0].analysisDetails.flags.join(', ')}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleViewProof(submission)}
                              className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              📄 Check Proof
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Review Comments */}
                      {submission.reviewDetails && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-900 mb-1">Review Comments</h5>
                          <p className="text-sm text-gray-700">{submission.reviewDetails.comments}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reviewed by {submission.reviewDetails.reviewedBy} on {submission.reviewDetails.reviewDate.toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {(submission.status === 'pending' || submission.status === 'under_review') && (
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleApprove(submission.id)}
                          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleReject(submission.id)}
                          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          ❌ Reject
                        </button>
                        {submission.proofDocuments.length > 0 && (
                          <button
                            onClick={() => handleViewProof(submission)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            📄 View Proof
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-gray-500">No medical leave applications in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Document Review Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Medical Proof Review - {selectedSubmission.studentName}
                  </h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {selectedSubmission.proofDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedSubmission.proofDocuments.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{doc.fileName}</h4>
                          <span className={`px-2 py-1 text-xs rounded ${
                            doc.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' :
                            doc.verificationStatus === 'suspicious' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {doc.verificationStatus.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Document Type</p>
                            <p className="font-medium">{doc.analysisDetails.documentType}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Confidence Score</p>
                            <p className={`font-bold ${getConfidenceColor(doc.confidenceScore)}`}>
                              {doc.confidenceScore}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Doctor/Hospital</p>
                            <p className="font-medium">
                              {doc.analysisDetails.doctorName || 'N/A'}<br />
                              <span className="text-xs text-gray-500">{doc.analysisDetails.hospitalName || 'N/A'}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Issue Date</p>
                            <p className="font-medium">
                              {doc.analysisDetails.issueDate?.toLocaleDateString() || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {doc.analysisDetails.flags.length > 0 && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm font-medium text-red-900 mb-1">⚠️ Analysis Flags</p>
                            <ul className="text-sm text-red-700 list-disc list-inside">
                              {doc.analysisDetails.flags.map((flag, index) => (
                                <li key={index}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                          <div className="text-6xl mb-2">📄</div>
                          <p className="text-sm text-gray-600">Document Preview</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.fileName} • {doc.fileType.replace('_', ' ')}
                          </p>
                          <button className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            📥 Download Document
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-gray-500">No proof documents uploaded</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                  {(selectedSubmission.status === 'pending' || selectedSubmission.status === 'under_review') && (
                    <>
                      <button
                        onClick={() => {
                          handleApprove(selectedSubmission.id);
                          setSelectedSubmission(null);
                        }}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedSubmission.id);
                          setSelectedSubmission(null);
                        }}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}