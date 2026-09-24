import React, { useState, useEffect, useCallback } from 'react';
import { 
  getTodayDateString, 
  loadDayData, 
  saveDayData, 
  resetDayData, 
  clearCompletedPlanner,
  getDefaultPlannerRows
} from './utils/storage';
import { DayData, PlannerRowData, MatrixTask, DailyReflection as ReflectionType, ToastMessage, MatrixQuadrant } from './types';
import { Atmosphere } from './components/Atmosphere';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DailyProgress } from './components/DailyProgress';
import { DayNavigator } from './components/DayNavigator';
import { DailyPlanner } from './components/DailyPlanner';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { StorySection } from './components/StorySection';
import { DailyReflection } from './components/DailyReflection';
import { DailySummary } from './components/DailySummary';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ResetConfirmModal } from './components/ResetConfirmModal';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [dayData, setDayData] = useState<DayData>(() => loadDayData(selectedDate));
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Auto-detect current local hour every minute
  useEffect(() => {
    const updateHour = () => {
      setCurrentHour(new Date().getHours());
    };
    updateHour();
    const timer = setInterval(updateHour, 30000);
    return () => clearInterval(timer);
  }, []);

  // Sync day data when selectedDate changes
  useEffect(() => {
    const data = loadDayData(selectedDate);
    setDayData(data);
  }, [selectedDate]);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Update a single planner row
  const handleUpdateRow = useCallback((rowId: string, updates: Partial<PlannerRowData>) => {
    setDayData((prev) => {
      const updatedRows = prev.plannerRows.map((r) =>
        r.id === rowId ? { ...r, ...updates } : r
      );
      const updatedData: DayData = {
        ...prev,
        plannerRows: updatedRows,
      };
      saveDayData(updatedData);
      return updatedData;
    });
  }, []);

  // Save full day data explicitly
  const handleSaveDay = useCallback(() => {
    saveDayData(dayData);
    showToast('DAY SAVED — ALL SESSIONS LOCKED', 'success');
  }, [dayData, showToast]);

  // Reset current day with confirmation
  const handleConfirmResetDay = useCallback(() => {
    const clean = resetDayData(selectedDate);
    setDayData(clean);
    setIsResetModalOpen(false);
    showToast('DAY DATA RESET COMPLETED', 'info');
  }, [selectedDate, showToast]);

  // Clear completed rows back to TODO
  const handleClearCompleted = useCallback(() => {
    const updated = clearCompletedPlanner(selectedDate, dayData);
    setDayData(updated);
    showToast('COMPLETED BLOCKS RESET TO TODO', 'info');
  }, [selectedDate, dayData, showToast]);

  // Load default template
  const handleLoadTemplate = useCallback(() => {
    setDayData((prev) => {
      const templatedRows = getDefaultPlannerRows();
      const updated: DayData = {
        ...prev,
        plannerRows: templatedRows,
      };
      saveDayData(updated);
      return updated;
    });
    showToast('PRODUCTIVITY BLUEPRINT LOADED', 'success');
  }, [showToast]);

  // Matrix task management
  const handleAddTask = useCallback((title: string, quadrant: MatrixQuadrant) => {
    const newTask: MatrixTask = {
      id: `task-${Date.now()}`,
      title,
      quadrant,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setDayData((prev) => {
      const updated: DayData = {
        ...prev,
        matrixTasks: [newTask, ...prev.matrixTasks],
      };
      saveDayData(updated);
      return updated;
    });
    showToast('TASK ADDED TO MATRIX', 'success');
  }, [showToast]);

  const handleUpdateTask = useCallback((id: string, updates: Partial<MatrixTask>) => {
    setDayData((prev) => {
      const updated: DayData = {
        ...prev,
        matrixTasks: prev.matrixTasks.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      };
      saveDayData(updated);
      return updated;
    });
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setDayData((prev) => {
      const updated: DayData = {
        ...prev,
        matrixTasks: prev.matrixTasks.filter((t) => t.id !== id),
      };
      saveDayData(updated);
      return updated;
    });
    showToast('TASK REMOVED', 'info');
  }, [showToast]);

  // Reflection management
  const handleUpdateReflection = useCallback((updates: Partial<ReflectionType>) => {
    setDayData((prev) => {
      const updated: DayData = {
        ...prev,
        reflection: {
          ...prev.reflection,
          ...updates,
        },
      };
      saveDayData(updated);
      return updated;
    });
  }, []);

  const handleSaveReflection = useCallback(() => {
    saveDayData(dayData);
    showToast('DAILY REFLECTION SAVED', 'success');
  }, [dayData, showToast]);

  // Smooth scroll helpers for Hero buttons
  const scrollToPlanner = useCallback(() => {
    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Calculate completed metrics
  const completedHoursCount = dayData.plannerRows.filter((r) => r.status === 'DONE').length;
  const completionPercentage = Math.round((completedHoursCount / 24) * 100);

  return (
    <div className="relative min-h-screen bg-background text-zinc-100 selection:bg-crimson selection:text-white">
      {/* Cinematic Background Atmosphere */}
      <Atmosphere />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentDateStr={selectedDate}
          completionPercentage={completionPercentage}
          completedHours={completedHoursCount}
        />

        {/* 1. Hero Section */}
        <Hero
          onStartClick={scrollToPlanner}
          onViewPlannerClick={scrollToPlanner}
          currentDateStr={selectedDate}
        />

        {/* 2. Compact Daily Progress Section */}
        <DailyProgress
          plannerRows={dayData.plannerRows}
          currentHour={currentHour}
        />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          {/* Day Selector & Historical Date Navigation */}
          <DayNavigator
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* 3. 24-Hour Daily Planner */}
          <DailyPlanner
            rows={dayData.plannerRows}
            currentHour={currentHour}
            onUpdateRow={handleUpdateRow}
            onSaveDay={handleSaveDay}
            onResetDay={() => setIsResetModalOpen(true)}
            onClearCompleted={handleClearCompleted}
            onLoadTemplate={handleLoadTemplate}
          />

          {/* 4. Eisenhower Decision Matrix */}
          <EisenhowerMatrix
            tasks={dayData.matrixTasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />

          {/* 5. Story of the Day: The Broken Pencil */}
          <StorySection />

          {/* 6. Daily Reflection */}
          <DailyReflection
            reflection={dayData.reflection}
            onUpdateReflection={handleUpdateReflection}
            onSaveReflection={handleSaveReflection}
          />

          {/* 7. Daily Review & Performance Scorecard */}
          <DailySummary dayData={dayData} />
        </main>

        {/* 8. Minimal Cinematic Footer */}
        <Footer />
      </div>

      {/* Confirmation Modal for Reset Day */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        dateStr={selectedDate}
        onConfirm={handleConfirmResetDay}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Custom Floating Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
