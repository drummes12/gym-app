import type { Exercises, ExercisesSeriesResponse } from '@/types/GymTracker'
import { fetchJson } from '.'

export function getExercises(): Promise<Exercises[]> {
  return fetchJson('/api/exercises')
}

export function getExerciseById(exerciseId: string): Promise<Exercises> {
  return fetchJson(`/api/exercises/${exerciseId}`)
}

export function getExerciseSeries(): Promise<ExercisesSeriesResponse[]> {
  return fetchJson('/api/exercises/series')
}

export function getExerciseSeriesById(
  seriesId: string
): Promise<ExercisesSeriesResponse> {
  return fetchJson(`/api/exercises/series/${seriesId}`)
}
