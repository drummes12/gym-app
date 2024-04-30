export interface DayInfo {
  color: string;
  es: string;
  en: string;
}

export type Days = Record<string, DayInfo> 

export type DaysWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
