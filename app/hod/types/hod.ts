export interface DepartmentStats {
  totalStudents: number;
  totalFaculty: number;
  totalPrograms: number;
  overallAttendance: number;
  criticalDefaulters: number;
  facultyCompliance: number;
  programsData: ProgramSummary[];
  monthlyTrend: MonthlyTrend[];
}

export interface ProgramSummary {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
  attendancePercentage: number;
  defaultersCount: number;
  sectionsCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ProgramWithStats extends ProgramSummary {
  yearWiseData: YearStats[];
  sectionWiseData: SectionStats[];
  facultyAssigned: FacultySummary[];
  subjectsOffered: SubjectSummary[];
}

export interface YearStats {
  year: string; // FE, SE, TE, BE
  totalStudents: number;
  attendancePercentage: number;
  defaultersCount: number;
  sectionsCount: number;
}

export interface SectionStats {
  sectionId: string;
  sectionName: string; // A, B, C, etc.
  year: string;
  totalStudents: number;
  attendancePercentage: number;
  defaultersCount: number;
  classTeacher: FacultySummary;
}

export interface FacultySummary {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
}

export interface FacultyWithPerformance extends FacultySummary {
  subjects: SubjectAssignment[];
  classesAssigned: ClassAssignment[];
  attendanceUpdateCompliance: number;
  lastUpdateDate: Date;
  performanceRating: 'excellent' | 'good' | 'needs_improvement';
  totalStudentsHandled: number;
  averageClassAttendance: number;
  notificationsSent: number;
  responsiveness: number; // 0-100
}

export interface SubjectAssignment {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  classes: string[];
  totalStudents: number;
  averageAttendance: number;
}

export interface ClassAssignment {
  classId: string;
  className: string;
  year: string;
  section: string;
  program: string;
  role: 'subject_teacher' | 'class_teacher';
  totalStudents: number;
  averageAttendance: number;
}

export interface SubjectSummary {
  id: string;
  name: string;
  code: string;
  credits: number;
  faculty: FacultySummary;
  classes: string[];
}

export interface MonthlyTrend {
  month: string;
  attendanceRate: number;
  defaultersCount: number;
  facultyCompliance: number;
}

export interface AttendanceCorrection {
  id: string;
  requestId: string;
  studentId: string;
  studentName: string;
  facultyId: string;
  facultyName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  originalDate: Date;
  originalStatus: 'present' | 'absent';
  requestedStatus: 'present' | 'absent';
  reason: string;
  justification: string;
  documents?: string[];
  requestDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  reviewComments?: string;
  reviewedBy?: string;
  reviewDate?: Date;
}

export interface DepartmentDefaulter {
  studentId: string;
  studentName: string;
  studentCode: string;
  program: string;
  year: string;
  section: string;
  overallAttendance: number;
  criticalSubjects: CriticalSubject[];
  lastNotificationSent?: Date;
  parentContactInfo: ContactInfo;
  totalClassesMissed: number;
  riskLevel: 'moderate' | 'high' | 'critical';
}

export interface CriticalSubject {
  subjectId: string;
  subjectName: string;
  attendancePercentage: number;
  classesMissed: number;
  totalClasses: number;
  faculty: FacultySummary;
}

export interface ContactInfo {
  parentName: string;
  phoneNumber: string;
  email: string;
  emergencyContact?: string;
}

export interface DepartmentCommunication {
  id: string;
  type: 'announcement' | 'reminder' | 'alert' | 'notice';
  title: string;
  message: string;
  recipients: CommunicationRecipient[];
  scheduledDate: Date;
  sentDate?: Date;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  priority: 'low' | 'medium' | 'high';
  channels: ('email' | 'sms' | 'app_notification')[];
  attachments?: string[];
  createdBy: string;
  readReceipts: ReadReceipt[];
}

export interface CommunicationRecipient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'faculty' | 'student' | 'parent';
  program?: string;
  year?: string;
}

export interface ReadReceipt {
  recipientId: string;
  readAt: Date;
  acknowledged: boolean;
}

export interface DepartmentReport {
  id: string;
  type: 'attendance_summary' | 'faculty_performance' | 'defaulter_analysis' | 'program_comparison';
  title: string;
  description: string;
  dateRange: DateRange;
  programs?: string[];
  faculty?: string[];
  createdDate: Date;
  generatedBy: string;
  status: 'generating' | 'completed' | 'failed';
  filePath?: string;
  fileSize?: number;
  exportFormat: 'pdf' | 'excel' | 'csv';
  parameters: ReportParameters;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ReportParameters {
  includeGraphs: boolean;
  includeDetails: boolean;
  groupBy: 'program' | 'year' | 'section' | 'faculty';
  sortBy: 'name' | 'attendance' | 'defaulters' | 'performance';
  sortOrder: 'asc' | 'desc';
  filters: ReportFilters;
}

export interface ReportFilters {
  attendanceThreshold?: number;
  performanceRating?: ('excellent' | 'good' | 'needs_improvement')[];
  riskLevels?: ('moderate' | 'high' | 'critical')[];
  programs?: string[];
  years?: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  route: string;
  badgeCount?: number;
  badgeColor?: 'red' | 'yellow' | 'green' | 'blue';
  enabled: boolean;
}

export interface HoDUser {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  designation: string;
  permissions: HoDPermission[];
  contactInfo: ContactInfo;
  profileImage?: string;
  joinedDate: Date;
}

export interface HoDPermission {
  module: 'attendance' | 'faculty' | 'students' | 'reports' | 'communications' | 'approvals';
  actions: ('view' | 'edit' | 'approve' | 'reject' | 'create' | 'delete')[];
}

export interface ApprovalWorkflow {
  id: string;
  type: 'attendance_correction' | 'medical_leave' | 'month_lock' | 'emergency_override';
  requestId: string;
  initiatedBy: string;
  currentStage: WorkflowStage;
  stages: WorkflowStage[];
  deadline?: Date;
  escalationRules: EscalationRule[];
}

export interface WorkflowStage {
  stageId: string;
  stageName: string;
  assignedTo: string[];
  requiredApprovals: number;
  currentApprovals: number;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  comments: StageComment[];
  deadline?: Date;
}

export interface StageComment {
  commentId: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: Date;
  action: 'approve' | 'reject' | 'request_info' | 'comment';
}

export interface EscalationRule {
  condition: 'time_exceeded' | 'multiple_rejections' | 'high_priority';
  escalateTo: string[];
  notificationTemplate: string;
}