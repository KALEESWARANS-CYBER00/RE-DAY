// ==========================================
// SHARPEN CORE DATA MODELS
// ==========================================

export type PriorityType = 'DO_NOW' | 'SCHEDULE' | 'DELEGATE' | 'ELIMINATE' | 'NOW' | 'PLAN' | 'REMOVE' | '';

export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "10:00"
  priority: PriorityType;
  category: string; // e.g. "Deep Work", "Administration", "Personal", "Health"
  status: StatusType;
  completed: boolean;
  notes?: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: 'Free' | 'Pro';
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  illustration: string;
  story: string;
  takeaway: string;
  published: boolean;
  completedBy?: string[]; // user IDs who completed it
}

export interface Reflection {
  date: string; // YYYY-MM-DD
  wentWell: string;
  distracted: string;
  improveTomorrow: string;
  savedAt?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  features: string[];
  active: boolean;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  taskTitle: string;
  durationMinutes: number;
  completedAt: string;
}

export interface AppSettings {
  appName: string;
  tagline: string;
  allowRegistration: boolean;
  defaultPlan: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

// ==========================================
// APPROVED WELCOME PAGE TYPES
// ==========================================

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
