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
}

export interface CurrentExcercise {
  title: string;
  currentSet: number;
  totalSets: number;
  nextWorkout: string;
}

export interface Training {
  day: DaysWeek
  zone: string;
  break?: number;
  workouts: Array<Workouts | Workouts[]>;
}