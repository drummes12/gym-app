import type { APIRoute } from 'astro'

import { WORKOUT_SESSION } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const matchingSession = WORKOUT_SESSION.find(
    (workout) => workout.id === params.id
  )
  if (!matchingSession) {
    return createResponse({ error: 'Session not found' }, 404)
  }
  return createResponse(matchingSession)
}
