import type { APIRoute } from 'astro'

import { BODY_ZONES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export const GET: APIRoute = async () => {
  return createResponse(BODY_ZONES)
}
