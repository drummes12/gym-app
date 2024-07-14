import type { WorkoutDays, WorkoutSession } from '@/types/GymTracker'
import { fetchJson } from '.'

export function getWorkoutsDay(): Promise<WorkoutDays[]> {
  return fetchJson('/api/workouts')
}

export function getWorkoutDayById(workoutId: string): Promise<WorkoutDays> {
  return fetchJson(`/api/workouts/${workoutId}`)
}

export function getWorkoutSessions(): Promise<WorkoutSession[]> {
  return fetchJson('/api/workouts/sessions')
}

export function getWorkoutSessionById(
  sessionId: string
): Promise<WorkoutSession> {
  return fetchJson(`/api/workouts/sessions/${sessionId}/exercises`)
}
