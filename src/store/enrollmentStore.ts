import { create } from 'zustand';
import { EnrollmentFormData } from '../types/Course';

interface EnrollmentStore {
  enrollments: EnrollmentFormData[];
  addEnrollment: (enrollment: EnrollmentFormData) => void;
}

export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
  enrollments: [],
  addEnrollment: (enrollment) =>
    set((state) => ({
      enrollments: [...state.enrollments, enrollment],
    })),
}));
