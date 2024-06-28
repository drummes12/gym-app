import type { APIRoute } from 'astro'

import { BODY_ZONES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async ({ params }) => {
  const targetWorkout = BODY_ZONES.find((bodyZone) => bodyZone.id === params.id)
  if (!targetWorkout) {
    return createResponse({ error: 'Body Zone not found' }, 404)
  }
  return createResponse(targetWorkout)
}
