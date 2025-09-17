import { create } from 'zustand'

import type { WorkoutSession, ExerciseSeriesWorkout, WorkoutDays, UUID } from '@/types/GymTracker'

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

  // Day and session management
  currentWorkoutDay: WorkoutDays | null
  currentSessionIndex: number
  allDaySessions: WorkoutSession[]

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

  // Day and session management
  setWorkoutDay: (workoutDay: WorkoutDays, allSessions: WorkoutSession[]) => void
  nextSession: () => boolean
  hasMoreSessions: () => boolean
  isLastSessionOfDay: () => boolean
  syncSessionIndex: (sessionId: UUID) => void
  validateSessionConsistency: () => void

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

    // Day and session management
    currentWorkoutDay: null,
    currentSessionIndex: 0,
    allDaySessions: [],

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

    // Day and session management
    setWorkoutDay: (workoutDay: WorkoutDays, allSessions: WorkoutSession[]) => {
      set({
        currentWorkoutDay: workoutDay,
        allDaySessions: allSessions,
        currentSessionIndex: 0
      })

      // Set first session if available
      if (allSessions.length > 0) {
        get().setCurrentWorkoutSession(allSessions[0])
      }
    },

    nextSession: () => {
      const { currentSessionIndex, allDaySessions } = get()
      const nextIndex = currentSessionIndex + 1

      if (nextIndex < allDaySessions.length) {
        set({ currentSessionIndex: nextIndex })
        get().setCurrentWorkoutSession(allDaySessions[nextIndex])
        return true
      }
      return false
    },

    hasMoreSessions: () => {
      const { currentSessionIndex, allDaySessions } = get()
      return currentSessionIndex + 1 < allDaySessions.length
    },

    isLastSessionOfDay: () => {
      const { currentSessionIndex, allDaySessions } = get()
      return currentSessionIndex >= allDaySessions.length - 1
    },

    syncSessionIndex: (sessionId: UUID) => {
      const { allDaySessions } = get()
      const sessionIndex = allDaySessions.findIndex(session => session.id === sessionId)
      
      if (sessionIndex >= 0) {
        set({ currentSessionIndex: sessionIndex })
      }
    },

    validateSessionConsistency: () => {
      const { currentWorkoutSession, currentSessionIndex, allDaySessions } = get()
      
      if (!currentWorkoutSession || allDaySessions.length === 0) return
      
      // Verificar si el currentSessionIndex apunta a la sesión correcta
      const expectedSession = allDaySessions[currentSessionIndex]
      
      if (!expectedSession || expectedSession.id !== currentWorkoutSession.id) {
        // Buscar el índice correcto de la sesión actual
        const correctIndex = allDaySessions.findIndex(session => session.id === currentWorkoutSession.id)
        
        if (correctIndex >= 0) {
          set({ currentSessionIndex: correctIndex })
        }
      }
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
      // Validar consistencia antes de proceder
      get().validateSessionConsistency()
      
      const { currentExerciseIndex, currentWorkoutSession } = get()

      if (!currentWorkoutSession) return

      const nextIndex = currentExerciseIndex + 1
      if (nextIndex < currentWorkoutSession.exercises_series.length) {
        get().setCurrentExercise(nextIndex)
      } else {
        // Si ya no hay más ejercicios en esta sesión, verificar si hay más sesiones
        if (get().hasMoreSessions()) {
          // Avanzar automáticamente a la siguiente sesión
          get().nextSession()
        } else {
          // Si ya no hay más sesiones, limpiar currentExercise para cerrar el player
          set({ currentExercise: null })
        }
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
