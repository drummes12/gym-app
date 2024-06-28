import type { APIRoute } from 'astro'

import { EXERCISES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const matchingExercise = EXERCISES.find(
    (exercise) => exercise.id === params.id
  )
  if (!matchingExercise) {
    return createResponse({ error: 'Exercise not found' }, 404)
  }
  return createResponse(matchingExercise)
}
