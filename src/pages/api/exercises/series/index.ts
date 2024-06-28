import type { APIRoute } from 'astro'

import { EXERCISES_SERIES, GROUPED_EXERCISES } from '@/data/gymPredefined'
import { createResponse, sanitizeString } from '@/lib/utils'
import type { ExercisesSeries } from '@/types/GymTracker'

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)

  const exerciseSeriesSearchParams: Partial<
    Record<keyof ExercisesSeries, string>
  > = {
    mode: sanitizeString(params.get('mode')) ?? undefined
  }

  if (
    Object.values(exerciseSeriesSearchParams).every((value) => value == null)
  ) {
    return createResponse(EXERCISES_SERIES)
  }

  const filteredExercisesSeries = filterExercisesSeries(
    exerciseSeriesSearchParams
  )

  if (filteredExercisesSeries.length < 1) {
    return createResponse(
      {
        error: 'Exercises series not found',
        filters: exerciseSeriesSearchParams
      },
      404
    )
  }

  const exercisesSeries = filteredExercisesSeries.map((exerciseSeries) => {
    const groupedExercises = GROUPED_EXERCISES.filter(
      (groupedExercise) => groupedExercise.series_id === exerciseSeries.id
    )
    return {
      ...exerciseSeries,
      exercises: groupedExercises
    }
  })

  const response = {
    exercisesSeries,
    total: filteredExercisesSeries.length,
    filters: exerciseSeriesSearchParams
  }
  return createResponse(response)
}

function filterExercisesSeries(
  searchParams: Partial<Record<keyof ExercisesSeries, string>>
) {
  return EXERCISES_SERIES.filter((exerciseSeries) =>
    Object.entries(searchParams).some(([key, value]) => {
      if (value == null) return false
      if (key.includes('id')) {
        return exerciseSeries[key as keyof ExercisesSeries] === value
      }
      return sanitizeString(
        exerciseSeries[key as keyof ExercisesSeries]
      )?.includes(value)
    })
  )
}
