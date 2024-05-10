import type { DaysWeek } from "@/types/Days";

export interface Workouts {
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

export interface CurrentExercise {
  title: string
  currentSet: number
  totalSets: number
  nextWorkout: string
  breakRest: number
  rest: number
}

export interface Training {
  day: DaysWeek
  zone: string;
  workouts: Array<Workouts | Workouts[]>;
}