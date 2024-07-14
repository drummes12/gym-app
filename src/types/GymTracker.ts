export type UUID = string

export const MODE_SERIES = {
  SUPER_SETS: 'super_sets',
  ALTERNATING_SETS: 'alternating_sets'
}

export interface BodyZones {
  id: UUID
  name: string
  abbreviation: string
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
  series_id: UUID
  exercise_id: UUID
  order: number
  repetitions?: number
  weight?: number
  weight_unit?: string
  additional_info?: string
}

export interface ExercisesSeries {
  id: UUID
  mode: string
  sets?: number
  rest_between_sets?: number
  rest_after_exercise?: number
}

export interface WorkoutSession {
  id: UUID
  zone_id: UUID
  sequence?: number
  exercises_series: Array<ExerciseSeriesWorkout>
}

export interface WorkoutDays {
  id: UUID
  title: string
  workout_sessions: {
    workout_id: UUID
    sequence?: number
  }[]
}

export type WorkoutDayResponse = WorkoutDays | { error?: string }

export interface ExercisesSeriesResponse extends ExercisesSeries {
  exercises: GroupedExercises[]
}

export interface ExerciseSeriesWorkout {
  exercise_series_id: UUID
  title?: string
  sequence: number
  type: 'individual' | 'series'
  variation?: string
  sets?: number
  repetitions?: number
  weight?: number
  weight_unit?: string
  rest_between_sets?: number
  rest_after_exercise?: number
  additional_info?: string
}

export interface CurrentExercise extends ExerciseSeriesWorkout {
  currentSet: number
}

export interface WorkoutSessionDay {
  id: UUID
  title: string
  workout_sessions: {
    zone_id: UUID
    workout_session_id: UUID
    exercises_series: Array<ExerciseSeriesWorkout>
  }[]
}
