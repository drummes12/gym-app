import confetti from 'canvas-confetti'
import { create } from 'zustand'

import type { CurrentExercise, Workout } from '@/types/Training'

import { TRAINING } from '@/data/training'

const REST = 60
const BREAK = 90

export interface WorkoutStoreState {
  isRest: boolean
  currentExercise: CurrentExercise | null
  nextExercise: Workout | null,
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
    const flattenedWorkouts = TRAINING.flatMap(training => 
        training.workouts.flatMap(workout => 
          Array.isArray(workout) ? { ...workout?.[0], day: training.day } : [{ ...workout, day: training.day }]
        )
      )
    const currentWorkout = flattenedWorkouts.find(workout => workout.title === currentExercise.title)
    if (!currentWorkout) return
    const dayWorkouts = flattenedWorkouts.filter(workout => workout.day === currentWorkout.day)
    const nextWorkoutIndex = dayWorkouts.findIndex(workout => workout.title === currentWorkout.title) + 1

    const restTime = currentExercise.rest || REST
    set({
      currentExercise,
      currentRestDuration: restTime,
      timeRest: restTime,
      nextExercise: dayWorkouts[nextWorkoutIndex] ?? null
    })
  },
  resetCurrentExercise: () => {
    const { currentExercise } = get()
    if (currentExercise) {
      const restTime = currentExercise.rest || REST
      set({
        currentExercise: { ...currentExercise, currentSet: 0 },
        currentRestDuration: restTime,
        timeRest: restTime
      })
    }
  },
  addCurrentSet: () => {
    const { currentExercise } = get()
    if (currentExercise) {
      const { currentSet, sets = 0, breakRest = BREAK, rest = REST } = currentExercise
      const newRestTime = currentSet === sets - 2 ? breakRest ?? rest : rest
      set({
        currentExercise: { ...currentExercise, currentSet: currentExercise.currentSet + 1 },
        timeRest: newRestTime,
        currentRestDuration: newRestTime
      })
    }
  },

  startTimer: () => {
    const intervalId = setInterval(() => {
      set((state) => {
        const { isRest, timeRest, currentExercise, addCurrentSet, resetCurrentExercise, showDialog } = state
        if (!isRest) {
          clearInterval(intervalId)
          return { isRest: false }
        }

        if (timeRest <= 1) {
          clearInterval(intervalId)

          if (currentExercise === null) return { isRest: false }
          const { title, currentSet, sets = 0 } = currentExercise
          if (title === '') return { isRest: false }

          if (currentSet === sets - 1) {
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
  setCurrentRestDuration: (currentRestDuration: number) => set({ currentRestDuration }),
  setTimeRest: (timeRest: number) => set({ timeRest }),

  setDialogElement: (dialogElement: HTMLDialogElement | null) => set({ dialogElement }),
  showDialog: () => {
    const dialogElement = get().dialogElement
    dialogElement?.showModal()
  },
  hideDialog: () => {
    const { dialogElement } = get()
    dialogElement?.close()
  }
}))
