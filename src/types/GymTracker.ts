export type UUID = string

export const MODE_SERIES = {
  SUPER_SETS: 'super_sets',
  ALTERNATING_SETS: 'alternating_sets'
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
  exercises_series: Array<ExerciseSeriesWorkout>
}

export interface WorkoutDays {
  id: UUID
  day: string
  title: string
  workout_sessions: {
    zone_id: UUID
    workout_session_id: UUID
  }[]
}

export type WorkoutDayResponse = WorkoutDays | { error?: string }

export interface ExercisesSeriesResponse extends ExercisesSeries {
  exercises: GroupedExercises[]
}

export interface ExerciseSeriesWorkout {
  exercise_series_id: UUID
  sequence: number
  type: 'individual' | 'series'
  additional_info?: string
}

export interface CurrentExercise extends Exercises {
  currentSet: number
}
