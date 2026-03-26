export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  semester: number;
  department: string;
  profileImage?: string;
  joinedDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject: string;
  timeIn?: string;
  timeOut?: string;
  notes?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface MedicalLeave {
  id: string;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
  submittedDate: string;
  reviewedBy?: string;
  reviewDate?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  studentId: string;
  type: 'attendance' | 'medical' | 'academic' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface AcademicContent {
  id: string;
  type: 'lecture' | 'assignment' | 'quiz' | 'exam' | 'material';
  title: string;
  description: string;
  dueDate?: string;
  attachments?: string[];
  publishedDate: string;
  status: 'published' | 'draft' | 'archived';
}

export interface AttendanceStats {
  totalClasses: number;
  attended: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}