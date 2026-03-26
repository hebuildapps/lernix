import { Teacher, StudentWithAttendance, BasicSession } from '../types/teacher';
import { Holiday, LongWeekend, PlanningSuggestion, AcademicEvent } from '../types/calendar';

export const mockTeacher: Teacher = {
  id: "teacher-001",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@mitwpu.edu.in",
  employeeId: "MITWPU-CS-001",
  department: "Computer Science",
  subjects: ["Data Structures & Algorithms", "Database Management Systems"],
  profileImage: "/api/placeholder/150/150",
  joinedDate: "2020-08-15",
};

export const mockStudentsCS301: StudentWithAttendance[] = [
  {
    id: "std-001",
    name: "Heramb Salunkhe",
    rollNumber: "1032231229",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 88.9,
    totalSessions: 45,
    presentSessions: 40,
    absentSessions: 5,
    medicalLeaves: 2,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-002",
    name: "Aarav Patel",
    rollNumber: "1032231230",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 92.2,
    totalSessions: 45,
    presentSessions: 41,
    absentSessions: 4,
    medicalLeaves: 1,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-003",
    name: "Diya Gupta",
    rollNumber: "1032231231",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 73.3,
    totalSessions: 45,
    presentSessions: 33,
    absentSessions: 12,
    medicalLeaves: 3,
    lastAttendance: new Date("2024-12-11"),
    attendanceStatus: 'warning'
  },
  {
    id: "std-004",
    name: "Vivaan Singh",
    rollNumber: "1032231232",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 95.6,
    totalSessions: 45,
    presentSessions: 43,
    absentSessions: 2,
    medicalLeaves: 0,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-005",
    name: "Ananya Reddy",
    rollNumber: "1032231233",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 67.8,
    totalSessions: 45,
    presentSessions: 30,
    absentSessions: 15,
    medicalLeaves: 1,
    lastAttendance: new Date("2024-12-09"),
    attendanceStatus: 'critical'
  },
  {
    id: "std-006",
    name: "Arjun Mehta",
    rollNumber: "1032231234",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 84.4,
    totalSessions: 45,
    presentSessions: 38,
    absentSessions: 7,
    medicalLeaves: 2,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-007",
    name: "Kavya Nair",
    rollNumber: "1032231235",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 91.1,
    totalSessions: 45,
    presentSessions: 41,
    absentSessions: 4,
    medicalLeaves: 1,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-008",
    name: "Ishaan Kumar",
    rollNumber: "1032231236",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 77.8,
    totalSessions: 45,
    presentSessions: 35,
    absentSessions: 10,
    medicalLeaves: 3,
    lastAttendance: new Date("2024-12-11"),
    attendanceStatus: 'warning'
  },
  {
    id: "std-009",
    name: "Saanvi Joshi",
    rollNumber: "1032231237",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 86.7,
    totalSessions: 45,
    presentSessions: 39,
    absentSessions: 6,
    medicalLeaves: 2,
    lastAttendance: new Date("2024-12-13"),
    attendanceStatus: 'good'
  },
  {
    id: "std-010",
    name: "Rayan Ahmed",
    rollNumber: "1032231238",
    profileImage: "/api/placeholder/40/40",
    attendancePercentage: 64.4,
    totalSessions: 45,
    presentSessions: 29,
    absentSessions: 16,
    medicalLeaves: 0,
    lastAttendance: new Date("2024-12-06"),
    attendanceStatus: 'critical'
  }
];

export const mockSessions: BasicSession[] = [
  {
    id: "session-001",
    date: new Date("2024-12-13"),
    subject: "Data Structures & Algorithms",
    class: "CS301-A",
    topic: "Binary Search Trees - Insertion and Deletion",
    attendanceCount: 38,
    totalStudents: 40,
    status: 'completed'
  },
  {
    id: "session-002",
    date: new Date("2024-12-11"),
    subject: "Data Structures & Algorithms",
    class: "CS301-A",
    topic: "AVL Trees and Balancing",
    attendanceCount: 35,
    totalStudents: 40,
    status: 'completed'
  },
  {
    id: "session-003",
    date: new Date("2024-12-09"),
    subject: "Data Structures & Algorithms",
    class: "CS301-A",
    topic: "Hash Tables and Collision Resolution",
    attendanceCount: 37,
    totalStudents: 40,
    status: 'completed'
  },
  {
    id: "session-004",
    date: new Date("2024-12-06"),
    subject: "Data Structures & Algorithms",
    class: "CS301-A",
    topic: "Graph Algorithms - DFS and BFS",
    attendanceCount: 39,
    totalStudents: 40,
    status: 'completed'
  },
  {
    id: "session-005",
    date: new Date("2024-12-04"),
    subject: "Data Structures & Algorithms",
    class: "CS301-A",
    topic: "Dynamic Programming Introduction",
    attendanceCount: 36,
    totalStudents: 40,
    status: 'completed'
  }
];

export const mockHolidays: Holiday[] = [
  {
    id: "holiday-001",
    name: "Republic Day",
    date: new Date("2025-01-26"),
    type: 'government',
    isLongWeekend: true,
    description: "National Holiday"
  },
  {
    id: "holiday-002",
    name: "Holi",
    date: new Date("2025-03-14"),
    type: 'festival',
    isLongWeekend: false,
    description: "Festival of Colors"
  },
  {
    id: "holiday-003",
    name: "Good Friday",
    date: new Date("2025-04-18"),
    type: 'government',
    isLongWeekend: true,
    description: "Christian Holiday"
  },
  {
    id: "holiday-004",
    name: "Independence Day",
    date: new Date("2025-08-15"),
    type: 'government',
    isLongWeekend: false,
    description: "National Holiday"
  },
  {
    id: "holiday-005",
    name: "Gandhi Jayanti",
    date: new Date("2025-10-02"),
    type: 'government',
    isLongWeekend: false,
    description: "National Holiday"
  },
  {
    id: "holiday-006",
    name: "Diwali",
    date: new Date("2025-10-20"),
    type: 'festival',
    isLongWeekend: true,
    description: "Festival of Lights"
  },
  {
    id: "holiday-007",
    name: "Christmas",
    date: new Date("2025-12-25"),
    type: 'government',
    isLongWeekend: false,
    description: "Christian Holiday"
  },
  {
    id: "holiday-008",
    name: "College Foundation Day",
    date: new Date("2025-09-15"),
    type: 'college',
    isLongWeekend: false,
    description: "MIT-WPU Foundation Day"
  }
];

export const mockLongWeekends: LongWeekend[] = [
  {
    id: "weekend-001",
    startDate: new Date("2025-01-25"),
    endDate: new Date("2025-01-27"),
    totalDays: 3,
    holidays: ["Republic Day"],
    description: "Republic Day long weekend"
  },
  {
    id: "weekend-002",
    startDate: new Date("2025-04-18"),
    endDate: new Date("2025-04-20"),
    totalDays: 3,
    holidays: ["Good Friday"],
    description: "Good Friday long weekend"
  },
  {
    id: "weekend-003",
    startDate: new Date("2025-10-18"),
    endDate: new Date("2025-10-21"),
    totalDays: 4,
    holidays: ["Diwali"],
    description: "Diwali festival break"
  }
];

export const mockPlanningSuggestions: PlanningSuggestion[] = [
  {
    type: 'avoid_date',
    date: new Date("2025-01-27"),
    reason: "Republic Day long weekend - Low student attendance expected",
    severity: 'high'
  },
  {
    type: 'optimal_date',
    date: new Date("2025-02-15"),
    reason: "Mid-week with no nearby holidays - Optimal for important assignments",
    severity: 'low'
  },
  {
    type: 'reschedule',
    date: new Date("2025-03-13"),
    reason: "Day before Holi - Consider rescheduling tests or important sessions",
    alternative: new Date("2025-03-17"),
    severity: 'medium'
  }
];

export const mockAcademicEvents: AcademicEvent[] = [
  {
    id: "event-001",
    title: "Data Structures Quiz 3",
    date: new Date("2025-01-15"),
    type: 'test',
    description: "Quiz on Trees and Graphs",
    isOptimal: true
  },
  {
    id: "event-002",
    title: "Database Project Submission",
    date: new Date("2025-01-28"),
    type: 'submission',
    description: "Final project deadline",
    isOptimal: false
  }
];