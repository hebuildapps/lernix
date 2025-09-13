import { Student, AttendanceRecord, Subject, MedicalLeave, Notification, AcademicContent } from '../types';

export const mockStudent: Student = {
  id: 'std-001',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@lernix.edu',
  studentId: 'LX2024001',
  semester: 6,
  department: 'Computer Science',
  profileImage: '/api/placeholder/150/150',
  joinedDate: '2022-09-01'
};

export const mockSubjects: Subject[] = [
  {
    id: 'sub-001',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    credits: 4,
    instructor: 'Dr. Smith',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:30' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:30' },
      { day: 'Friday', startTime: '09:00', endTime: '10:30' }
    ]
  },
  {
    id: 'sub-002',
    name: 'Database Management Systems',
    code: 'CS302',
    credits: 3,
    instructor: 'Prof. Wilson',
    schedule: [
      { day: 'Tuesday', startTime: '11:00', endTime: '12:30' },
      { day: 'Thursday', startTime: '11:00', endTime: '12:30' }
    ]
  },
  {
    id: 'sub-003',
    name: 'Software Engineering',
    code: 'CS303',
    credits: 3,
    instructor: 'Dr. Brown',
    schedule: [
      { day: 'Monday', startTime: '14:00', endTime: '15:30' },
      { day: 'Wednesday', startTime: '14:00', endTime: '15:30' }
    ]
  },
  {
    id: 'sub-004',
    name: 'Computer Networks',
    code: 'CS304',
    credits: 3,
    instructor: 'Prof. Davis',
    schedule: [
      { day: 'Tuesday', startTime: '09:00', endTime: '10:30' },
      { day: 'Thursday', startTime: '09:00', endTime: '10:30' }
    ]
  }
];

export const generateMockAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const startDate = new Date('2024-09-01');
  const endDate = new Date();
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    mockSubjects.forEach(subject => {
      const hasClassToday = subject.schedule.some(schedule => schedule.day === dayName);
      
      if (hasClassToday && Math.random() > 0.1) {
        const statuses: Array<'present' | 'absent' | 'late' | 'excused'> = ['present', 'absent', 'late', 'excused'];
        const weights = [0.75, 0.15, 0.08, 0.02];
        
        let randomValue = Math.random();
        let selectedStatus: typeof statuses[0] = 'present';
        
        for (let i = 0; i < weights.length; i++) {
          if (randomValue < weights[i]) {
            selectedStatus = statuses[i];
            break;
          }
          randomValue -= weights[i];
        }
        
        records.push({
          id: `att-${date.toISOString().split('T')[0]}-${subject.id}`,
          studentId: mockStudent.id,
          date: date.toISOString().split('T')[0],
          status: selectedStatus,
          subject: subject.name,
          timeIn: selectedStatus === 'present' ? '09:00' : undefined,
          timeOut: selectedStatus === 'present' ? '10:30' : undefined,
          notes: selectedStatus === 'late' ? 'Arrived 15 minutes late' : undefined
        });
      }
    });
  }
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockMedicalLeaves: MedicalLeave[] = [
  {
    id: 'ml-001',
    studentId: mockStudent.id,
    startDate: '2024-10-15',
    endDate: '2024-10-17',
    reason: 'Flu symptoms and fever',
    status: 'approved',
    documents: ['medical-certificate-001.pdf'],
    submittedDate: '2024-10-14',
    reviewedBy: 'Dr. Academic Affairs',
    reviewDate: '2024-10-14',
    notes: 'Medical certificate verified'
  },
  {
    id: 'ml-002',
    studentId: mockStudent.id,
    startDate: '2024-11-20',
    endDate: '2024-11-22',
    reason: 'Family emergency',
    status: 'pending',
    documents: ['emergency-letter-001.pdf'],
    submittedDate: '2024-11-19'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'not-001',
    studentId: mockStudent.id,
    type: 'attendance',
    title: 'Low Attendance Warning',
    message: 'Your attendance in CS302 has dropped below 75%. Please attend regularly to avoid academic penalties.',
    date: '2024-12-01',
    read: false,
    priority: 'high'
  },
  {
    id: 'not-002',
    studentId: mockStudent.id,
    type: 'medical',
    title: 'Medical Leave Approved',
    message: 'Your medical leave application for Oct 15-17 has been approved.',
    date: '2024-10-14',
    read: true,
    priority: 'medium'
  },
  {
    id: 'not-003',
    studentId: mockStudent.id,
    type: 'academic',
    title: 'New Assignment Posted',
    message: 'A new assignment has been posted for CS301 - Data Structures. Due date: Dec 15, 2024.',
    date: '2024-12-05',
    read: false,
    priority: 'medium'
  }
];

export const mockAcademicContent: AcademicContent[] = [
  {
    id: 'ac-001',
    subjectId: 'sub-001',
    type: 'assignment',
    title: 'Binary Tree Implementation',
    description: 'Implement a complete binary search tree with insert, delete, and search operations.',
    dueDate: '2024-12-15',
    attachments: ['assignment-template.zip'],
    publishedDate: '2024-12-01',
    status: 'published'
  },
  {
    id: 'ac-002',
    subjectId: 'sub-002',
    type: 'lecture',
    title: 'SQL Joins and Subqueries',
    description: 'Advanced SQL concepts including different types of joins and nested queries.',
    attachments: ['lecture-slides.pdf', 'sample-queries.sql'],
    publishedDate: '2024-11-28',
    status: 'published'
  },
  {
    id: 'ac-003',
    subjectId: 'sub-003',
    type: 'quiz',
    title: 'Software Development Life Cycle Quiz',
    description: 'Quiz covering SDLC models, agile methodologies, and project management concepts.',
    dueDate: '2024-12-10',
    publishedDate: '2024-12-03',
    status: 'published'
  }
];