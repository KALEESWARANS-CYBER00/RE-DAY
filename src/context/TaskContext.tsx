import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Task, 
  Lesson, 
  Reflection, 
  SubscriptionPlan, 
  FocusSession, 
  AppSettings, 
  PriorityType, 
  User 
} from '../types';
import { 
  getInitialTasks, 
  INITIAL_LESSONS, 
  INITIAL_PLANS, 
  INITIAL_SETTINGS, 
  getInitialReflections, 
  getInitialFocusSessions,
  INITIAL_USERS
} from '../utils/initialData';

interface TaskContextType {
  // Tasks (Shared single source of truth)
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
  getTasksByPriority: (priority: PriorityType, date?: string) => Task[];
  
  // Lessons
  lessons: Lesson[];
  toggleLessonCompleted: (lessonId: string, userId?: string) => void;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;

  // Reflections
  reflections: Record<string, Reflection>;
  getReflection: (date: string) => Reflection | undefined;
  saveReflection: (reflection: Reflection) => void;

  // Focus Sessions
  focusSessions: FocusSession[];
  addFocusSession: (session: Omit<FocusSession, 'id'>) => void;

  // Plans (for User & Admin)
  plans: SubscriptionPlan[];
  updatePlan: (id: string, updates: Partial<SubscriptionPlan>) => void;

  // App Settings
  appSettings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;

  // Admin User List
  allUsers: User[];
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_KEY = 'sharpen_tasks';
const LESSONS_KEY = 'sharpen_lessons';
const REFLECTIONS_KEY = 'sharpen_reflections';
const FOCUS_KEY = 'sharpen_focus_sessions';
const PLANS_KEY = 'sharpen_plans';
const SETTINGS_KEY = 'sharpen_settings';
const USERS_KEY = 'sharpen_users';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(TASKS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading tasks:', e);
    }
    const initial = getInitialTasks();
    localStorage.setItem(TASKS_KEY, JSON.stringify(initial));
    return initial;
  });

  // 2. Lessons
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const stored = localStorage.getItem(LESSONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading lessons:', e);
    }
    localStorage.setItem(LESSONS_KEY, JSON.stringify(INITIAL_LESSONS));
    return INITIAL_LESSONS;
  });

  // 3. Reflections
  const [reflections, setReflections] = useState<Record<string, Reflection>>(() => {
    try {
      const stored = localStorage.getItem(REFLECTIONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading reflections:', e);
    }
    const initial = getInitialReflections();
    localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(initial));
    return initial;
  });

  // 4. Focus Sessions
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(() => {
    try {
      const stored = localStorage.getItem(FOCUS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading focus sessions:', e);
    }
    const initial = getInitialFocusSessions();
    localStorage.setItem(FOCUS_KEY, JSON.stringify(initial));
    return initial;
  });

  // 5. Subscription Plans
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    try {
      const stored = localStorage.getItem(PLANS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading plans:', e);
    }
    localStorage.setItem(PLANS_KEY, JSON.stringify(INITIAL_PLANS));
    return INITIAL_PLANS;
  });

  // 6. Settings
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading settings:', e);
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  });

  // 7. Users
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading users:', e);
    }
    return INITIAL_USERS;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    localStorage.setItem(FOCUS_KEY, JSON.stringify(focusSessions));
  }, [focusSessions]);

  useEffect(() => {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(appSettings));
  }, [appSettings]);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  }, [allUsers]);

  // Task Actions
  const addTask = (taskData: Omit<Task, 'id'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          // Keep status and completed in sync
          if (updates.completed !== undefined && updates.status === undefined) {
            updated.status = updates.completed ? 'DONE' : 'TODO';
          } else if (updates.status !== undefined && updates.completed === undefined) {
            updated.completed = updates.status === 'DONE';
          }
          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            status: nextCompleted ? 'DONE' : 'TODO',
          };
        }
        return t;
      })
    );
  };

  const getTasksByDate = (date: string): Task[] => {
    return tasks.filter((t) => t.date === date);
  };

  const getTasksByPriority = (priority: PriorityType, date?: string): Task[] => {
    return tasks.filter((t) => t.priority === priority && (!date || t.date === date));
  };

  // Lesson Actions
  const toggleLessonCompleted = (lessonId: string, userId: string = 'user-1') => {
    setLessons((prev) =>
      prev.map((l) => {
        if (l.id === lessonId) {
          const completedList = l.completedBy || [];
          const isDone = completedList.includes(userId);
          const nextList = isDone
            ? completedList.filter((uid) => uid !== userId)
            : [...completedList, userId];
          return { ...l, completedBy: nextList };
        }
        return l;
      })
    );
  };

  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `lesson-${Date.now()}`,
      completedBy: [],
    };
    setLessons((prev) => [newLesson, ...prev]);
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLesson = (id: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
  };

  // Reflection Actions
  const getReflection = (date: string): Reflection | undefined => {
    return reflections[date];
  };

  const saveReflection = (reflection: Reflection) => {
    setReflections((prev) => ({
      ...prev,
      [reflection.date]: {
        ...reflection,
        savedAt: new Date().toISOString(),
      },
    }));
  };

  // Focus Session Actions
  const addFocusSession = (sessionData: Omit<FocusSession, 'id'>) => {
    const newSession: FocusSession = {
      ...sessionData,
      id: `focus-${Date.now()}`,
    };
    setFocusSessions((prev) => [newSession, ...prev]);
  };

  // Plan Actions
  const updatePlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  // Settings Actions
  const updateSettings = (updates: Partial<AppSettings>) => {
    setAppSettings((prev) => ({ ...prev, ...updates }));
  };

  // User Actions (Admin)
  const updateUser = (id: string, updates: Partial<User>) => {
    setAllUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const deleteUser = (id: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        getTasksByDate,
        getTasksByPriority,
        lessons,
        toggleLessonCompleted,
        addLesson,
        updateLesson,
        deleteLesson,
        reflections,
        getReflection,
        saveReflection,
        focusSessions,
        addFocusSession,
        plans,
        updatePlan,
        appSettings,
        updateSettings,
        allUsers,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
