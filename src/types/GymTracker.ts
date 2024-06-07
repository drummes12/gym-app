export type UUID = string

export const MODE_SERIES = {
  SUPER_SETS: 'super_sets',
  ALTERNATING_SETS: 'aternating_sets'
}

export interface BodyZones {
  id: UUID
  name: string
}

export interface Exercises {
  id: UUID
  title: string
  variation?: string
  zone_id: UUID
  sets?: number
  repetitions?: number
  weight?: number
  weight_unit?: string
  rest_between_sets?: number
  rest_after_exercise?: number
  additional_info?: string
}

export interface GroupedExercises {
  id: UUID
  exercise_id: UUID
  order: number
  repetitions?: number
  weight?: number
  weight_unit?: string
  additional_info?: string
}

export interface ExercisesSeries {
  id: UUID
  grouped_exercises_id: UUID
  mode: string
  sets?: number
  rest_between_sets?: number
  rest_after_exercise?: number
}

export interface WorkoutSession {
  id: UUID
  exercises_series: Array<{
    exercise_series_id: UUID
    additional_info?: string
  }>
}

export interface WorkoutDay {
  id: UUID
  day: string
  zone_ids: UUID[]
  workout_session_ids: UUID[]
}
