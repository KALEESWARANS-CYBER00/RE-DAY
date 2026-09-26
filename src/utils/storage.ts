import { DayData, PlannerRowData, MatrixTask, DailyReflection } from '../types';

export const HOURS_LABELS = [
  "00:00 – 01:00",
  "01:00 – 02:00",
  "02:00 – 03:00",
  "03:00 – 04:00",
  "04:00 – 05:00",
  "05:00 – 06:00",
  "06:00 – 07:00",
  "07:00 – 08:00",
  "08:00 – 09:00",
  "09:00 – 10:00",
  "10:00 – 11:00",
  "11:00 – 12:00",
  "12:00 – 13:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "15:00 – 16:00",
  "16:00 – 17:00",
  "17:00 – 18:00",
  "18:00 – 19:00",
  "19:00 – 20:00",
  "20:00 – 21:00",
  "21:00 – 22:00",
  "22:00 – 23:00",
  "23:00 – 00:00",
];

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

export function getRelativeDayLabel(dateStr: string): string {
  const today = getTodayDateString();
  if (dateStr === today) return "TODAY";
  
  const [y1, m1, d1] = today.split('-').map(Number);
  const [y2, m2, d2] = dateStr.split('-').map(Number);
  const dt1 = new Date(y1, m1 - 1, d1).getTime();
  const dt2 = new Date(y2, m2 - 1, d2).getTime();
  const diffDays = Math.round((dt2 - dt1) / (1000 * 60 * 60 * 24));

  if (diffDays === -1) return "YESTERDAY";
  if (diffDays === 1) return "TOMORROW";
  return diffDays < 0 ? `${Math.abs(diffDays)} DAYS AGO` : `IN ${diffDays} DAYS`;
}

export function getDefaultPlannerRows(): PlannerRowData[] {
  return HOURS_LABELS.map((label, idx) => {
    let firstHalf = "";
    let secondHalf = "";
    let priority: PlannerRowData['priority'] = '';
    let improvement = "";
    let status: PlannerRowData['status'] = 'TODO';

    if (idx >= 0 && idx < 6) {
      firstHalf = "Deep restorative sleep";
      secondHalf = "Deep restorative sleep";
      priority = 'PLAN';
      improvement = "No blue light before sleep";
      status = 'DONE';
    } else if (idx === 6) {
      firstHalf = "Morning hydration & stretch";
      secondHalf = "Meditation & Day review";
      priority = 'NOW';
      improvement = "Phone stays on silent";
      status = 'DONE';
    } else if (idx === 7) {
      firstHalf = "High-protein breakfast";
      secondHalf = "Review critical priorities";
      priority = 'PLAN';
      improvement = "Review Eisenhower Quadrant 1";
      status = 'DONE';
    } else if (idx === 8) {
      firstHalf = "Deep Work Block: Core project";
      secondHalf = "Core project architecture";
      priority = 'NOW';
      improvement = "Zero interruptions";
      status = 'DONE';
    } else if (idx === 9) {
      firstHalf = "Deep Work Block: Execution";
      secondHalf = "Code review & test run";
      priority = 'NOW';
      improvement = "Commit clean milestones";
      status = 'DONE';
    } else if (idx === 10) {
      firstHalf = "Technical challenge resolution";
      secondHalf = "Team sync / critical updates";
      priority = 'PLAN';
      improvement = "Clear concise communication";
      status = 'DONE';
    } else if (idx === 11) {
      firstHalf = "Documentation & writeup";
      secondHalf = "Inbox triage & delegations";
      priority = 'DELEGATE';
      improvement = "Delegate repetitive tasks";
      status = 'DONE';
    } else if (idx === 12) {
      firstHalf = "Healthy lunch";
      secondHalf = "Outdoor walk & sun exposure";
      priority = 'PLAN';
      improvement = "Disconnect from screen";
      status = 'TODO';
    } else if (idx === 13) {
      firstHalf = "Secondary project sprint";
      secondHalf = "Bug squash & optimization";
      priority = 'PLAN';
      improvement = "Track time bottlenecks";
      status = 'TODO';
    } else if (idx === 14) {
      firstHalf = "Creative problem solving";
      secondHalf = "System design refinement";
      priority = 'PLAN';
      improvement = "Write thoughts before coding";
      status = 'TODO';
    } else if (idx === 15) {
      firstHalf = "Client/peer code review";
      secondHalf = "Testing edge cases";
      priority = 'NOW';
      improvement = "Automate manual checks";
      status = 'TODO';
    } else if (idx === 16) {
      firstHalf = "Knowledge learning & skill sharpener";
      secondHalf = "Skill practice sprint";
      priority = 'PLAN';
      improvement = "30 mins uninterrupted study";
      status = 'TODO';
    } else if (idx === 17) {
      firstHalf = "Day wrap-up & git push";
      secondHalf = "Organize desk & tomorrow draft";
      priority = 'NOW';
      improvement = "Leave workspace immaculate";
      status = 'TODO';
    } else if (idx === 18) {
      firstHalf = "Strength training / workout";
      secondHalf = "Cardio & cool down";
      priority = 'PLAN';
      improvement = "Push past comfort zone";
      status = 'TODO';
    } else if (idx === 19) {
      firstHalf = "Shower & dinner with family";
      secondHalf = "Healthy evening meal";
      priority = 'PLAN';
      improvement = "Be fully present";
      status = 'TODO';
    } else if (idx === 20) {
      firstHalf = "Personal passion project";
      secondHalf = "Creative writing / building";
      priority = 'PLAN';
      improvement = "Sharpen your craft";
      status = 'TODO';
    } else if (idx === 21) {
      firstHalf = "Read books (Stoicism / Philosophy)";
      secondHalf = "Daily reflection & Sharpen log";
      priority = 'NOW';
      improvement = "Write honest reflection";
      status = 'TODO';
    } else if (idx === 22) {
      firstHalf = "Prepare clothes & notes for tomorrow";
      secondHalf = "Wind-down routine & stretch";
      priority = 'PLAN';
      improvement = "Screens off by 22:30";
      status = 'TODO';
    } else if (idx === 23) {
      firstHalf = "Restorative sleep";
      secondHalf = "Restorative sleep";
      priority = 'PLAN';
      improvement = "Dark cool bedroom";
      status = 'TODO';
    }

    return {
      id: `hour-${String(idx).padStart(2, '0')}`,
      hour: idx,
      timeLabel: label,
      activityFirstHalf: firstHalf,
      activitySecondHalf: secondHalf,
      priority,
      nextImprovement: improvement,
      status,
    };
  });
}

export function getDefaultMatrixTasks(): MatrixTask[] {
  return [
    {
      id: 'matrix-1',
      title: 'Finalize critical deployment pipeline release',
      quadrant: 'Q1',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-2',
      title: 'Fix edge case in core billing calculation',
      quadrant: 'Q1',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-3',
      title: 'Plan weekly architecture roadmap & milestones',
      quadrant: 'Q2',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-4',
      title: 'Read 25 pages of deep discipline book',
      quadrant: 'Q2',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-5',
      title: 'Delegate meeting transcript summaries to teammate',
      quadrant: 'Q3',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-6',
      title: 'Filter vendor notification emails to automated folder',
      quadrant: 'Q3',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-7',
      title: 'Unsubscribe from spam newsletters and social feeds',
      quadrant: 'Q4',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'matrix-8',
      title: 'Avoid mindless scrolling during transit',
      quadrant: 'Q4',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];
}

export function getDefaultReflection(): DailyReflection {
  return {
    accomplishments: "Completed the core productivity system architecture and shipped all critical priorities without compromise.",
    learnings: "Every challenge isn't an obstacle—it is the grindstone that sharpens our focus and removes the dull edges of complacency.",
    improvements: "Protect the 08:00-11:00 deep work block with zero distractions. Prepare notes before starting.",
    savedAt: new Date().toISOString(),
  };
}

const STORAGE_PREFIX = 'sharpen_day_';

export function loadDayData(dateStr: string): DayData {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${dateStr}`);
    if (raw) {
      const parsed = JSON.parse(raw) as DayData;
      if (parsed.plannerRows && parsed.plannerRows.length === 24) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading day data:', err);
  }

  const isToday = dateStr === getTodayDateString();
  const newDayData: DayData = {
    date: dateStr,
    plannerRows: isToday ? getDefaultPlannerRows() : getEmptyPlannerRows(),
    matrixTasks: isToday ? getDefaultMatrixTasks() : [],
    reflection: isToday ? getDefaultReflection() : { accomplishments: '', learnings: '', improvements: '' },
    lastUpdated: new Date().toISOString(),
  };

  saveDayData(newDayData);
  return newDayData;
}

export function getEmptyPlannerRows(): PlannerRowData[] {
  return HOURS_LABELS.map((label, idx) => ({
    id: `hour-${String(idx).padStart(2, '0')}`,
    hour: idx,
    timeLabel: label,
    activityFirstHalf: '',
    activitySecondHalf: '',
    priority: '',
    nextImprovement: '',
    status: 'TODO',
  }));
}

export function saveDayData(dayData: DayData): void {
  try {
    dayData.lastUpdated = new Date().toISOString();
    localStorage.setItem(`${STORAGE_PREFIX}${dayData.date}`, JSON.stringify(dayData));
  } catch (err) {
    console.error('Error saving day data:', err);
  }
}

export function resetDayData(dateStr: string): DayData {
  const cleanData: DayData = {
    date: dateStr,
    plannerRows: getEmptyPlannerRows(),
    matrixTasks: [],
    reflection: { accomplishments: '', learnings: '', improvements: '' },
    lastUpdated: new Date().toISOString(),
  };
  saveDayData(cleanData);
  return cleanData;
}

export function clearCompletedPlanner(dateStr: string, currentData: DayData): DayData {
  const updatedRows = currentData.plannerRows.map((row: PlannerRowData) => {
    if (row.status === 'DONE') {
      return {
        ...row,
        status: 'TODO' as const,
      };
    }
    return row;
  });

  const updatedData: DayData = {
    ...currentData,
    date: dateStr,
    plannerRows: updatedRows,
  };
  saveDayData(updatedData);
  return updatedData;
}
