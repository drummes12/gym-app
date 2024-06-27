import type { APIRoute } from 'astro'

import { EXERCISES_SERIES, GROUPED_EXERCISES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const matchingExercisesSerie = EXERCISES_SERIES.find(
    (exerciseSeries) => exerciseSeries.id === params.id
  )
  if (!matchingExercisesSerie) {
    return createResponse(
      {
        error: 'Exercises serie not found',
        filters: params
      },
      404
    )
  }

  const groupedExercises = GROUPED_EXERCISES.filter(
    (groupedExercise) => groupedExercise.series_id === matchingExercisesSerie.id
  )
  const exercisesSeries = {
    ...matchingExercisesSerie,
    exercises: groupedExercises
  }
  return createResponse(exercisesSeries)
}
