import { create } from 'zustand';
import {
  Subject,
  SubjectWithParallels,
  Preferences,
  WorkflowStep,
} from '../types';

interface ScheduleStore {
  currentStep: WorkflowStep;
  selectedSubjects: SubjectWithParallels[];
  preferences: Preferences | null;

  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  addSubject: (subject: Subject) => void;
  removeSubject: (code: string) => void;
  addParallel: (subjectCode: string, parallel: string) => void;
  removeParallel: (subjectCode: string, parallel: string) => void;
  setPreferences: (preferences: Preferences) => void;
  reset: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set, _) => ({
  currentStep: 'choose-subjects',
  selectedSubjects: [],
  preferences: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  addSubject: (subject) =>
    set((state) => {
      const exists = state.selectedSubjects.some(
        (s) => s.code === subject.code
      );
      if (exists) return state;

      return {
        selectedSubjects: [
          ...state.selectedSubjects,
          {
            ...subject,
            parallels: [],
          },
        ],
      };
    }),

  removeSubject: (code) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.filter((s) => s.code !== code),
    })),

  addParallel: (subjectCode, parallel) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.map((subject) =>
        subject.code === subjectCode
          ? { ...subject, parallels: [...subject.parallels, parallel] }
          : subject
      ),
    })),

  removeParallel: (subjectCode, parallel) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.map((subject) =>
        subject.code === subjectCode
          ? {
              ...subject,
              parallels: subject.parallels.filter((p) => p !== parallel),
            }
          : subject
      ),
    })),

  setPreferences: (preferences) => set({ preferences }),

  reset: () =>
    set({
      currentStep: 'choose-subjects',
      selectedSubjects: [],
      preferences: null,
    }),
}));
