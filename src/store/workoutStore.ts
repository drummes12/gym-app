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
import { workouts, zones } from '@/services'
import { playSound } from '@/services/audioNotification'

let wakeLock: WakeLockSentinel | null = null
const requestWakeLock = async () => {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen')
    } else {
      console.warn('Wake Lock API not supported in this browser.')
    }
  } catch (err: any) {
    console.error(`Failed to acquire Wake Lock: ${err.name}, ${err.message}`)
  }
}
const releaseWakeLock = () => {
  if (wakeLock !== null) {
    wakeLock.release()
    wakeLock = null
  }
}

export interface WorkoutStoreState {
  loading: boolean

  isRest: boolean
  timeRest: number
  controlTime: number
  intervalIdControlTime: number | null
  dialogElement: HTMLDialogElement | null
  dialogConfetti: ReturnType<typeof confetti.create> | null

  bodyZones: BodyZones[] | null
  workoutDay: WorkoutDays | null
  workoutSessions: WorkoutSession[] | null
  currentWorkoutSession: WorkoutSession | null

  currentExercise: CurrentExercise | null
  currentRestDuration: number

  nextWorkoutSession: WorkoutSession | null
  nextExercise: CurrentExercise | null

  resetSession: () => void
  setIsRest: (isRest: boolean) => void

  getBodyZone: (bodyZoneId: UUID) => Promise<BodyZones | undefined>
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
  setDialogConfetti: (
    dialogConfetti: ReturnType<typeof confetti.create>
  ) => void
  showDialog: () => void
  hideDialog: () => void
  startControlTime: () => number
}

export const useWorkoutStore = create<WorkoutStoreState>((set, get) => ({
  loading: true,

  isRest: false,
  timeRest: 0,
  controlTime: 0,
  intervalIdControlTime: null,
  dialogElement: null,
  dialogConfetti: null,

  bodyZones: null,
  workoutDay: null,
  workoutSessions: null,
  currentWorkoutSession: null,

  currentExercise: null,
  currentRestDuration: 0,

  nextExercise: null,
  nextWorkoutSession: null,

  resetSession: () => {
    set({
      loading: false,
      isRest: false,
      timeRest: 0,
      controlTime: 0,
      intervalIdControlTime: null,
      currentWorkoutSession: null,
      currentExercise: null,
      currentRestDuration: 0,
      nextExercise: null,
      nextWorkoutSession: null
    })
  },

  setIsRest: (isRest: boolean) => set({ isRest }),

  getBodyZone: async (bodyZoneId: UUID) => {
    const { bodyZones } = get()
    set({ loading: true })
    let newBodyZones = bodyZones
    if (bodyZones === null) {
      await zones.getZones().then((zones) => {
        set({ bodyZones: zones })
        newBodyZones = zones
      })
    }
    set({ loading: false })

    return newBodyZones?.find((zone) => zone.id === bodyZoneId)
  },
  setWorkoutDay: (workoutDayId: UUID) => {
    set({ loading: true })
    workouts
      .getWorkoutDayById(workoutDayId)
      .then((workoutDay) => {
        set({ workoutSessions: null })
        const { workout_sessions } = workoutDay
        if (workout_sessions.length === 0) return
        workout_sessions.forEach((workout) => {
          workouts
            .getWorkoutSessionById(workout.workout_id)
            .then((workoutSession) => {
              set((state) => {
                const { workoutSessions } = state
                return {
                  workoutDay,
                  workoutSessions: workoutSessions
                    ? [...workoutSessions, { ...workout, ...workoutSession }]
                    : [{ ...workout, ...workoutSession }]
                }
              })
            })
        })
      })
      .finally(() => set({ loading: false }))
  },
  setCurrentWorkoutSession: (workoutSessionId: UUID) => {
    const { workoutSessions } = get()
    const currentWorkoutSession = workoutSessions?.find(
      (session) => session.id === workoutSessionId
    )
    const nextSequence = currentWorkoutSession?.sequence
    if (nextSequence !== undefined) {
      const nextWorkoutSession = workoutSessions?.find(
        (session) => session.sequence === nextSequence + 1
      )
      if (nextWorkoutSession) set({ nextWorkoutSession })
    }
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

    set({ nextExercise: { ...nextExercise, currentSet: 0 } })
  },

  startTimer: async () => {
    requestWakeLock()

    const intervalId = setInterval(() => {
      set((state) => {
        const {
          isRest,
          timeRest,
          currentExercise,
          nextExercise,
          nextWorkoutSession,
          resetSession,
          setCurrentExercise,
          addCurrentSet,
          setCurrentWorkoutSession,
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
            if (nextExercise == null) {
              if (nextWorkoutSession == null) {
                showDialog()
                resetSession()
                return { isRest: false }
              }
              setCurrentWorkoutSession(nextWorkoutSession?.id ?? '')
              if (nextWorkoutSession?.exercises_series[0] !== undefined) {
                setCurrentExercise({
                  ...nextWorkoutSession?.exercises_series[0],
                  currentSet: 0
                })
              }
            } else setCurrentExercise(nextExercise)
          } else {
            addCurrentSet()
          }
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
  setDialogConfetti: (dialogConfetti: ReturnType<typeof confetti.create>) =>
    set({ dialogConfetti }),
  showDialog: () => {
    const { dialogElement, dialogConfetti, startControlTime } = get()
    dialogElement?.showModal()
    dialogConfetti &&
      dialogConfetti({
        particleCount: 100,
        spread: 70
      })
    startControlTime()
  },
  hideDialog: () => {
    const { dialogElement, intervalIdControlTime } = get()
    dialogElement?.close()
    if (typeof intervalIdControlTime === 'number') {
      releaseWakeLock()
      clearInterval(intervalIdControlTime)
      set({ intervalIdControlTime: null, controlTime: 0 })
    }
  },
  startControlTime: () => {
    requestWakeLock()
    const intervalIdControlTime = setInterval(() => {
      set((state) => {
        const { controlTime } = state
        return { controlTime: controlTime + 1 }
      })
    }, 1000)
    set({ intervalIdControlTime })
    return intervalIdControlTime
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
