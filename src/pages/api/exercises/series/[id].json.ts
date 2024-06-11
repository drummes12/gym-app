import { EXERCISES_SERIES, GROUPED_EXERCISES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export async function GET({ params }: { params: { id: string } }) {
  const matchingExercisesSerie = EXERCISES_SERIES.find(
    (exerciseSeries) => exerciseSeries.id === params.id
  )
  if (!matchingExercisesSerie) {
    return createResponse(
      {
        error: 'No exercises serie found',
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
