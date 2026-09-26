import { Task, User, Lesson, SubscriptionPlan, AppSettings, Reflection, FocusSession } from '../types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  } catch {
    return dateStr;
  }
}

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    email: 'alex@sharpen.app',
    role: 'user',
    plan: 'Pro',
    status: 'active',
    createdAt: '2026-09-01',
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah@sharpen.app',
    role: 'user',
    plan: 'Free',
    status: 'active',
    createdAt: '2026-09-12',
  },
  {
    id: 'admin-1',
    name: 'Marcus Vance',
    email: 'admin@sharpen.app',
    role: 'admin',
    plan: 'Pro',
    status: 'active',
    createdAt: '2026-08-15',
  },
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'The Broken Pencil',
    description: 'Why the friction in your day is preparing you to write, not destroying you.',
    illustration: '/images/mascot-story.jpg',
    story: `Arjun found an old, short pencil lying on his grandfather's desk.

He picked it up and said,
“What's the use of this? It's almost finished.”

His grandfather smiled.
“Ask the pencil why it looks that way.”

Arjun imagined the pencil speaking.
It told him that every time its tip became dull, someone placed it inside a sharpener.
At first, it thought the sharpener was destroying it.
Every turn removed a little more of it.

But then it understood.
The sharpener wasn't destroying the pencil.
It was preparing it to write.

Arjun picked up the pencil and began writing.
Even though it was small, it created beautiful words.`,
    takeaway: 'Challenges can make you stronger, sharper, and better prepared.',
    published: true,
    completedBy: ['user-1'],
  },
  {
    id: 'lesson-2',
    title: 'The Iron Chisel',
    description: 'How concentrated force on a single point cuts stone that blunt blows cannot scratch.',
    illustration: '/images/mascot-hero.jpg',
    story: `A stonecutter swings his hammer a hundred times against a granite block.
On the ninety-ninth strike, not a single visible crack appears.

A passerby mocks him: “You have wasted an entire morning hitting a rock that does not yield.”

The stonecutter does not answer. He strikes a hundred and first time.
The boulder splits clean in half.

He knew it was not the final blow that divided the stone,
but all the strikes that came before it, delivered with unwavering aim to the exact same seam.`,
    takeaway: 'Consistent effort aimed at a single priority produces breakthroughs when scattered effort fails.',
    published: true,
    completedBy: [],
  },
  {
    id: 'lesson-3',
    title: 'The Clean Ledger',
    description: 'Closing the books on today before writing the first entry of tomorrow.',
    illustration: '/images/mascot-story.jpg',
    story: `An old merchant in Kyoto balanced his books every evening by candlelight.
If ten copper coins were unaccounted for, he did not sleep until he found where they went.

His apprentice asked: “Is ten copper worth an hour of rest?”

The merchant replied:
“The copper is nothing. The habit of not knowing where my resources went is everything.
If I lose track of copper today, I will lose gold tomorrow.”

Your hours are your copper. Once spent without account, no fortune can buy them back.`,
    takeaway: 'Audit your day before you rest. Awareness of where time leaks is the prerequisite of discipline.',
    published: true,
    completedBy: [],
  },
];

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    name: 'Free',
    price: '$0',
    billingPeriod: 'Forever',
    features: [
      '24-Hour Daily Planner',
      'Eisenhower Matrix',
      'Daily Reflection Journal',
      'Starter Productivity Lessons',
      'Standard Local Storage',
    ],
    active: true,
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: '$12',
    billingPeriod: 'per month',
    features: [
      'Everything in Free',
      'Distraction-Free Focus Timer',
      'Unlimited Historical Planner Archive',
      'Complete Lessons & Wisdom Library',
      'Export Data to JSON / CSV',
      'Priority Support',
    ],
    active: true,
  },
];

export const INITIAL_SETTINGS: AppSettings = {
  appName: 'SHARPEN',
  tagline: 'Plan. Execute. Improve.',
  allowRegistration: true,
  defaultPlan: 'Free',
};

export function getInitialTasks(): Task[] {
  const today = getTodayDateString();
  return [
    {
      id: 'task-1',
      title: 'Review Eisenhower Do Now priorities & schedule',
      date: today,
      startTime: '07:00',
      endTime: '08:00',
      priority: 'DO_NOW',
      category: 'Planning',
      status: 'DONE',
      completed: true,
      notes: 'Aligned top 3 items for the morning focus session.',
    },
    {
      id: 'task-2',
      title: 'Deep Focus Block: Core system implementation',
      date: today,
      startTime: '08:00',
      endTime: '11:00',
      priority: 'DO_NOW',
      category: 'Deep Work',
      status: 'DONE',
      completed: true,
      notes: 'No notifications. Shipped the primary module on time.',
    },
    {
      id: 'task-3',
      title: 'Team sync & unblock engineering dependencies',
      date: today,
      startTime: '11:00',
      endTime: '12:00',
      priority: 'SCHEDULE',
      category: 'Collaboration',
      status: 'DONE',
      completed: true,
      notes: 'Addressed blockers for upcoming release.',
    },
    {
      id: 'task-4',
      title: 'Triage incoming emails & delegate routine queries',
      date: today,
      startTime: '13:00',
      endTime: '14:00',
      priority: 'DELEGATE',
      category: 'Administration',
      status: 'IN_PROGRESS',
      completed: false,
      notes: 'Hand off standard support requests.',
    },
    {
      id: 'task-5',
      title: 'System architecture review & refactoring',
      date: today,
      startTime: '14:00',
      endTime: '16:00',
      priority: 'SCHEDULE',
      category: 'Deep Work',
      status: 'TODO',
      completed: false,
      notes: 'Optimize database indexes and cache layer.',
    },
    {
      id: 'task-6',
      title: 'Unsubscribe from non-essential notification feeds',
      date: today,
      startTime: '16:00',
      endTime: '17:00',
      priority: 'ELIMINATE',
      category: 'Maintenance',
      status: 'TODO',
      completed: false,
      notes: 'Eliminate digital noise.',
    },
    {
      id: 'task-7',
      title: 'Physical training / 5km run',
      date: today,
      startTime: '18:00',
      endTime: '19:00',
      priority: 'SCHEDULE',
      category: 'Health',
      status: 'TODO',
      completed: false,
      notes: 'Maintain energy and clarity.',
    },
    {
      id: 'task-8',
      title: 'Evening audit & daily reflection',
      date: today,
      startTime: '21:00',
      endTime: '22:00',
      priority: 'DO_NOW',
      category: 'Review',
      status: 'TODO',
      completed: false,
      notes: 'Record accomplishments, distractions, and tomorrow improvements.',
    },
  ];
}

export function getInitialReflections(): Record<string, Reflection> {
  const today = getTodayDateString();
  return {
    [today]: {
      date: today,
      wentWell: 'Protected the 3-hour deep work block from 08:00 to 11:00 without checking notifications.',
      distracted: 'Spent 20 extra minutes reviewing non-urgent email threads after lunch.',
      improveTomorrow: 'Batch all correspondence strictly into the 13:00-14:00 block and keep morning pristine.',
      savedAt: new Date().toISOString(),
    },
  };
}

export function getInitialFocusSessions(): FocusSession[] {
  return [
    {
      id: 'focus-1',
      taskId: 'task-2',
      taskTitle: 'Deep Focus Block: Core system implementation',
      durationMinutes: 45,
      completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'focus-2',
      taskId: 'task-2',
      taskTitle: 'Deep Focus Block: Core system implementation',
      durationMinutes: 45,
      completedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
  ];
}
