import { useCallback } from 'react'
import { 
  useDataStore, 
  useTimerStore, 
  useUIStore, 
  useWorkoutSessionStore 
} from '@/store'

/**
 * Custom hook that combines all workout-related stores
 * This provides a unified interface while maintaining separation of concerns
 */
export const useWorkout = () => {
  // Data store
  const {
    bodyZones,
    currentWorkoutDay,
    getBodyZone,
    setWorkoutDay,
    clearCache: clearDataCache,
    preloadData
  } = useDataStore()

  // Timer store
  const {
    isRest,
    timeRest,
    setIsRest,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime
  } = useTimerStore()

  // UI store
  const {
    loading,
    dialogs,
    notifications,
    setLoading,
    openDialog,
    closeDialog,
    addNotification
  } = useUIStore()

  // Workout session store
  const {
    currentWorkoutSession,
    currentExercise,
    sessionProgress,
    setCurrentWorkoutSession,
    setCurrentExercise,
    nextExercise,
    previousExercise,
    markSetComplete,
    startSession,
    endSession,
    resetSession,
    getSessionDuration,
    isSessionComplete
  } = useWorkoutSessionStore()

  // Combined actions
  const resetAll = useCallback(() => {
    resetTimer()
    resetSession()
    clearDataCache()
  }, [resetTimer, resetSession, clearDataCache])

  const startWorkout = useCallback(async (workoutDayId: string) => {
    try {
      setLoading(true)
      
      // Load workout day data
      await setWorkoutDay(workoutDayId)
      
      // Start session
      startSession()
      
      addNotification({
        type: 'success',
        message: 'Entrenamiento iniciado'
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error al iniciar el entrenamiento'
      })
    } finally {
      setLoading(false)
    }
  }, [setWorkoutDay, startSession, setLoading, addNotification])

  const completeSet = useCallback((setIndex: number) => {
    markSetComplete(setIndex)
    
    // Start rest timer if configured
    if (currentExercise?.exercise.rest_between_sets) {
      startTimer(currentExercise.exercise.rest_between_sets)
    }
    
    addNotification({
      type: 'success',
      message: `Serie ${setIndex + 1} completada`,
      duration: 2000
    })
  }, [markSetComplete, startTimer, currentExercise, addNotification])

  return {
    // State
    data: {
      bodyZones,
      currentWorkoutDay,
      currentWorkoutSession,
      currentExercise,
      sessionProgress
    },
    timer: {
      isRest,
      timeRest,
      formatTime
    },
    ui: {
      loading,
      dialogs,
      notifications
    },
    
    // Actions
    actions: {
      // Data actions
      getBodyZone,
      preloadData,
      
      // Timer actions
      setIsRest,
      startTimer,
      stopTimer,
      resetTimer,
      
      // UI actions
      setLoading,
      openDialog,
      closeDialog,
      addNotification,
      
      // Session actions
      setCurrentWorkoutSession,
      setCurrentExercise,
      nextExercise,
      previousExercise,
      markSetComplete,
      startSession,
      endSession,
      getSessionDuration,
      isSessionComplete,
      
      // Combined actions
      resetAll,
      startWorkout,
      completeSet
    }
  }
}