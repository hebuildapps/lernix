import { MedicalLeaveSubmission, MedicalDocument, MedicalLeaveStats } from '../types/medical';

export const mockMedicalDocuments: MedicalDocument[] = [
  {
    id: 'doc-001',
    fileName: 'medical_certificate_heramb.pdf',
    fileType: 'medical_certificate',
    uploadDate: new Date('2024-12-10'),
    confidenceScore: 92,
    verificationStatus: 'verified',
    analysisDetails: {
      documentType: 'Medical Certificate',
      issueDate: new Date('2024-12-09'),
      doctorName: 'Dr. Rajesh Kumar',
      hospitalName: 'Apollo Hospital, Pune',
      authenticity: 'high',
      flags: []
    }
  },
  {
    id: 'doc-002',
    fileName: 'prescription_diya.jpg',
    fileType: 'prescription',
    uploadDate: new Date('2024-12-08'),
    confidenceScore: 67,
    verificationStatus: 'needs_review',
    analysisDetails: {
      documentType: 'Prescription',
      issueDate: new Date('2024-12-07'),
      doctorName: 'Dr. Priya Sharma',
      hospitalName: 'Local Clinic',
      authenticity: 'medium',
      flags: ['Image quality low', 'Partial information visible']
    }
  },
  {
    id: 'doc-003',
    fileName: 'hospital_bill_ananya.pdf',
    fileType: 'hospital_bill',
    uploadDate: new Date('2024-12-05'),
    confidenceScore: 34,
    verificationStatus: 'suspicious',
    analysisDetails: {
      documentType: 'Hospital Bill',
      issueDate: new Date('2024-12-04'),
      hospitalName: 'City Hospital',
      authenticity: 'low',
      flags: ['Date inconsistency', 'Unusual formatting', 'Missing official seal']
    }
  }
];

export const mockMedicalSubmissions: MedicalLeaveSubmission[] = [
  {
    id: 'med-001',
    studentId: 'std-001',
    studentName: 'Heramb Salunkhe',
    rollNumber: '1032231229',
    subject: 'Data Structures & Algorithms',
    startDate: new Date('2024-12-09'),
    endDate: new Date('2024-12-11'),
    totalDays: 3,
    reason: 'Fever and flu symptoms requiring rest',
    status: 'approved',
    submittedDate: new Date('2024-12-08'),
    proofDocuments: [mockMedicalDocuments[0]],
    studentAttendance: {
      currentPercentage: 88.9,
      missedClasses: 5,
      totalClasses: 45,
      impactOnAttendance: -2.2
    },
    reviewDetails: {
      reviewedBy: 'Dr. Priya Sharma',
      reviewDate: new Date('2024-12-09'),
      comments: 'Valid medical certificate from reputable hospital. Approved.',
      confidenceScore: 92
    }
  },
  {
    id: 'med-002',
    studentId: 'std-003',
    studentName: 'Diya Gupta',
    rollNumber: '1032231231',
    subject: 'Data Structures & Algorithms',
    startDate: new Date('2024-12-07'),
    endDate: new Date('2024-12-09'),
    totalDays: 3,
    reason: 'Stomach infection and medication side effects',
    status: 'under_review',
    submittedDate: new Date('2024-12-06'),
    proofDocuments: [mockMedicalDocuments[1]],
    studentAttendance: {
      currentPercentage: 73.3,
      missedClasses: 12,
      totalClasses: 45,
      impactOnAttendance: -4.4
    }
  },
  {
    id: 'med-003',
    studentId: 'std-005',
    studentName: 'Ananya Reddy',
    rollNumber: '1032231233',
    subject: 'Data Structures & Algorithms',
    startDate: new Date('2024-12-04'),
    endDate: new Date('2024-12-06'),
    totalDays: 3,
    reason: 'Emergency surgery required',
    status: 'rejected',
    submittedDate: new Date('2024-12-03'),
    proofDocuments: [mockMedicalDocuments[2]],
    studentAttendance: {
      currentPercentage: 67.8,
      missedClasses: 15,
      totalClasses: 45,
      impactOnAttendance: -6.7
    },
    reviewDetails: {
      reviewedBy: 'Dr. Priya Sharma',
      reviewDate: new Date('2024-12-05'),
      comments: 'Document authenticity questionable. Multiple red flags detected in medical certificate. Rejected pending proper documentation.',
      confidenceScore: 34
    }
  },
  {
    id: 'med-004',
    studentId: 'std-008',
    studentName: 'Ishaan Kumar',
    rollNumber: '1032231236',
    subject: 'Data Structures & Algorithms',
    startDate: new Date('2024-12-12'),
    endDate: new Date('2024-12-14'),
    totalDays: 3,
    reason: 'Family emergency - grandfather hospitalized',
    status: 'pending',
    submittedDate: new Date('2024-12-11'),
    proofDocuments: [],
    studentAttendance: {
      currentPercentage: 77.8,
      missedClasses: 10,
      totalClasses: 45,
      impactOnAttendance: -4.4
    }
  },
  {
    id: 'med-005',
    studentId: 'std-010',
    studentName: 'Rayan Ahmed',
    rollNumber: '1032231238',
    subject: 'Database Management Systems',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-03'),
    totalDays: 3,
    reason: 'Migraine and severe headache',
    status: 'approved',
    submittedDate: new Date('2024-11-30'),
    proofDocuments: [],
    studentAttendance: {
      currentPercentage: 64.4,
      missedClasses: 16,
      totalClasses: 45,
      impactOnAttendance: -6.7
    },
    reviewDetails: {
      reviewedBy: 'Dr. Priya Sharma',
      reviewDate: new Date('2024-12-01'),
      comments: 'Chronic condition documented in student records. Approved with recommendation for medical consultation.',
      confidenceScore: 85
    }
  }
];

export const mockMedicalStats: MedicalLeaveStats = {
  totalSubmissions: 15,
  pendingReview: 3,
  approved: 8,
  rejected: 2,
  averageProcessingTime: 2.5,
  flaggedDocuments: 4
};