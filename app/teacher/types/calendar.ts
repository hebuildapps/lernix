export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'government' | 'college' | 'festival';
  isLongWeekend: boolean;
  description?: string;
}

export interface LongWeekend {
  id: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  holidays: string[];
  description: string;
}

export interface PlanningSuggestion {
  type: 'optimal_date' | 'avoid_date' | 'reschedule';
  date: Date;
  reason: string;
  alternative?: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface AcademicEvent {
  id: string;
  title: string;
  date: Date;
  type: 'assignment' | 'test' | 'exam' | 'submission' | 'activity';
  subjectId: string;
  description?: string;
  isOptimal: boolean;
}

export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isHoliday: boolean;
  isLongWeekend: boolean;
  holidays: Holiday[];
  events: AcademicEvent[];
  attendanceRate?: number;
}