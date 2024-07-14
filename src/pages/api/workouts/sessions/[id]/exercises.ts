import type { APIRoute } from 'astro'

import { WORKOUT_SESSION, EXERCISES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const matchingSession = WORKOUT_SESSION.find(
    (workout) => workout.id === params.id
  )
  if (!matchingSession) {
    return createResponse({ error: 'Session not found' }, 404)
  }

  const exercises = []
  for (const exercises_series of matchingSession.exercises_series) {
    const exercise = EXERCISES.find(
      ({ id }) => id === exercises_series.exercise_series_id
    )
    if (!exercise) {
      return createResponse({ error: 'Exercise not found' }, 404)
    }

    exercises.push({
      ...exercise,
      ...exercises_series,
      id: undefined
    })
  }

  return createResponse({ ...matchingSession, exercises_series: exercises })
}
