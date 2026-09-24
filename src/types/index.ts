export type PriorityType = 'NOW' | 'PLAN' | 'DELEGATE' | 'REMOVE' | '';

export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface PlannerRowData {
  id: string; // e.g. "hour-00"
  hour: number; // 0 to 23
  timeLabel: string; // "00:00 – 01:00"
  activityFirstHalf: string; // 00 - 30 mins
  activitySecondHalf: string; // 30 - 60 mins
  priority: PriorityType;
  nextImprovement: string;
  status: StatusType;
}

export type MatrixQuadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface MatrixTask {
  id: string;
  title: string;
  quadrant: MatrixQuadrant;
  completed: boolean;
  createdAt: string;
}

export interface DailyReflection {
  accomplishments: string;
  learnings: string;
  improvements: string;
  savedAt?: string;
}

export interface DayData {
  date: string; // "YYYY-MM-DD"
  plannerRows: PlannerRowData[];
  matrixTasks: MatrixTask[];
  reflection: DailyReflection;
  lastUpdated: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
