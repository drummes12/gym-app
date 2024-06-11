import {
  MODE_SERIES,
  type BodyZones,
  type Exercises,
  type ExercisesSeries,
  type GroupedExercises,
  type WorkoutDay,
  type WorkoutSession
} from '@/types/GymTracker'

export const BODY_ZONES: BodyZones[] = [
  { id: '352969cd-1884-48cb-9b41-b1193a70346c', name: 'pectoral' },
  { id: '61d657de-23f6-41e5-a83c-bb50508f8c5c', name: 'dorsal' },
  { id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c', name: 'hombro' },
  { id: 'd6265f7c-1441-4610-8def-ad7399874462', name: 'biceps' },
  { id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9', name: 'triceps' },
  { id: '96cbae65-0445-4101-aca9-40ffc3dd5228', name: 'antebrazo' },
  { id: '928013b2-83c0-4e85-aa99-66c1269d147b', name: 'abdomen' },
  { id: 'b9b9e475-0186-4614-8b36-336116252154', name: 'cuadriceps' },
  { id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b', name: 'isquiotibiales' },
  { id: '991f4b95-bb3e-4e02-9bd0-4f478623bd4a', name: 'gluteos' },
  { id: 'de88ff54-8fe8-4258-85ea-62fa7a1c2509', name: 'gemelos' },
  { id: '2e497bc9-7c22-421b-96a4-5913ad3981b7', name: 'cardio' },
  { id: '566e3ea7-e232-469d-9fab-ed26a6b492d9', name: 'calentamiento' },
  { id: 'b32308b5-67a5-4138-9933-2dd981b22e84', name: 'estiramiento' }
]

export const EXERCISES: Exercises[] = [
  {
    id: 'd8ac623e-c8de-479d-b2be-0b8183bc4eed',
    title: 'Press de banca',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/mancuerna',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: 'b8160d71-5b5b-45a3-a2b3-477e4fcb45be',
    title: 'Press de banca',
    variation: 'Inclinado',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/lado',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: '718c2a81-5f70-4589-b5f3-dc7fd860f4a5',
    title: 'Press de banca',
    variation: 'Declinado',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 15,
    weight: 15,
    weight_unit: 'kg/lado',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    title: 'Pec Deck (P&D)',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 20,
    weight: 4,
    weight_unit: 'discos',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: '1e8d3353-f51e-49d6-8e02-d1ac1684a7e2',
    title: 'Flexiones de pecho',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    additional_info: 'Hasta el fallo'
  },
  {
    id: '90b4caac-99a2-4f2d-834a-87123fb8ac16',
    title: 'Curl de bíceps',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 24,
    weight: 5,
    weight_unit: 'kg/lado',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: 'e83e7df5-0c78-4ecb-9042-1ad3043a6061',
    title: 'Curl de bíceps',
    variation: 'Barra Romana',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 30,
    weight: 10,
    weight_unit: 'kg',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: 'bff2ccb0-f85f-47e6-b1b4-e481c509b7e9',
    title: 'Curl predicador',
    variation: 'Con polea',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 12,
    weight: 25,
    weight_unit: 'kg',
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: '3c05f312-df60-4f16-808b-74439b85a115',
    title: 'Curl predicador',
    variation: 'Libre',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 15,
    weight: 10,
    weight_unit: 'kg',
    rest_between_sets: 60,
    rest_after_exercise: 120
  }
]

export const EXERCISES_SERIES: ExercisesSeries[] = [
  {
    id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    mode: MODE_SERIES.SUPER_SETS,
    sets: 4,
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: '341cae74-3554-4e49-985a-26fb91244dfe',
    mode: MODE_SERIES.SUPER_SETS,
    sets: 4,
    rest_between_sets: 60,
    rest_after_exercise: 120
  },
  {
    id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    mode: MODE_SERIES.ALTERNATING_SETS,
    rest_between_sets: 60,
    rest_after_exercise: 120
  }
]

export const GROUPED_EXERCISES: GroupedExercises[] = [
  {
    id: '256d50e3-42cf-412e-8546-5b6a5e2b2228',
    series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    exercise_id: 'b8160d71-5b5b-45a3-a2b3-477e4fcb45be',
    order: 1,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/lado',
    additional_info: 'Barra'
  },
  {
    id: 'f055bad6-4165-4dcf-85ea-aadf40be0fe1',
    series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    exercise_id: 'b8160d71-5b5b-45a3-a2b3-477e4fcb45be',
    order: 2,
    repetitions: 12,
    weight: 20,
    weight_unit: 'kg',
    additional_info: 'Mancuerna'
  },
  {
    id: '1be67dac-b029-40dc-bb0d-d294dd54f48a',
    series_id: '341cae74-3554-4e49-985a-26fb91244dfe',
    exercise_id: '718c2a81-5f70-4589-b5f3-dc7fd860f4a5',
    order: 1,
    repetitions: 15,
    weight: 15,
    weight_unit: 'kg/lado',
    additional_info: 'Barra'
  },
  {
    id: '1be67dac-b029-40dc-bb0d-d294dd54f48a',
    series_id: '341cae74-3554-4e49-985a-26fb91244dfe',
    exercise_id: '718c2a81-5f70-4589-b5f3-dc7fd860f4a5',
    order: 1,
    repetitions: 15,
    weight: 20,
    weight_unit: 'kg',
    additional_info: 'Pullovers'
  },
  {
    id: '1cb6b996-b553-4541-b0c7-f7f11d63f9a3',
    series_id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    exercise_id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    order: 1,
    repetitions: 20,
    weight: 4,
    weight_unit: 'discos'
  },
  {
    id: '8c82ccdb-fe6a-41b1-bb09-aaa8aad7ce8f',
    series_id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    exercise_id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    order: 2,
    repetitions: 15,
    weight: 6,
    weight_unit: 'discos'
  },
  {
    id: '71702dcd-2ead-4092-b211-8bface5ed92b',
    series_id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    exercise_id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    order: 3,
    repetitions: 10,
    weight: 8,
    weight_unit: 'discos'
  },
  {
    id: 'f2f6ed0e-6e9a-41c3-9b97-3a55be035369',
    series_id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    exercise_id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    order: 4,
    repetitions: 8,
    weight: 10,
    weight_unit: 'discos'
  }
]

export const WORKOUT_SESSION: WorkoutSession[] = [
  {
    id: 'ee29b3da-c078-4f3a-8e68-c32a09cd0271',
    exercises_series: [
      {
        exercise_series_id: 'd8ac623e-c8de-479d-b2be-0b8183bc4eed',
        type: 'individual',
        additional_info: 'Unilateral'
      },
      {
        exercise_series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
        type: 'series'
      },
      {
        exercise_series_id: '341cae74-3554-4e49-985a-26fb91244dfe',
        type: 'series'
      },
      {
        exercise_series_id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
        type: 'series'
      },
      {
        exercise_series_id: '1e8d3353-f51e-49d6-8e02-d1ac1684a7e2',
        type: 'individual'
      }
    ]
  },
  {
    id: '7aeb0448-a9e2-4586-a847-cbd12c3d8d7d',
    exercises_series: [
      {
        exercise_series_id: '90b4caac-99a2-4f2d-834a-87123fb8ac16',
        additional_info: 'Barra',
        type: 'individual'
      },
      {
        exercise_series_id: 'bff2ccb0-f85f-47e6-b1b4-e481c509b7e9',
        additional_info: 'Unilateral',
        type: 'individual'
      },
      {
        exercise_series_id: '3c05f312-df60-4f16-808b-74439b85a115',
        type: 'individual'
      },
      {
        exercise_series_id: 'e83e7df5-0c78-4ecb-9042-1ad3043a6061',
        additional_info: '10 + 10 + 10',
        type: 'individual'
      }
    ]
  }
]

export const WORKOUT_DAY: WorkoutDay[] = [
  {
    id: 'f4e9b3d7-1b1f-4d9b-8f5d-8d4b5f3d8f4d',
    day: 'day1',
    zone_ids: [
      '352969cd-1884-48cb-9b41-b1193a70346c',
      'd6265f7c-1441-4610-8def-ad7399874462'
    ],
    workout_session_ids: [
      'ee29b3da-c078-4f3a-8e68-c32a09cd0271',
      '7aeb0448-a9e2-4586-a847-cbd12c3d8d7d'
    ]
  }
]
