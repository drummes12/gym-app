import confetti from 'canvas-confetti'
import { create } from 'zustand'

import type {
  CurrentExercise,
  UUID,
  WorkoutSessionDay
} from '@/types/GymTracker'
import { REST_AFTER_EXERCISE, REST_BETWEEN_SETS } from '@/constants'

export interface WorkoutStoreState {
  isRest: boolean
  timeRest: number
  dialogElement: HTMLDialogElement | null
  currentRestDuration: number
  astroUrl: URL | null
  workoutSessionDay: WorkoutSessionDay | null
  currentExercise: CurrentExercise | null

  setIsRest: (isRest: boolean) => void
  setAstroUrl: (astroUrl: URL) => void
  setWorkoutSessionDay: (workoutDay: UUID) => void
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
  isRest: false,
  timeRest: 0,
  dialogElement: null,
  astroUrl: null,
  currentRestDuration: 0,
  workoutSessionDay: null,
  currentExercise: null,

  setIsRest: (isRest: boolean) => set({ isRest }),
  setAstroUrl: (astroUrl: URL) => set({ astroUrl }),
  setWorkoutSessionDay: (workoutDayId: UUID) => {
    const { astroUrl } = get()
    if (!astroUrl) return
    const endpoint = new URL(`/api/workouts/${workoutDayId}`, astroUrl)
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          response.json().then((workoutDay) => {
            console.log(workoutDay)
          })
        }
      })
      .catch(() => {})
  },
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
