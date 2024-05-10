import type { CurrentExercise } from '@/types/Training'
import { create } from 'zustand'

export interface WorkoutStoreState {
  isRest: boolean
  currentExercise: CurrentExercise
  setIsRest: (isRest: boolean) => void
  setCurrentExercise: (currentExercise: CurrentExercise) => void
}

export const useWorkoutStore = create<WorkoutStoreState>((set) => ({
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
