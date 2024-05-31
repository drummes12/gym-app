import type { DaysWeek } from "@/types/Days";

export interface Workout {
  title: string;
  variation?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  weightUnit?: string;
  additionalInfo?: string;
  rest?: number;
  breakRest?: number;
}

export interface CurrentExercise extends Workout {
  currentSet: number
}

export interface Training {
  day: DaysWeek
  zone: string;
  workouts: Array<Workout | Workout[]>;
}