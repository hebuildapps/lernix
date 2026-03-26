export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  subjects: string[];
  profileImage?: string;
  joinedDate: string;
}

export interface StudentWithAttendance {
  id: string;
  name: string;
  rollNumber: string;
  profileImage?: string;
  attendancePercentage: number;
  totalSessions: number;
  presentSessions: number;
  absentSessions: number;
  medicalLeaves: number;
  lastAttendance: Date;
  attendanceStatus: 'good' | 'warning' | 'critical';
}

export interface BasicSession {
  id: string;
  date: Date;
  subject: string;
  class: string;
  topic?: string;
  attendanceCount: number;
  totalStudents: number;
  status: 'completed' | 'cancelled';
}

export interface SubjectAnalytics {
  subjectName: string;
  totalClasses: number;
  averageAttendance: number;
  classComparison?: ClassPerformance[];
  attendanceHeatmap: AttendanceHeatmapData[];
  defaulters: StudentWithAttendance[];
}

export interface ClassPerformance {
  className: string;
  averageAttendance: number;
  totalStudents: number;
  defaulterCount: number;
}

export interface AttendanceHeatmapData {
  date: string;
  attendanceRate: number;
  totalStudents: number;
  presentStudents: number;
}