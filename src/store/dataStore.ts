import { create } from 'zustand'

import type {
  BodyZones,
  UUID,
  WorkoutDays,
  WorkoutSession
} from '@/types/GymTracker'
import { workouts, zones } from '@/services'

interface DataStoreState {
  // Loading states
  loading: {
    zones: boolean
    workoutDay: boolean
    workoutSessions: boolean
  }

  // Data cache
  bodyZones: Map<UUID, BodyZones>
  workoutDays: Map<UUID, WorkoutDays>
  workoutSessions: Map<UUID, WorkoutSession>

  // Current selections
  currentWorkoutDayId: UUID | null
  currentWorkoutDay: WorkoutDays | null

  // Actions
  getBodyZone: (bodyZoneId: UUID) => Promise<BodyZones | undefined>
  getBodyZones: () => Promise<BodyZones[]>
  
  setWorkoutDay: (workoutDayId: UUID) => Promise<void>
  getWorkoutSession: (sessionId: UUID) => Promise<WorkoutSession | undefined>
  
  // Cache management
  clearCache: () => void
  preloadData: () => Promise<void>
}

export const useDataStore = create<DataStoreState>((set, get) => ({
    // Initial state
    loading: {
      zones: false,
      workoutDay: false,
      workoutSessions: false
    },

    bodyZones: new Map(),
    workoutDays: new Map(),
    workoutSessions: new Map(),

    currentWorkoutDayId: null,
    currentWorkoutDay: null,

    // Actions
    getBodyZone: async (bodyZoneId: UUID) => {
      const { bodyZones } = get()
      
      // Check cache first
      if (bodyZones.has(bodyZoneId)) {
        return bodyZones.get(bodyZoneId)
      }

      // Load all zones if not cached
      await get().getBodyZones()
      return bodyZones.get(bodyZoneId)
    },

    getBodyZones: async () => {
      const { bodyZones, loading } = get()
      
      if (loading.zones) return Array.from(bodyZones.values())
      
      set((state) => ({
        loading: { ...state.loading, zones: true }
      }))

      try {
        const zonesData = await zones.getZones()
        const zonesMap = new Map(zonesData.map(zone => [zone.id, zone]))
        
        set((state) => ({
          bodyZones: zonesMap,
          loading: { ...state.loading, zones: false }
        }))
        
        return zonesData
      } catch (error) {
        console.error('Error loading zones:', error)
        set((state) => ({
          loading: { ...state.loading, zones: false }
        }))
        return []
      }
    },

    setWorkoutDay: async (workoutDayId: UUID) => {
      const { workoutDays, loading } = get()
      
      set((state) => ({
        currentWorkoutDayId: workoutDayId,
        loading: { ...state.loading, workoutDay: true }
      }))

      try {
        // Check cache first
        let workoutDay = workoutDays.get(workoutDayId)
        
        if (!workoutDay) {
          workoutDay = await workouts.getWorkoutDayById(workoutDayId)
          set((state) => ({
            workoutDays: new Map(state.workoutDays).set(workoutDayId, workoutDay!)
          }))
        }

        // Load all workout sessions for this day
        await Promise.all(
          workoutDay.workout_sessions.map(session => 
            get().getWorkoutSession(session.workout_id)
          )
        )

        set((state) => ({
          currentWorkoutDay: workoutDay!,
          loading: { ...state.loading, workoutDay: false }
        }))
      } catch (error) {
        console.error('Error loading workout day:', error)
        set((state) => ({
          loading: { ...state.loading, workoutDay: false }
        }))
      }
    },

    getWorkoutSession: async (sessionId: UUID) => {
      const { workoutSessions } = get()
      
      // Check cache first
      if (workoutSessions.has(sessionId)) {
        return workoutSessions.get(sessionId)
      }

      try {
        const session = await workouts.getWorkoutSessionById(sessionId)
        set((state) => ({
          workoutSessions: new Map(state.workoutSessions).set(sessionId, session)
        }))
        return session
      } catch (error) {
        console.error('Error loading workout session:', error)
        return undefined
      }
    },

    clearCache: () => {
      set({
        bodyZones: new Map(),
        workoutDays: new Map(),
        workoutSessions: new Map(),
        currentWorkoutDayId: null,
        currentWorkoutDay: null
      })
    },

    preloadData: async () => {
      // Preload commonly used data
      await get().getBodyZones()
    }
  }))