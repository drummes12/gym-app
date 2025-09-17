import { create } from 'zustand'

import type { WorkoutSession, ExerciseSeriesWorkout } from '@/types/GymTracker'

interface SelectedExercise {
  exercise: ExerciseSeriesWorkout
  currentSet: number
  completedSets: boolean[]
}

interface WorkoutSessionStoreState {
  // Current session state
  currentWorkoutSession: WorkoutSession | null
  currentExercise: SelectedExercise | null
  currentExerciseIndex: number

  // Session progress
  sessionStartTime: Date | null
  sessionProgress: {
    totalExercises: number
    completedExercises: number
    totalSets: number
    completedSets: number
  }

  // Actions
  setCurrentWorkoutSession: (workoutSession: WorkoutSession) => void
  setCurrentExercise: (exerciseIndex: number) => void

  // Exercise navigation
  nextExercise: () => void
  previousExercise: () => void

  // Set management
  markSetComplete: (setIndex: number) => void
  markSetIncomplete: (setIndex: number) => void
  nextSet: () => void

  // Session management
  startSession: () => void
  endSession: () => void
  resetSession: () => void

  // Progress tracking
  updateProgress: () => void
  getSessionDuration: () => number
  isSessionComplete: () => boolean
}

export const useWorkoutSessionStore = create<WorkoutSessionStoreState>(
  (set, get) => ({
    // Initial state
    currentWorkoutSession: null,
    currentExercise: null,
    currentExerciseIndex: 0,

    sessionStartTime: null,
    sessionProgress: {
      totalExercises: 0,
      completedExercises: 0,
      totalSets: 0,
      completedSets: 0
    },

    // Actions
    setCurrentWorkoutSession: (workoutSession: WorkoutSession) => {
      set({
        currentWorkoutSession: workoutSession,
        currentExerciseIndex: 0,
        currentExercise: null
      })

      // Set first exercise
      if (workoutSession.exercises_series.length > 0) {
        get().setCurrentExercise(0)
      }

      get().updateProgress()
    },

    setCurrentExercise: (exerciseIndex: number) => {
      const { currentWorkoutSession } = get()

      if (
        !currentWorkoutSession ||
        exerciseIndex >= currentWorkoutSession.exercises_series.length
      ) {
        return
      }

      const exercise = currentWorkoutSession.exercises_series[exerciseIndex]
      const totalSets = exercise.sets || 1

      const selectedExercise: SelectedExercise = {
        exercise,
        currentSet: 0,
        completedSets: new Array(totalSets).fill(false)
      }

      set({
        currentExercise: selectedExercise,
        currentExerciseIndex: exerciseIndex
      })
    },

    // Exercise navigation
    nextExercise: () => {
      const { currentExerciseIndex, currentWorkoutSession } = get()

      if (!currentWorkoutSession) return

      const nextIndex = currentExerciseIndex + 1
      if (nextIndex < currentWorkoutSession.exercises_series.length) {
        get().setCurrentExercise(nextIndex)
      }
    },

    previousExercise: () => {
      const { currentExerciseIndex } = get()

      if (currentExerciseIndex > 0) {
        get().setCurrentExercise(currentExerciseIndex - 1)
      }
    },

    // Set management
    markSetComplete: (setIndex: number) => {
      const { currentExercise } = get()

      if (
        !currentExercise ||
        setIndex >= currentExercise.completedSets.length
      ) {
        return
      }

      const newCompletedSets = [...currentExercise.completedSets]
      newCompletedSets[setIndex] = true

      set({
        currentExercise: {
          ...currentExercise,
          completedSets: newCompletedSets
        }
      })

      get().updateProgress()
    },

    markSetIncomplete: (setIndex: number) => {
      const { currentExercise } = get()

      if (
        !currentExercise ||
        setIndex >= currentExercise.completedSets.length
      ) {
        return
      }

      const newCompletedSets = [...currentExercise.completedSets]
      newCompletedSets[setIndex] = false

      set({
        currentExercise: {
          ...currentExercise,
          completedSets: newCompletedSets
        }
      })

      get().updateProgress()
    },

    nextSet: () => {
      const { currentExercise } = get()

      if (!currentExercise) return

      const nextSetIndex = currentExercise.currentSet + 1
      if (nextSetIndex < currentExercise.completedSets.length) {
        set({
          currentExercise: {
            ...currentExercise,
            currentSet: nextSetIndex
          }
        })
      } else {
        // Si ya estamos en el último set, pasar al siguiente ejercicio
        get().nextExercise()
      }
    },

    // Session management
    startSession: () => {
      set({ sessionStartTime: new Date() })
    },

    endSession: () => {
      // Here you could save session data, send analytics, etc.
      get().resetSession()
    },

    resetSession: () => {
      set({
        currentWorkoutSession: null,
        currentExercise: null,
        currentExerciseIndex: 0,
        sessionStartTime: null,
        sessionProgress: {
          totalExercises: 0,
          completedExercises: 0,
          totalSets: 0,
          completedSets: 0
        }
      })
    },

    // Progress tracking
    updateProgress: () => {
      const { currentWorkoutSession } = get()

      if (!currentWorkoutSession) {
        set({
          sessionProgress: {
            totalExercises: 0,
            completedExercises: 0,
            totalSets: 0,
            completedSets: 0
          }
        })
        return
      }

      const totalExercises = currentWorkoutSession.exercises_series.length
      const totalSets = currentWorkoutSession.exercises_series.reduce(
        (total, exercise) => total + (exercise.sets || 1),
        0
      )

      // Calculate completed exercises and sets
      let completedExercises = 0
      let completedSets = 0

      // This would need to be implemented based on your completion logic
      // For now, we'll use placeholder values

      set({
        sessionProgress: {
          totalExercises,
          completedExercises,
          totalSets,
          completedSets
        }
      })
    },

    getSessionDuration: () => {
      const { sessionStartTime } = get()

      if (!sessionStartTime) return 0

      return Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)
    },

    isSessionComplete: () => {
      const { sessionProgress } = get()
      return (
        sessionProgress.completedExercises === sessionProgress.totalExercises
      )
    }
  })
)
