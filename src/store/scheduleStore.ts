import {
  GeneratedSchedule,
  Parallel,
  SchedulePreferences,
  Subject,
  WorkflowStep,
} from '@/types/schedule';
import { create } from 'zustand';

interface ScheduleState {
  currentStep: WorkflowStep;
  selectedSubjects: Subject[];
  subjectParallels: Record<string, Parallel[]>;
  preferences: SchedulePreferences;
  generatedSchedules: GeneratedSchedule[];

  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  addSubject: (subject: Subject) => void;
  removeSubject: (subjectId: string) => void;
  addParallel: (subjectId: string, parallel: Parallel) => void;
  removeParallel: (subjectId: string, parallelId: string) => void;
  setPreferences: (preferences: SchedulePreferences) => void;
  setGeneratedSchedules: (schedules: GeneratedSchedule[]) => void;
  resetStore: () => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  currentStep: 1,
  selectedSubjects: [],
  subjectParallels: {},
  preferences: {
    entryTime: '',
    exitTime: '',
    maxSubjectsPerDay: 3,
  },
  generatedSchedules: [],

  setCurrentStep: (step) => set({ currentStep: step }),

  addSubject: (subject) =>
    set((state) => ({
      selectedSubjects: [...state.selectedSubjects, subject],
    })),

  removeSubject: (subjectId) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.filter(
        (s) => s.id !== subjectId
      ),
      subjectParallels: Object.fromEntries(
        Object.entries(state.subjectParallels).filter(
          ([key]) => key !== subjectId
        )
      ),
    })),

  addParallel: (subjectId, parallel) =>
    set((state) => ({
      subjectParallels: {
        ...state.subjectParallels,
        [subjectId]: [...(state.subjectParallels[subjectId] || []), parallel],
      },
    })),

  removeParallel: (subjectId, parallelId) =>
    set((state) => ({
      subjectParallels: {
        ...state.subjectParallels,
        [subjectId]:
          state.subjectParallels[subjectId]?.filter(
            (p) => p.id !== parallelId
          ) || [],
      },
    })),

  setPreferences: (preferences) => set({ preferences }),

  setGeneratedSchedules: (schedules) => set({ generatedSchedules: schedules }),

  resetStore: () =>
    set({
      currentStep: 1,
      selectedSubjects: [],
      subjectParallels: {},
      preferences: {
        entryTime: '',
        exitTime: '',
        maxSubjectsPerDay: 3,
      },
      generatedSchedules: [],
    }),
}));
