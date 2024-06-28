import type { APIRoute } from 'astro'

import { WORKOUT_DAY } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const targetWorkout = WORKOUT_DAY.find((workout) => workout.id === params.id)
  if (!targetWorkout) {
    return createResponse({ error: 'Day not found' }, 404)
  }
  return createResponse(targetWorkout)
}
