import {
  DepartmentStats,
  ProgramWithStats,
  FacultyWithPerformance,
  AttendanceCorrection,
  DepartmentDefaulter,
  QuickAction,
  HoDUser,
  YearStats,
  SectionStats,
  FacultySummary,
} from '../types/hod';

export const mockHoDUser: HoDUser = {
  id: 'hod-001',
  name: 'Dr. Rajesh Kumar',
  email: 'rajesh.kumar@mitwpu.edu.in',
  employeeId: 'MITWPU-HOD-CS-001',
  department: {
    id: 'dept-cs',
    name: 'Computer Engineering',
    code: 'CS'
  },
  designation: 'Head of Department',
  permissions: [
    {
      module: 'attendance',
      actions: ['view', 'edit', 'approve']
    },
    {
      module: 'faculty',
      actions: ['view', 'edit']
    },
    {
      module: 'students',
      actions: ['view', 'edit']
    },
    {
      module: 'reports',
      actions: ['view', 'create']
    },
    {
      module: 'communications',
      actions: ['view', 'create']
    },
    {
      module: 'approvals',
      actions: ['view', 'approve', 'reject']
    }
  ],
  contactInfo: {
    parentName: '',
    phoneNumber: '+91-9876543210',
    email: 'rajesh.kumar@mitwpu.edu.in'
  },
  joinedDate: new Date('2018-07-15')
};

export const mockQuickActions: QuickAction[] = [
  {
    id: 'action-1',
    label: 'Critical Defaulters',
    description: 'Students below attendance threshold',
    icon: '⚠️',
    route: '/hod/students/defaulters',
    badgeCount: 12,
    badgeColor: 'red',
    enabled: true
  },
  {
    id: 'action-2',
    label: 'Pending Approvals',
    description: 'Attendance corrections awaiting approval',
    icon: '📋',
    route: '/hod/approvals/corrections',
    badgeCount: 8,
    badgeColor: 'yellow',
    enabled: true
  },
  {
    id: 'action-3',
    label: 'Faculty Compliance',
    description: 'Faculty attendance update status',
    icon: '👥',
    route: '/hod/faculty/performance',
    badgeCount: 3,
    badgeColor: 'blue',
    enabled: true
  },
  {
    id: 'action-4',
    label: 'Generate Report',
    description: 'Create department performance reports',
    icon: '📊',
    route: '/hod/reports/department',
    enabled: true
  },
  {
    id: 'action-5',
    label: 'Send Notice',
    description: 'Department-wide communications',
    icon: '📢',
    route: '/hod/communications/create',
    enabled: true
  },
  {
    id: 'action-6',
    label: 'Program Analysis',
    description: 'Compare program performance',
    icon: '📈',
    route: '/hod/programs/comparison',
    enabled: true
  }
];

const mockProgramsData = [
  {
    id: 'prog-btechcs',
    name: 'B.Tech Computer Engineering',
    code: 'BTECHCS',
    totalStudents: 240,
    attendancePercentage: 84.2,
    defaultersCount: 8,
    sectionsCount: 6,
    trend: 'up' as const
  },
  {
    id: 'prog-btechit',
    name: 'B.Tech Information Technology',
    code: 'BTECHIT',
    totalStudents: 200,
    attendancePercentage: 82.1,
    defaultersCount: 6,
    sectionsCount: 5,
    trend: 'stable' as const
  },
  {
    id: 'prog-mtechcs',
    name: 'M.Tech Computer Science',
    code: 'MTECHCS',
    totalStudents: 60,
    attendancePercentage: 89.5,
    defaultersCount: 2,
    sectionsCount: 2,
    trend: 'up' as const
  },
  {
    id: 'prog-mtechit',
    name: 'M.Tech Information Technology',
    code: 'MTECHIT',
    totalStudents: 40,
    attendancePercentage: 87.3,
    defaultersCount: 1,
    sectionsCount: 1,
    trend: 'down' as const
  }
];

export const mockDepartmentStats: DepartmentStats = {
  totalStudents: 540,
  totalFaculty: 32,
  totalPrograms: 4,
  overallAttendance: 84.8,
  criticalDefaulters: 17,
  facultyCompliance: 91.2,
  programsData: mockProgramsData,
  monthlyTrend: [
    { month: 'Aug', attendanceRate: 82.1, defaultersCount: 19, facultyCompliance: 88.5 },
    { month: 'Sep', attendanceRate: 83.4, defaultersCount: 18, facultyCompliance: 89.1 },
    { month: 'Oct', attendanceRate: 84.8, defaultersCount: 17, facultyCompliance: 91.2 },
  ]
};

const mockFaculty: FacultySummary[] = [
  { id: 'fac-001', name: 'Dr. Priya Sharma', email: 'priya.sharma@mitwpu.edu.in', employeeId: 'MITWPU-CS-001', designation: 'Associate Professor' },
  { id: 'fac-002', name: 'Prof. Amit Patel', email: 'amit.patel@mitwpu.edu.in', employeeId: 'MITWPU-CS-002', designation: 'Assistant Professor' },
  { id: 'fac-003', name: 'Dr. Sneha Joshi', email: 'sneha.joshi@mitwpu.edu.in', employeeId: 'MITWPU-CS-003', designation: 'Professor' },
  { id: 'fac-004', name: 'Prof. Rahul Singh', email: 'rahul.singh@mitwpu.edu.in', employeeId: 'MITWPU-CS-004', designation: 'Assistant Professor' },
  { id: 'fac-005', name: 'Dr. Kavita Gupta', email: 'kavita.gupta@mitwpu.edu.in', employeeId: 'MITWPU-CS-005', designation: 'Associate Professor' }
];

export const mockProgramsWithStats: ProgramWithStats[] = mockProgramsData.map(program => ({
  ...program,
  yearWiseData: generateYearWiseData(program.id),
  sectionWiseData: generateSectionWiseData(program.id, program.sectionsCount),
  facultyAssigned: mockFaculty.slice(0, Math.min(program.sectionsCount, mockFaculty.length)),
  subjectsOffered: generateSubjectsForProgram(program.id)
}));

function generateYearWiseData(programId: string): YearStats[] {
  const isUG = programId.includes('btech');
  const years = isUG ? ['FE', 'SE', 'TE', 'BE'] : ['ME1', 'ME2'];

  return years.map((year, index) => ({
    year,
    totalStudents: Math.floor(Math.random() * 80) + 40,
    attendancePercentage: Math.floor(Math.random() * 20) + 75,
    defaultersCount: Math.floor(Math.random() * 5) + 1,
    sectionsCount: isUG ? (index < 2 ? 2 : 1) : 1
  }));
}

function generateSectionWiseData(programId: string, sectionsCount: number): SectionStats[] {
  const sections = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, sectionsCount);

  return sections.map(section => ({
    sectionId: `${programId}-${section}`,
    sectionName: section,
    year: 'TE', // simplified for demo
    totalStudents: Math.floor(Math.random() * 20) + 35,
    attendancePercentage: Math.floor(Math.random() * 15) + 78,
    defaultersCount: Math.floor(Math.random() * 3) + 1,
    classTeacher: mockFaculty[Math.floor(Math.random() * mockFaculty.length)]
  }));
}

function generateSubjectsForProgram(programId: string) {
  const subjects = [
    { name: 'Data Structures & Algorithms', code: 'CS301' },
    { name: 'Database Management Systems', code: 'CS302' },
    { name: 'Computer Networks', code: 'CS303' },
    { name: 'Software Engineering', code: 'CS304' },
    { name: 'Web Technologies', code: 'CS305' }
  ];

  return subjects.map((subject, index) => ({
    id: `${programId}-sub-${index + 1}`,
    name: subject.name,
    code: subject.code,
    credits: 4,
    faculty: mockFaculty[index % mockFaculty.length],
    classes: ['A', 'B']
  }));
}

export const mockFacultyWithPerformance: FacultyWithPerformance[] = mockFaculty.map((faculty, index) => ({
  ...faculty,
  subjects: [
    {
      subjectName: 'Data Structures & Algorithms',
      subjectCode: 'CS301',
      classes: ['TE-A', 'TE-B'],
      totalStudents: 75,
      averageAttendance: Math.floor(Math.random() * 15) + 78
    }
  ],
  classesAssigned: [
    {
      className: 'TE-A',
      year: 'TE',
      section: 'A',
      program: 'B.Tech CS',
      role: index % 2 === 0 ? 'class_teacher' : 'subject_teacher',
      totalStudents: 38,
      averageAttendance: Math.floor(Math.random() * 15) + 78
    }
  ],
  attendanceUpdateCompliance: Math.floor(Math.random() * 20) + 80,
  lastUpdateDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  performanceRating: ['excellent', 'good', 'needs_improvement'][Math.floor(Math.random() * 3)] as 'excellent' | 'good' | 'needs_improvement',
  totalStudentsHandled: Math.floor(Math.random() * 100) + 50,
  averageClassAttendance: Math.floor(Math.random() * 15) + 78,
  notificationsSent: Math.floor(Math.random() * 20) + 5,
  responsiveness: Math.floor(Math.random() * 30) + 70
}));

export const mockAttendanceCorrections: AttendanceCorrection[] = [
  {
    id: 'corr-001',
    requestId: 'REQ-001',
    studentId: 'stud-001',
    studentName: 'Rahul Sharma',
    facultyId: 'fac-001',
    facultyName: 'Dr. Priya Sharma',
    className: 'TE-A',
    subjectName: 'Data Structures & Algorithms',
    originalDate: new Date('2024-09-20'),
    originalStatus: 'absent',
    requestedStatus: 'present',
    reason: 'System error during attendance marking',
    justification: 'Student was present but marked absent due to technical issue',
    requestDate: new Date('2024-09-21'),
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'corr-002',
    requestId: 'REQ-002',
    studentId: 'stud-002',
    studentName: 'Priya Patel',
    facultyId: 'fac-002',
    facultyName: 'Prof. Amit Patel',
    className: 'SE-B',
    subjectName: 'Database Management Systems',
    originalDate: new Date('2024-09-19'),
    originalStatus: 'absent',
    requestedStatus: 'present',
    reason: 'Medical emergency',
    justification: 'Student had medical emergency but attended class after treatment',
    documents: ['medical-certificate.pdf'],
    requestDate: new Date('2024-09-20'),
    priority: 'high',
    status: 'pending'
  }
];

export const mockDepartmentDefaulters: DepartmentDefaulter[] = [
  {
    studentId: 'stud-def-001',
    studentName: 'Arjun Mehta',
    studentCode: 'BTECHCS2022001',
    program: 'B.Tech Computer Engineering',
    year: 'TE',
    section: 'A',
    overallAttendance: 68.5,
    criticalSubjects: [
      {
        subjectName: 'Data Structures & Algorithms',
        attendancePercentage: 62.0,
        classesMissed: 12,
        totalClasses: 32,
        faculty: mockFaculty[0]
      },
      {
        subjectName: 'Database Management Systems',
        attendancePercentage: 58.5,
        classesMissed: 14,
        totalClasses: 30,
        faculty: mockFaculty[1]
      }
    ],
    lastNotificationSent: new Date('2024-09-15'),
    parentContactInfo: {
      parentName: 'Suresh Mehta',
      phoneNumber: '+91-9876543210',
      email: 'suresh.mehta@gmail.com',
      emergencyContact: '+91-9876543211'
    },
    totalClassesMissed: 26,
    riskLevel: 'critical'
  },
  {
    studentId: 'stud-def-002',
    studentName: 'Sneha Reddy',
    studentCode: 'BTECHCS2022002',
    program: 'B.Tech Computer Engineering',
    year: 'SE',
    section: 'B',
    overallAttendance: 72.3,
    criticalSubjects: [
      {
        subjectName: 'Computer Networks',
        attendancePercentage: 69.0,
        classesMissed: 9,
        totalClasses: 29,
        faculty: mockFaculty[2]
      }
    ],
    lastNotificationSent: new Date('2024-09-18'),
    parentContactInfo: {
      parentName: 'Ramesh Reddy',
      phoneNumber: '+91-9876543212',
      email: 'ramesh.reddy@gmail.com'
    },
    totalClassesMissed: 18,
    riskLevel: 'high'
  }
];

export const mockTimeRanges = [
  { label: 'This Week', value: 'week', startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), endDate: new Date() },
  { label: 'This Month', value: 'month', startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate: new Date() },
  { label: 'This Semester', value: 'semester', startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), endDate: new Date() },
  { label: 'Academic Year', value: 'year', startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), endDate: new Date() }
];

export const mockComparisonMetrics = [
  { label: 'Overall Attendance', value: 'attendance' },
  { label: 'Defaulter Count', value: 'defaulters' },
  { label: 'Faculty Performance', value: 'faculty_performance' },
  { label: 'Class Strength', value: 'strength' }
];