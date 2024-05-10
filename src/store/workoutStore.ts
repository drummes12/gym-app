import type { CurrentExcercise } from '@/types/Training'
import { create } from 'zustand'

export const useWorkoutStore = create((set) => ({
  currentRestTime: 5,
  isRest: false,
  currentExercise: {title: 'Press de Banca', currentSet: 0, totalSets: 0, nextWorkout: 'Press de Banca Inclinado'},
  setCurrentRestTime: (currentRestTime: number) => set({ currentRestTime }),
  setIsRest: (isRest: boolean) => set({ isRest }),
  setCurrentExercise: (currentExercise: CurrentExcercise) => set({ currentExercise })
}))