import {
  MODE_SERIES,
  type BodyZones,
  type Exercises,
  type ExercisesSeries,
  type GroupedExercises,
  type WorkoutDays,
  type WorkoutSession
} from '@/types/GymTracker'

export const BODY_ZONES: BodyZones[] = [
  {
    id: '352969cd-1884-48cb-9b41-b1193a70346c',
    name: 'pectoral',
    abbreviation: 'PEC'
  },
  {
    id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    name: 'dorsal',
    abbreviation: 'ESP'
  },
  {
    id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    name: 'hombro',
    abbreviation: 'HOM'
  },
  {
    id: 'd6265f7c-1441-4610-8def-ad7399874462',
    name: 'biceps',
    abbreviation: 'BIC'
  },
  {
    id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    name: 'triceps',
    abbreviation: 'TRI'
  },
  {
    id: '8c7dc157-9aed-480c-a00a-f02871101076',
    name: 'brazos',
    abbreviation: 'BRA'
  },
  {
    id: '96cbae65-0445-4101-aca9-40ffc3dd5228',
    name: 'antebrazo',
    abbreviation: 'ANT'
  },
  {
    id: '928013b2-83c0-4e85-aa99-66c1269d147b',
    name: 'abdomen',
    abbreviation: 'ABS'
  },
  {
    id: 'b9b9e475-0186-4614-8b36-336116252154',
    name: 'cuadriceps',
    abbreviation: 'QUAD'
  },
  {
    id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    name: 'isquiotibiales',
    abbreviation: 'HAM'
  },
  {
    id: '991f4b95-bb3e-4e02-9bd0-4f478623bd4a',
    name: 'gluteos',
    abbreviation: 'GLUT'
  },
  {
    id: 'de88ff54-8fe8-4258-85ea-62fa7a1c2509',
    name: 'pantorrilla',
    abbreviation: 'CALF'
  },
  {
    id: 'b2189ca6-b529-4e92-81ce-eb2e5183519b',
    name: 'pierna',
    abbreviation: 'LEG'
  },
  {
    id: '2e497bc9-7c22-421b-96a4-5913ad3981b7',
    name: 'cardio',
    abbreviation: 'CARD'
  },
  {
    id: '566e3ea7-e232-469d-9fab-ed26a6b492d9',
    name: 'calentamiento',
    abbreviation: 'WARM'
  },
  {
    id: 'b32308b5-67a5-4138-9933-2dd981b22e84',
    name: 'estiramiento',
    abbreviation: 'STRETCH'
  }
]

export const EXERCISES: Exercises[] = [
  {
    id: 'd8ac623e-c8de-479d-b2be-0b8183bc4eed',
    title: 'Press de banca',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/DB',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '5d704aac-90f6-4a8d-a9be-7f5915a5eb77',
    title: 'Press de banca',
    variation: 'Plano',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 12,
    weight: 45,
    weight_unit: 'lb/lado',
    rest_between_sets: 5,
    rest_after_exercise: 10
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
    rest_between_sets: 5,
    rest_after_exercise: 10
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
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '06a5f310-5b40-4e2a-a51f-b839a316fd04',
    title: 'Cruces en polea',
    variation: 'Alto',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 12,
    weight: 60,
    weight_unit: 'lb/lado',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
    title: 'Pec Deck (P&D)',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    sets: 4,
    repetitions: 20,
    weight: 4,
    weight_unit: 'discos',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '1e8d3353-f51e-49d6-8e02-d1ac1684a7e2',
    title: 'Push Ups',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    additional_info: 'Hasta el fallo',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '90b4caac-99a2-4f2d-834a-87123fb8ac16',
    title: 'Curl de bíceps',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 24,
    weight: 5,
    weight_unit: 'kg/lado',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'aa7793dc-786e-497c-8658-dbcd9e5fef32',
    title: 'Curl de bíceps',
    variation: 'Inclinado',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    sets: 4,
    repetitions: 24,
    weight: 5,
    weight_unit: 'kg/lado',
    rest_between_sets: 5,
    rest_after_exercise: 10
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
    rest_between_sets: 5,
    rest_after_exercise: 10
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
    rest_between_sets: 5,
    rest_after_exercise: 10
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
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '750b8ed2-ea32-47eb-aa9d-323913bbc89b',
    title: 'Hack Squads',
    sets: 4,
    repetitions: 12,
    weight: 45,
    weight_unit: 'lb/lado',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '7e402a8a-7c64-4f8a-b571-65f31a0f715a',
    title: 'Prensa de piernas',
    sets: 4,
    repetitions: 12,
    weight: 60,
    weight_unit: 'kg/lado',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '887717b9-2d3b-4637-81e0-fe0016237e4b',
    title: 'Sentadilla',
    variation: 'Libre',
    sets: 4,
    repetitions: 15,
    weight: 45,
    weight_unit: 'lb/lado',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '18b0ceb2-fa68-4158-9b22-22decd88dfc4',
    title: 'Caminata',
    weight: 25,
    weight_unit: 'kg/lap',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '3e210507-7858-42dc-b70f-c00e03bfe029',
    title: 'Elevación de talones',
    sets: 4,
    repetitions: 15,
    weight: 100,
    weight_unit: 'kg',
    zone_id: 'de88ff54-8fe8-4258-85ea-62fa7a1c2509',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '965eb539-4541-4d4a-bbd6-d07f90b5bb29',
    title: 'Peso muerto',
    sets: 4,
    repetitions: 12,
    weight: 45,
    weight_unit: 'lb/lado',
    zone_id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '132f4203-ee31-4ab4-abec-f096af2767fe',
    title: 'Bulgarian Split Squat',
    sets: 4,
    repetitions: 12,
    weight: 25,
    weight_unit: 'kg/lado',
    zone_id: '991f4b95-bb3e-4e02-9bd0-4f478623bd4a',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '04d83c22-05f9-46b6-9b89-f168f3082823',
    title: 'Hip Thrusts',
    sets: 4,
    repetitions: 12,
    weight: 25,
    weight_unit: 'kg/lado',
    zone_id: '991f4b95-bb3e-4e02-9bd0-4f478623bd4a',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'e5bd8e97-21b8-4426-94e3-b968b4af5077',
    title: 'Extensión de cuádriceps',
    sets: 4,
    repetitions: 12,
    weight: 70,
    weight_unit: 'lb',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'e6689f5b-9947-44cd-8b84-801a48e19c8b',
    title: 'Curl de pierna',
    variation: 'Tumbado',
    sets: 4,
    repetitions: 12,
    zone_id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '5d423e50-cf0b-4ef0-b542-a1e1496f5583',
    title: 'Curl de pierna',
    variation: 'Sentado',
    sets: 4,
    repetitions: 12,
    zone_id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'bb10ff3c-2681-46a1-b92f-9014c2a9da4f',
    title: 'Good Morning',
    sets: 4,
    repetitions: 15,
    zone_id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'c02e8827-6bdc-4102-86d9-4d7f4512b53c',
    title: 'Pull Ups',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    additional_info: 'Hasta el fallo',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '55fd93b1-4b8c-48be-af83-c4850734f76a',
    title: 'Jalón al pecho',
    sets: 4,
    repetitions: 12,
    weight: 70,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'bdca9fec-86be-45dd-a089-cfdb3b909dc1',
    title: 'Remo',
    variation: 'Polea',
    sets: 4,
    repetitions: 12,
    weight: 70,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '39dee112-e05b-4f3a-9012-386e75e8a6e4',
    title: 'Remo',
    variation: 'Polea Alta',
    sets: 4,
    repetitions: 12,
    weight: 70,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '962774a5-d6c6-440d-9675-fb90ff66de66',
    title: 'Remo',
    variation: 'Barra T',
    sets: 4,
    repetitions: 12,
    weight: 80,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '17d5a147-150c-4008-b8ea-6ac3d282c5ad',
    title: 'Hiperextensiones',
    sets: 4,
    repetitions: 12,
    weight: 20,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '8f7f4942-192a-4711-b322-52a560557626',
    title: 'Lat Push Down',
    sets: 4,
    repetitions: 12,
    weight: 40,
    weight_unit: 'lb',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '4900f0f6-6d98-43e2-8107-497149b50b49',
    title: 'Press Militar',
    sets: 4,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/lado',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '920f81e7-f209-4397-ba3c-90592e063046',
    title: 'Face Pull',
    sets: 4,
    repetitions: 12,
    weight: 80,
    weight_unit: 'lb',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '0c4d79fa-d0f0-4890-bd87-88f9d3f757e8',
    title: 'Elevaciones',
    variation: 'Posteriores',
    sets: 4,
    repetitions: 12,
    weight: 7.5,
    weight_unit: 'kg/lado',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '353f7d3d-c31a-43ba-b118-e0f5ec312735',
    title: 'Elevaciones',
    variation: 'Frontales',
    sets: 4,
    repetitions: 12,
    weight: 7.5,
    weight_unit: 'kg/lado',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '557b1d89-5b7e-450b-9998-42587d027732',
    title: 'Elevaciones',
    variation: 'Laterales',
    sets: 4,
    repetitions: 12,
    weight: 7.5,
    weight_unit: 'kg/lado',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '13d6b396-03af-43a9-a10e-e76d36536608',
    title: 'Encogimiento de hombros',
    sets: 4,
    repetitions: 12,
    weight: 70,
    weight_unit: 'lb/lado',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'f4b76388-4d95-4aa5-9e93-df9b9ce7f021',
    title: 'Curl de biceps',
    sets: 4,
    repetitions: 12,
    weight: 10,
    weight_unit: 'kg/lado',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '14b2fd9b-4f3f-4b8d-b64b-7c77b20b5eec',
    title: 'Curl predicador',
    sets: 4,
    repetitions: 12,
    weight: 15,
    weight_unit: 'lb/lado',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '0578bbef-c43e-464e-90c5-5b1552e4c42d',
    title: 'Press cerrado',
    sets: 4,
    repetitions: 12,
    weight: 20,
    weight_unit: 'kg/lado',
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'b210c555-db2b-46d3-94f0-c4c176eabd5c',
    title: 'Extensión de tríceps',
    sets: 4,
    repetitions: 12,
    weight: 100,
    weight_unit: 'lb',
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: '16101591-ab70-47ab-97ee-90c4e337119d',
    title: 'Extensión de tríceps',
    variation: 'Trasnuca',
    sets: 4,
    repetitions: 12,
    weight: 100,
    weight_unit: 'lb',
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    rest_between_sets: 5,
    rest_after_exercise: 10
  },
  {
    id: 'ee96f631-660a-4701-be63-53210b904638',
    title: 'Dips',
    variation: 'Banco',
    sets: 4,
    repetitions: 12,
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    rest_between_sets: 5,
    rest_after_exercise: 10
  }
]

export const EXERCISES_SERIES: ExercisesSeries[] = [
  {
    id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    mode: MODE_SERIES.SUPER_SETS,
    sets: 4
  },
  {
    id: '341cae74-3554-4e49-985a-26fb91244dfe',
    mode: MODE_SERIES.SUPER_SETS,
    sets: 4
  },
  {
    id: '6eec856e-f45b-4596-bf89-b8311ccb5cd3',
    mode: MODE_SERIES.ALTERNATING_SETS
  }
]

export const GROUPED_EXERCISES: GroupedExercises[] = [
  {
    id: '256d50e3-42cf-412e-8546-5b6a5e2b2228',
    series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    exercise_id: '557b1d89-5b7e-450b-9998-42587d027732',
    order: 1,
    repetitions: 12,
    weight: 15,
    weight_unit: 'kg/lado',
    additional_info: 'Barra'
  },
  {
    id: 'f055bad6-4165-4dcf-85ea-aadf40be0fe1',
    series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    exercise_id: '557b1d89-5b7e-450b-9998-42587d027732',
    order: 2,
    repetitions: 8,
    weight: 20,
    weight_unit: 'kg',
    additional_info: 'DB'
  },
  {
    id: 'f055bad6-4165-4dcf-85ea-aadf40be0fe1',
    series_id: 'ac198865-f463-481e-8e73-f09f7ab20eef',
    exercise_id: '557b1d89-5b7e-450b-9998-42587d027732',
    order: 3,
    repetitions: 6,
    weight: 7.5,
    weight_unit: 'kg/lado'
  }
]

export const WORKOUT_SESSION: WorkoutSession[] = [
  {
    id: '6dedd101-67fc-41c7-9802-d9dfa790cf10',
    zone_id: '352969cd-1884-48cb-9b41-b1193a70346c',
    exercises_series: [
      {
        exercise_series_id: 'b8160d71-5b5b-45a3-a2b3-477e4fcb45be',
        sequence: 1,
        type: 'individual',
        weight: 20,
        weight_unit: 'kg/lado',
        additional_info: 'DB',
        sets: 4,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '5d704aac-90f6-4a8d-a9be-7f5915a5eb77',
        sequence: 2,
        type: 'individual',
        weight: 20,
        weight_unit: 'kg/lado',
        additional_info: 'DB',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: 'ed99bc6a-d9c8-4ace-8e0c-faeb68509e0c',
        sequence: 3,
        type: 'individual',
        weight: 10,
        weight_unit: 'discos',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: 'ee96f631-660a-4701-be63-53210b904638',
        sequence: 4,
        type: 'individual',
        sets: 4,
        additional_info: 'Hasta el fallo',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '0f76717c-d143-4826-a6c6-0909a4f00e3c',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    exercises_series: [
      {
        exercise_series_id: '557b1d89-5b7e-450b-9998-42587d027732',
        sequence: 1,
        type: 'individual',
        weight: 7.5,
        weight_unit: 'kg/lado',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '920f81e7-f209-4397-ba3c-90592e063046',
        sequence: 2,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '44354255-0bad-4f7c-a7b8-44267c73cef9',
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    exercises_series: [
      {
        exercise_series_id: 'b210c555-db2b-46d3-94f0-c4c176eabd5c',
        sequence: 1,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '16101591-ab70-47ab-97ee-90c4e337119d',
        variation: 'Trasnuca con barra',
        sequence: 2,
        type: 'individual',
        weight: 60,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '0168d8f2-c662-4fac-827c-b2cdce81dbba',
    zone_id: '61d657de-23f6-41e5-a83c-bb50508f8c5c',
    exercises_series: [
      {
        exercise_series_id: 'bdca9fec-86be-45dd-a089-cfdb3b909dc1',
        variation: 'Agarre abierto',
        sequence: 1,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '39dee112-e05b-4f3a-9012-386e75e8a6e4',
        sequence: 2,
        type: 'individual',
        weight: 40,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        additional_info: 'Unilateral',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '55fd93b1-4b8c-48be-af83-c4850734f76a',
        variation: 'Barra',
        sequence: 3,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        additional_info: 'Agarre abierto',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '17d5a147-150c-4008-b8ea-6ac3d282c5ad',
        sequence: 4,
        type: 'individual',
        weight: 20,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 8,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: 'ab78a10d-8a8b-4368-912c-faa58d253a1a',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    exercises_series: [
      {
        exercise_series_id: '90b4caac-99a2-4f2d-834a-87123fb8ac16',
        variation: 'Barra Z',
        sequence: 1,
        type: 'individual',
        weight: 20,
        weight_unit: 'kg',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: 'aa7793dc-786e-497c-8658-dbcd9e5fef32',
        variation: 'Inclinado',
        sequence: 2,
        type: 'individual',
        weight: 20,
        weight_unit: 'kg',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '3c05f312-df60-4f16-808b-74439b85a115',
        sequence: 3,
        type: 'individual',
        weight: 20,
        weight_unit: 'kg',
        sets: 3,
        repetitions: 10,
        additional_info: '2seg apretar',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '028584d9-7ccb-46cd-b765-a3ae2959bc6c',
    zone_id: 'b9b9e475-0186-4614-8b36-336116252154',
    exercises_series: [
      {
        exercise_series_id: 'e5bd8e97-21b8-4426-94e3-b968b4af5077',
        sequence: 1,
        type: 'individual',
        weight: 60,
        weight_unit: 'lb',
        sets: 4,
        repetitions: 15,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '887717b9-2d3b-4637-81e0-fe0016237e4b',
        sequence: 2,
        type: 'individual',
        weight: 100,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '750b8ed2-ea32-47eb-aa9d-323913bbc89b',
        sequence: 3,
        type: 'individual',
        weight: 50,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '71a3d5c6-b067-4fe4-aeff-e06602d21698',
    zone_id: '991f4b95-bb3e-4e02-9bd0-4f478623bd4a',
    exercises_series: [
      {
        exercise_series_id: '04d83c22-05f9-46b6-9b89-f168f3082823',
        sequence: 1,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        additional_info: '3 segundos arriba',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '4f802d5a-741a-456d-bf75-3425956be21d',
    zone_id: 'de88ff54-8fe8-4258-85ea-62fa7a1c2509',
    exercises_series: [
      {
        exercise_series_id: '3e210507-7858-42dc-b70f-c00e03bfe029',
        sequence: 1,
        type: 'individual',
        weight: 100,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: 'd22c551a-a266-4fd8-b826-b71c35451472',
    zone_id: 'a5701339-2a28-481e-a8aa-fddf63bebb9c',
    exercises_series: [
      {
        exercise_series_id: '4900f0f6-6d98-43e2-8107-497149b50b49',
        sequence: 1,
        type: 'individual',
        weight: 15,
        weight_unit: 'kg/lado',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '557b1d89-5b7e-450b-9998-42587d027732',
        sequence: 2,
        type: 'individual',
        weight: 7.5,
        weight_unit: 'kg/lado',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '920f81e7-f209-4397-ba3c-90592e063046',
        sequence: 3,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: '4b6a0109-8f5d-4d81-b477-2da9446c7f70',
    zone_id: 'fa99c362-7dc5-4d43-8af5-ba17baddacc9',
    exercises_series: [
      {
        exercise_series_id: 'b210c555-db2b-46d3-94f0-c4c176eabd5c',
        sequence: 1,
        type: 'individual',
        variation: 'Barra Z',
        weight: 40,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        additional_info: 'Semi inclinado',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: 'ee96f631-660a-4701-be63-53210b904638',
        sequence: 2,
        type: 'individual',
        variation: 'Agarre cerrado',
        sets: 4,
        additional_info: 'Hasta el fallo',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: 'c6e3abf7-2deb-4bbd-8ccf-ea092bfc3ab4',
    zone_id: 'd6265f7c-1441-4610-8def-ad7399874462',
    exercises_series: [
      {
        exercise_series_id: '90b4caac-99a2-4f2d-834a-87123fb8ac16',
        sequence: 1,
        type: 'individual',
        variation: 'Barra Z',
        weight: 10,
        weight_unit: 'kg/lado',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: 'a16298b5-a283-4a51-9565-411e1544ec0f',
    zone_id: '12ca92b1-943f-42f3-a06a-3b5af0176d8b',
    exercises_series: [
      {
        exercise_series_id: '750b8ed2-ea32-47eb-aa9d-323913bbc89b',
        sequence: 1,
        type: 'individual',
        weight: 50,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '5d423e50-cf0b-4ef0-b542-a1e1496f5583',
        sequence: 2,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        additional_info: 'Rest pause - 10/8',
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: 'e6689f5b-9947-44cd-8b84-801a48e19c8b',
        sequence: 3,
        type: 'individual',
        weight: 80,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      },
      {
        exercise_series_id: '965eb539-4541-4d4a-bbd6-d07f90b5bb29',
        sequence: 4,
        type: 'individual',
        weight: 100,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 10,
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  },
  {
    id: 'ce18a81e-1751-4f01-af8f-0eaef0f32942',
    zone_id: 'de88ff54-8fe8-4258-85ea-62fa7a1c2509',
    exercises_series: [
      {
        exercise_series_id: '3e210507-7858-42dc-b70f-c00e03bfe029',
        sequence: 1,
        type: 'individual',
        weight: 100,
        weight_unit: 'lb',
        sets: 3,
        repetitions: 12,
        additional_info: 'Rest pause - 12/8/6',
        rest_between_sets: 120,
        rest_after_exercise: 120
      }
    ]
  }
]

export const WORKOUT_DAY: WorkoutDays[] = [
  {
    id: 'f4e9b3d7-1b1f-4d9b-8f5d-8d4b5f3d8f4d',
    title: 'Dia 1',
    workout_sessions: [
      {
        workout_id: '6dedd101-67fc-41c7-9802-d9dfa790cf10',
        sequence: 1
      },
      {
        workout_id: '0f76717c-d143-4826-a6c6-0909a4f00e3c',
        sequence: 2
      },
      {
        workout_id: '44354255-0bad-4f7c-a7b8-44267c73cef9',
        sequence: 3
      }
    ]
  },
  {
    id: '430d6f9a-9c09-485e-a2fc-b40d90e2e3fd',
    title: 'Dia 2',
    workout_sessions: [
      {
        workout_id: '0168d8f2-c662-4fac-827c-b2cdce81dbba',
        sequence: 1
      },
      {
        workout_id: 'ab78a10d-8a8b-4368-912c-faa58d253a1a',
        sequence: 2
      }
    ]
  },
  {
    id: '710eb93c-7714-4414-a6a5-fcf0e5f70cc6',
    title: 'Dia 3',
    workout_sessions: [
      {
        workout_id: '028584d9-7ccb-46cd-b765-a3ae2959bc6c',
        sequence: 1
      },
      {
        workout_id: '71a3d5c6-b067-4fe4-aeff-e06602d21698',
        sequence: 2
      },
      {
        workout_id: '4f802d5a-741a-456d-bf75-3425956be21d',
        sequence: 3
      }
    ]
  },
  {
    id: '4abc996e-4242-47d6-b712-9f0f752eca15',
    title: 'Dia 4',
    workout_sessions: [
      {
        workout_id: 'd22c551a-a266-4fd8-b826-b71c35451472',
        sequence: 1
      },
      {
        workout_id: '4b6a0109-8f5d-4d81-b477-2da9446c7f70',
        sequence: 2
      },
      {
        workout_id: 'c6e3abf7-2deb-4bbd-8ccf-ea092bfc3ab4',
        sequence: 3
      }
    ]
  },
  {
    id: '4b5c7867-078b-4b0e-adaf-34e3e7a632ce',
    title: 'Dia 3 | Alternativa',
    workout_sessions: [
      {
        workout_id: 'a16298b5-a283-4a51-9565-411e1544ec0f',
        sequence: 1
      },
      {
        workout_id: 'ce18a81e-1751-4f01-af8f-0eaef0f32942',
        sequence: 2
      }
    ]
  }
]
