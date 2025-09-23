export interface Department {
  id: string;
  name: string;
  code: string;
  hodId: string;
  hodName: string;
  establishedYear: number;
  totalFaculty: number;
  totalStudents: number;
  programs: DepartmentProgram[];
  facilities: DepartmentFacility[];
  contact: DepartmentContact;
  accreditation: Accreditation[];
}

export interface DepartmentProgram {
  id: string;
  name: string;
  code: string;
  type: 'undergraduate' | 'postgraduate' | 'doctoral';
  duration: number; // in years
  totalSeats: number;
  currentEnrollment: number;
  yearsOffered: ProgramYear[];
  specializations?: string[];
  accreditationStatus: 'accredited' | 'pending' | 'not_applicable';
  establishedYear: number;
}

export interface ProgramYear {
  year: string; // FE, SE, TE, BE for UG; ME1, ME2 for PG
  displayName: string; // First Year, Second Year, etc.
  totalStudents: number;
  sections: ProgramSection[];
  curriculum: CurriculumInfo;
}

export interface ProgramSection {
  id: string;
  name: string; // A, B, C, etc.
  capacity: number;
  currentStrength: number;
  classTeacher: {
    facultyId: string;
    facultyName: string;
  };
  classroom?: string;
  timetable: SectionTimetable;
}

export interface SectionTimetable {
  weeklySchedule: DaySchedule[];
  lastUpdated: Date;
  academicYear: string;
  semester: number;
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periods: PeriodSchedule[];
}

export interface PeriodSchedule {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: {
    id: string;
    name: string;
    code: string;
  };
  faculty: {
    id: string;
    name: string;
  };
  room?: string;
  type: 'lecture' | 'practical' | 'tutorial';
}

export interface CurriculumInfo {
  totalCredits: number;
  coreSubjects: number;
  electiveSubjects: number;
  practicalSubjects: number;
  subjects: CurriculumSubject[];
}

export interface CurriculumSubject {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: 'core' | 'elective' | 'practical';
  semester: number;
  prerequisiteSubjects?: string[];
  faculty: {
    id: string;
    name: string;
  };
}

export interface DepartmentFacility {
  id: string;
  name: string;
  type: 'lab' | 'classroom' | 'seminar_hall' | 'library' | 'office';
  capacity?: number;
  equipment?: string[];
  inchargeId?: string;
  inchargeName?: string;
  location: string;
  floor: number;
  building: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface DepartmentContact {
  officePhone: string;
  email: string;
  website?: string;
  address: {
    building: string;
    floor: number;
    room: string;
    campus: string;
  };
  officeHours: {
    startTime: string;
    endTime: string;
    days: string[];
  };
}

export interface Accreditation {
  id: string;
  type: 'NBA' | 'NAAC' | 'ISO' | 'Industry';
  name: string;
  accreditingBody: string;
  status: 'valid' | 'expired' | 'pending_renewal';
  validFrom: Date;
  validUntil: Date;
  grade?: string;
  certificateNumber?: string;
  remarks?: string;
}

export interface AcademicCalendar {
  id: string;
  academicYear: string;
  semester: number;
  startDate: Date;
  endDate: Date;
  events: AcademicEvent[];
  holidays: Holiday[];
  examSchedule: ExamSchedule[];
  importantDates: ImportantDate[];
}

export interface AcademicEvent {
  id: string;
  title: string;
  description: string;
  type: 'exam' | 'holiday' | 'event' | 'deadline' | 'meeting';
  startDate: Date;
  endDate?: Date;
  isMultiDay: boolean;
  color: string;
  priority: 'low' | 'medium' | 'high';
  affectedPrograms?: string[];
  affectedYears?: string[];
  organizer?: string;
  venue?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'national' | 'state' | 'university' | 'department';
  isOptional: boolean;
  description?: string;
}

export interface ExamSchedule {
  id: string;
  examType: 'unit_test' | 'mid_term' | 'end_term' | 'supplementary';
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  invigilators: string[];
  programs: string[];
  years: string[];
  maxMarks: number;
  duration: number; // in minutes
}

export interface ImportantDate {
  id: string;
  title: string;
  date: Date;
  type: 'registration' | 'fee_payment' | 'form_submission' | 'result_declaration' | 'admission';
  description: string;
  isDeadline: boolean;
  reminderDays: number[]; // days before to send reminders
  affectedStakeholders: ('students' | 'faculty' | 'parents')[];
}

export interface DepartmentSettings {
  id: string;
  departmentId: string;
  attendanceSettings: AttendanceSettings;
  notificationSettings: NotificationSettings;
  reportSettings: ReportSettings;
  workflowSettings: WorkflowSettings;
  lastUpdated: Date;
  updatedBy: string;
}

export interface AttendanceSettings {
  minimumAttendance: number; // percentage
  defaulterThreshold: number; // percentage
  lockPeriod: number; // days after which attendance is locked
  allowCorrections: boolean;
  correctionDeadline: number; // days
  approvalRequired: boolean;
  autoNotifications: boolean;
  notificationThresholds: number[]; // attendance percentages that trigger notifications
}

export interface NotificationSettings {
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enableAppNotifications: boolean;
  defaultRecipients: {
    students: boolean;
    faculty: boolean;
    parents: boolean;
    hod: boolean;
  };
  escalationRules: {
    criticalDefaulters: boolean;
    facultyNonCompliance: boolean;
    systemErrors: boolean;
  };
  reminderSchedule: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: ('faculty' | 'hod')[];
  };
}

export interface ReportSettings {
  autoGeneration: boolean;
  schedule: {
    frequency: 'weekly' | 'monthly' | 'quarterly';
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
    time: string;
  };
  defaultRecipients: string[];
  includeComparisons: boolean;
  includeGraphics: boolean;
  retentionPeriod: number; // days
  exportFormats: ('pdf' | 'excel' | 'csv')[];
}

export interface WorkflowSettings {
  attendanceCorrectionWorkflow: {
    requireApproval: boolean;
    approverRoles: ('hod' | 'dean' | 'registrar')[];
    autoApprovalThreshold?: number; // days within which auto-approval happens
    escalationAfterDays: number;
  };
  medicalLeaveWorkflow: {
    requireDocuments: boolean;
    maximumDays: number;
    approverRoles: ('hod' | 'medical_officer' | 'dean')[];
    autoReminderDays: number[];
  };
  monthLockWorkflow: {
    lockAfterDays: number;
    unlockRequiresApproval: boolean;
    approverRoles: ('dean' | 'registrar')[];
    emergencyUnlockAllowed: boolean;
  };
}