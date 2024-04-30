import type { DaysWeek } from "@/types/Days";

export interface Workouts {
  title: string;
  variation?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  weightUnit?: string;
  additionalInfo?: string;
}

export interface Training {
  day: DaysWeek
  zone: string;
  workouts: Array<Workouts | Workouts[]>;
}