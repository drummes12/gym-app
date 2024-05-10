import type { CurrentExercise } from '@/types/Training'
import { create } from 'zustand'

export const useWorkoutStore = create((set) => ({
  isRest: false,
  currentExercise: {
    title: 'Selecciona un ejercicio',
    currentSet: 0,
    totalSets: 0,
    nextWorkout: 'Selecciona un ejercicio',
    breakRest: 0,
    rest: 0,
  },
  setIsRest: (isRest: boolean) => set({ isRest }),
  setCurrentExercise: (currentExercise: CurrentExercise) => set({ currentExercise }),
}))
