import type { APIRoute } from 'astro'

import { WORKOUT_SESSION } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async () => {
  return createResponse(WORKOUT_SESSION)
}
