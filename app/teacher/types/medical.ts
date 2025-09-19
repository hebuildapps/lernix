import { StudentWithAttendance } from './teacher';

export interface MedicalLeaveSubmission {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  subject: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedDate: Date;
  proofDocuments: MedicalDocument[];
  studentAttendance: {
    currentPercentage: number;
    missedClasses: number;
    totalClasses: number;
    impactOnAttendance: number; // How much this leave will affect attendance
  };
  reviewDetails?: {
    reviewedBy: string;
    reviewDate: Date;
    comments: string;
    confidenceScore: number; // AI confidence score for medical proof
  };
}

export interface MedicalDocument {
  id: string;
  fileName: string;
  fileType: 'medical_certificate' | 'prescription' | 'hospital_bill' | 'other';
  uploadDate: Date;
  confidenceScore: number; // AI analysis confidence (0-100)
  verificationStatus: 'verified' | 'suspicious' | 'needs_review';
  analysisDetails: {
    documentType: string;
    issueDate?: Date;
    doctorName?: string;
    hospitalName?: string;
    authenticity: 'high' | 'medium' | 'low';
    flags: string[]; // Any red flags detected
  };
}

export interface MedicalLeaveStats {
  totalSubmissions: number;
  pendingReview: number;
  approved: number;
  rejected: number;
  averageProcessingTime: number; // in days
  flaggedDocuments: number;
}