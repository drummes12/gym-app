import type { CurrentSet, Exercises } from '@/types/GymTracker'
import { create } from 'zustand'

export interface TrainingStoreState {
  isPlayerBarVisible: boolean
  showPlayerBar: () => void
  hidePlayerBar: () => void

  isExerciseInfoVisible: boolean
  exerciseInfo: Exercises | null
  showExerciseInfo: (exercise: Exercises) => void
  hideExerciseInfo: () => void

  currentSet: CurrentSet | null
  setCurrentSet: (currentSet: CurrentSet) => void
  setNextSet: () => void
}

export const useTrainingStore = create<TrainingStoreState>((set, get) => ({
  isPlayerBarVisible: false,
  showPlayerBar: () => {
    set({ isPlayerBarVisible: true })
  },
  hidePlayerBar: () => {
    set({ isPlayerBarVisible: false })
  },

  isExerciseInfoVisible: false,
  exerciseInfo: null,
  showExerciseInfo: (exercise) => {
    set({ isExerciseInfoVisible: true, exerciseInfo: exercise })
  },
  hideExerciseInfo: () => {
    set({ isExerciseInfoVisible: false })
  },

  currentSet: null,
  setCurrentSet: (currentSet: CurrentSet) => {
    set({ currentSet })
  },
  setNextSet: () => {
    const { currentSet } = get()
    if (currentSet === null) return

    const { sets, numberSet } = currentSet
    const totalSets = sets?.length ?? 0
    if (numberSet < totalSets) {
      set({
        currentSet: {
          ...currentSet,
          numberSet: numberSet + 1,
          reps: sets[numberSet].reps,
          weight: sets[numberSet].weight
        }
      })
    }
  }
}))
