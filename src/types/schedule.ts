export interface Subject {
  id: string;
  name: string;
}

export interface Parallel {
  id: string;
  name: string;
  schedule: string;
  subjectId: string;
}

export interface SchedulePreferences {
  entryTime: string;
  exitTime: string;
  maxSubjectsPerDay: number;
}

export interface GeneratedSchedule {
  id: string;
  name: string;
  subjects: string[];
  schedule: ScheduleEntry[];
}

export interface ScheduleEntry {
  day: string;
  subjects: string[];
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  subject: string;
  parallel: string;
  startTime: string;
  endTime: string;
}

export type WorkflowStep = 1 | 2 | 3 | 4;
