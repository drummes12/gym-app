import type { Training } from '@/types/Training'

export const TRAINING: Training[] = [
  {
    day: 'monday',
    zone: 'Pectoral',
    break: 90,
    workouts: [
      {
        title: 'Press de banca',
        variation: 'Unilateral',
        sets: 4,
        reps: 12,
        weight: 15,
        weightUnit: 'k/mancuerna',
        rest: 10,
      },
      [
        {
          title: 'Press de banca inclinado',
          variation: 'Barra',
          sets: 4,
          reps: 12,
          weight: 15,
          weightUnit: 'k/lado',
        },
        {
          title: 'Press de banca inclinado',
          variation: 'Mancuerna',
          sets: 4,
          reps: 12,
          weight: 20,
          weightUnit: 'k',
        },
      ],
      [
        {
          title: 'Press de banca declinado',
          variation: 'Barra',
          sets: 4,
          reps: 15,
          weight: 15,
          weightUnit: 'k/lado',
        },
        {
          title: 'Press de banca declinado',
          variation: 'Pullover',
          sets: 4,
          reps: 15,
          weight: 20,
          weightUnit: 'k',
        },
      ],
      [
        {
          title: 'Pec Deck (P&D)',
          reps: 20,
          weight: 4,
          weightUnit: ' discos',
        },
        {
          title: 'Pec Deck (P&D)',
          reps: 15,
          weight: 6,
          weightUnit: ' discos',
        },
        {
          title: 'Pec Deck (P&D)',
          reps: 12,
          weight: 8,
          weightUnit: ' discos',
        },
        {
          title: 'Pec Deck (P&D)',
          reps: 8,
          weight: 10,
          weightUnit: ' discos',
        },
      ],
      {
        title: 'Flexiones de pecho',
        additionalInfo: 'Al fallo',
      },
    ],
  },
  {
    day: 'monday',
    zone: 'Biceps',
    workouts: [
      {
        title: 'Curl de bíceps',
        variation: 'Barra',
        sets: 4,
        reps: 24,
        weight: 5,
        weightUnit: 'k',
      },
      {
        title: 'Curl predicador con polea',
        variation: 'Unilateral',
        sets: 4,
        reps: 12,
        weight: 25,
        weightUnit: 'k',
      },
      {
        title: 'Curl predicador libre',
        sets: 4,
        reps: 15,
        weight: 10,
        weightUnit: 'k',
      },
      {
        title: 'Curl de bíceps',
        variation: 'Barra romana | 10 + 10 + 10',
        sets: 4,
        reps: 30,
        weight: 10,
        weightUnit: 'k',
      },
    ],
  },
  {
    day: 'tuesday',
    zone: 'Cuádriceps',
    workouts: [
      {
        title: 'Jaca de piernas',
        sets: 4,
        reps: 12,
        weight: 45,
        weightUnit: 'lb/lado',
      },
      {
        title: 'Prensa de piernas',
        variation: 'Unilateral',
        sets: 4,
        reps: 12,
        weight: 45,
        weightUnit: 'k',
      },
      {
        title: 'Sentadilla libre',
        sets: 4,
        reps: 15,
        weight: 45,
        weightUnit: 'lb/lado',
      },
      {
        title: 'Caminata',
        weight: 25,
        weightUnit: 'k/recorrido',
      },
      {
        title: 'Pantorrilla',
        additionalInfo: 'Al fallo',
      },
    ],
  },
  {
    day: 'wednesday',
    zone: 'Espalda',
    workouts: [
      {
        title: 'Jalón al pecho',
        sets: 4,
        reps: 12,
        weight: 8,
        weightUnit: ' discos',
        additionalInfo: 'Recorrido corto',
      },
      {
        title: 'Jalón al pecho cerrado',
        sets: 4,
        reps: 15,
        weight: 7,
        weightUnit: ' discos',
      },
      {
        title: 'Remo con polea',
        sets: 4,
        reps: 12,
        weight: 110,
        weightUnit: 'lb',
      },
      [
        {
          title: 'Dominadas',
          variation: 'Abiertas',
          sets: 4,
          reps: 8,
        },
        {
          title: 'Dominadas',
          variation: 'Neutras',
          sets: 4,
          reps: 8,
        },
      ],
    ],
  },
  {
    day: 'wednesday',
    zone: 'Triceps',
    workouts: [
      [
        {
          title: 'Extensión de tríceps con polea',
          variation: '10 + 10 + 10',
          sets: 4,
          reps: 30,
          weight: 4,
          weightUnit: ' discos',
        },
        {
          title: 'Extensión de tríceps con polea',
          variation: 'Invertido',
          sets: 4,
          reps: 10,
          weight: 4,
          weightUnit: ' discos',
        }
      ],
      {
        title: 'Fondos',
        sets: 4,
        reps: 15,
        weight: 15,
        weightUnit: 'k',
      },
      {
        title: 'Copa de tríceps',
        sets: 4,
        reps: 15,
        weight: 20,
        weightUnit: 'k',
      }
    ],
  },
  {
    day: 'thursday',
    zone: 'Femoral | Glúteos',
    workouts: [
      [
        {
          title: 'Curl femoral',
          variation: 'Tumbado',
          sets: 4,
          reps: 15,
          weight: 55,
          weightUnit: 'k',
        },
        {
          title: 'Peso muerto',
          variation: 'Sumo',
          sets: 4,
          reps: 12,
          weight: 80,
          weightUnit: 'k',
        }
      ],
      [
        {
          title: 'Sentadilla Sumo Libre',
          sets: 4,
          reps: 12,
          weight: 45,
          weightUnit: 'lb/lado',
        },
        {
          title: 'Caminata',
          variation: 'Unilateral',
          weight: 10,
          weightUnit: ' pasos',
        }
      ],
      {
        title: 'Hip thrust',
        variation: '10 - 10 - 10',
        sets: 4,
        reps: 30,
        weight: 25,
        weightUnit: 'lb/disco',
      },
      {
        title: 'Prensa abierta',
        sets: 4,
        reps: 12,
        weight: 45*3,
        weightUnit: 'lb/lado',
      },
      {
        title: 'Caminata',
        variation: 'Unilateral con banda de glúteos',
        sets: 4,
        reps: 15,
      },
    ],
  },
  {
    day: 'friday',
    zone: 'Hombro',
    workouts: [
      [
        {
          title: 'Elevaciones frontales',
          variation: 'Unilateral',
          sets: 4,
          reps: 10,
          weight: 10,
          weightUnit: 'lb/mancuerna',
        },
        {
          title: 'Elevaciones frontales',
          variation: 'Disco',
          sets: 4,
          reps: 10,
          weight: 10,
          weightUnit: 'k',
        },
        {
          title: 'Elevaciones laterales',
          sets: 4,
          reps: 10,
          weight: 10,
          weightUnit: 'lb/mancuerna',
        },
        {
          title: 'Press militar con barra',
          sets: 4,
          reps: 10,
        }
      ],
      {
        title: 'Elevación frontal con polea',
        sets: 4,
        reps: 12,
        weight: 5,
        weightUnit: ' discos',
      },
      {
        title: 'Battle rope',
        sets: 4,
        weight: 1,
        weightUnit: ' minuto',
      }
    ]
  }
]
