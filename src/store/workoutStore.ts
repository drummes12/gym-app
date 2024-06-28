import confetti from 'canvas-confetti'
import { create } from 'zustand'

import type { CurrentExercise, Exercises } from '@/types/GymTracker'

const REST_BETWEEN_SETS = 60
const REST_AFTER_EXERCISE = 90

export interface WorkoutStoreState {
  isRest: boolean
  currentExercise: CurrentExercise | null
  nextExercise: Exercises | null
  currentRestDuration: number
  timeRest: number
  dialogElement: HTMLDialogElement | null

  setIsRest: (isRest: boolean) => void
  setCurrentExercise: (currentExercise: CurrentExercise) => void
  resetCurrentExercise: () => void
  addCurrentSet: () => void

  startTimer: () => void
  setCurrentRestDuration: (currentRestDuration: number) => void
  setTimeRest: (timeRest: number) => void

  setDialogElement: (dialogElement: HTMLDialogElement | null) => void
  showDialog: () => void
  hideDialog: () => void
}

export const useWorkoutStore = create<WorkoutStoreState>((set, get) => ({
  currentRestDuration: 0,
  timeRest: 0,
  isRest: false,
  currentExercise: null,
  nextExercise: null,
  dialogElement: null,

  setIsRest: (isRest: boolean) => set({ isRest }),
  setCurrentExercise: (currentExercise: CurrentExercise) => {
    const { currentExercise: newCurrentExercise, restTime } =
      configSelectedExercise(currentExercise)
    set({
      currentExercise: newCurrentExercise,
      currentRestDuration: restTime,
      timeRest: restTime
    })
  },
  resetCurrentExercise: () => {
    const { currentExercise } = get()

    if (currentExercise) {
      const { currentExercise: newCurrentExercise, restTime } =
        configSelectedExercise({ ...currentExercise })
      set({
        currentExercise: {
          ...newCurrentExercise,
          currentSet: 0
        },
        currentRestDuration: restTime,
        timeRest: restTime
      })
    }
  },
  addCurrentSet: () => {
    const { currentExercise } = get()
    if (currentExercise) {
      const {
        currentSet,
        sets = 0,
        rest_after_exercise = REST_AFTER_EXERCISE,
        rest_between_sets = REST_BETWEEN_SETS
      } = currentExercise
      const isLastSet = currentSet === sets - 2
      const newRestTime = isLastSet
        ? rest_after_exercise ?? rest_between_sets
        : rest_between_sets
      set({
        currentExercise: {
          ...currentExercise,
          rest_after_exercise,
          rest_between_sets,
          currentSet: currentExercise.currentSet + 1
        },
        timeRest: newRestTime,
        currentRestDuration: newRestTime
      })
    }
  },

  startTimer: () => {
    const intervalId = setInterval(() => {
      set((state) => {
        const {
          isRest,
          timeRest,
          currentExercise,
          addCurrentSet,
          resetCurrentExercise,
          showDialog
        } = state
        if (!isRest) {
          clearInterval(intervalId)
          return { isRest: false }
        }

        if (timeRest <= 1) {
          clearInterval(intervalId)

          if (currentExercise === null) return { isRest: false }
          const { title, currentSet, sets = 0 } = currentExercise
          if (title === '') return { isRest: false }

          const isLastSet = currentSet === sets - 1
          if (isLastSet) {
            resetCurrentExercise()
          } else {
            addCurrentSet()
          }
          confetti()
          showDialog()
          return { isRest: false }
        }
        return { timeRest: state.timeRest - 1 }
      })
    }, 1000)
  },
  setCurrentRestDuration: (currentRestDuration: number) =>
    set({ currentRestDuration }),
  setTimeRest: (timeRest: number) => set({ timeRest }),

  setDialogElement: (dialogElement: HTMLDialogElement | null) =>
    set({ dialogElement }),
  showDialog: () => {
    const dialogElement = get().dialogElement
    dialogElement?.showModal()
  },
  hideDialog: () => {
    const { dialogElement } = get()
    dialogElement?.close()
  }
}))

function configSelectedExercise(currentExercise: CurrentExercise) {
  const {
    rest_after_exercise = REST_AFTER_EXERCISE,
    rest_between_sets = REST_BETWEEN_SETS,
    sets = 0,
    currentSet
  } = currentExercise
  let restTime = rest_between_sets

  const isLastSet = currentSet === sets - 2 || (currentSet === 0 && sets === 0)
  if (isLastSet) {
    restTime = rest_after_exercise
  }

  return {
    currentExercise: {
      ...currentExercise,
      rest_after_exercise,
      rest_between_sets
    },
    restTime
  }
}
