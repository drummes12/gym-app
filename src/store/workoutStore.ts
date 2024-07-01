import confetti from 'canvas-confetti'
import { create } from 'zustand'

import type {
  BodyZones,
  CurrentExercise,
  UUID,
  WorkoutDays,
  WorkoutSession
} from '@/types/GymTracker'
import { REST_AFTER_EXERCISE, REST_BETWEEN_SETS } from '@/constants'
import { exercises, workouts, zones } from '@/services'
import { playSound } from '@/services/audioNotification'

export interface WorkoutStoreState {
  isRest: boolean
  timeRest: number
  dialogElement: HTMLDialogElement | null

  bodyZone: BodyZones | null
  workoutDay: WorkoutDays | null
  workoutSessions: WorkoutSession[] | null
  currentWorkoutSession: WorkoutSession | null

  currentExercise: CurrentExercise | null
  currentRestDuration: number

  nextExercise: CurrentExercise | null

  setIsRest: (isRest: boolean) => void

  setBodyZone: (zoneId: UUID) => void
  setWorkoutDay: (workoutDay: UUID) => void
  setCurrentWorkoutSession: (workoutSessionId: UUID) => void

  setCurrentExercise: (
    currentExercise: CurrentExercise,
    workoutSessionId?: UUID
  ) => void
  resetCurrentExercise: () => void
  addCurrentSet: () => void

  setNextExercise: (nextExerciseId: UUID, workoutSessionId?: UUID) => void

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

  bodyZone: null,
  workoutDay: null,
  workoutSessions: null,
  currentWorkoutSession: null,

  currentExercise: null,
  currentRestDuration: 0,

  nextExercise: null,

  setIsRest: (isRest: boolean) => set({ isRest }),

  setBodyZone: (zoneId: UUID) => {
    zones.getZoneById(zoneId).then((bodyZone) => {
      set({ bodyZone })
    })
  },
  setWorkoutDay: (workoutDayId: UUID) => {
    workouts.getWorkoutDayById(workoutDayId).then((workoutDay) => {
      set({ workoutSessions: null })
      const { workout_sessions } = workoutDay
      if (workout_sessions.length === 0) return
      workout_sessions.forEach((workoutSessionId) => {
        workouts
          .getWorkoutSessionById(workoutSessionId)
          .then((workoutSession) => {
            set((state) => {
              const { workoutSessions } = state
              return {
                workoutDay,
                workoutSessions: workoutSessions
                  ? [...workoutSessions, workoutSession]
                  : [workoutSession]
              }
            })
          })
      })
    })
  },
  setCurrentWorkoutSession: (workoutSessionId: UUID) => {
    const { workoutSessions } = get()
    const currentWorkoutSession = workoutSessions?.find(
      (session) => session.id === workoutSessionId
    )
    set({ currentWorkoutSession })
  },

  setCurrentExercise: (currentExercise: CurrentExercise) => {
    const { currentWorkoutSession } = get()
    set({ nextExercise: null })

    const { exercises_series } = currentWorkoutSession ?? {
      exercises_series: []
    }
    const currentSequence = currentExercise.sequence ?? 0
    const nextExercise = exercises_series.find(
      (exercise) => exercise.sequence === currentSequence + 1
    )

    const { currentExercise: newCurrentExercise, restTime } =
      configSelectedExercise(currentExercise)

    set((state) => {
      const { setNextExercise } = state
      setNextExercise(nextExercise?.exercise_series_id ?? '')
      return {
        currentExercise: newCurrentExercise,
        currentRestDuration: restTime,
        timeRest: restTime
      }
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

  setNextExercise: (nextExerciseId: UUID) => {
    const { currentWorkoutSession } = get()

    const { exercises_series } = currentWorkoutSession ?? {
      exercises_series: []
    }
    const nextExercise = exercises_series.find(
      (exercise) => exercise.exercise_series_id === nextExerciseId
    )
    if (!nextExercise) return

    exercises.getExerciseById(nextExerciseId).then((exercise) => {
      set({
        nextExercise: {
          ...exercise,
          ...nextExercise,
          currentSet: 0
        }
      })
    })
  },

  startTimer: async () => {
    let wakeLock: WakeLockSentinel | null = null
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen')
          console.log('Wake Lock acquired')
        } else {
          console.warn('Wake Lock API not supported in this browser.')
        }
      } catch (err: any) {
        console.error(
          `Failed to acquire Wake Lock: ${err.name}, ${err.message}`
        )
      }
    }
    const releaseWakeLock = () => {
      if (wakeLock !== null) {
        wakeLock.release()
        wakeLock = null
        console.log('Wake Lock released')
      }
    }

    requestWakeLock()

    const intervalId = setInterval(() => {
      set((state) => {
        const {
          isRest,
          timeRest,
          currentExercise,
          nextExercise,
          setCurrentExercise,
          addCurrentSet,
          resetCurrentExercise,
          showDialog
        } = state
        if (!isRest) {
          clearInterval(intervalId)
          releaseWakeLock()
          return { isRest: false }
        }

        if (timeRest <= 1) {
          playSound()
          clearInterval(intervalId)
          releaseWakeLock()

          if (currentExercise === null) return { isRest: false }
          const { title, currentSet, sets = 0 } = currentExercise
          if (title === '') return { isRest: false }

          const isLastSet = currentSet === sets - 1
          if (isLastSet) {
            if (nextExercise == null) resetCurrentExercise()
            else setCurrentExercise(nextExercise)
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
