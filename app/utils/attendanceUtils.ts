import { AttendanceRecord } from '../types';

export const calculateAttendanceStats = (attendanceData: AttendanceRecord[]) => {
  const totalClasses = attendanceData.length;
  const attended = attendanceData.filter(record => record.status === 'present').length;
  const absent = attendanceData.filter(record => record.status === 'absent').length;
  const late = attendanceData.filter(record => record.status === 'late').length;
  const excused = attendanceData.filter(record => record.status === 'excused').length;
  const attendanceRate = totalClasses > 0 ? (attended / totalClasses) * 100 : 0;

  return { totalClasses, attended, absent, late, excused, attendanceRate };
};

export const calculateSubjectAttendance = (attendanceData: AttendanceRecord[], subjectName: string) => {
  const subjectRecords = attendanceData.filter(record => record.subject === subjectName);
  return calculateAttendanceStats(subjectRecords);
};