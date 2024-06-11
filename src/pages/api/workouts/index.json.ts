import { WORKOUT_DAY } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export async function GET() {
  return createResponse(WORKOUT_DAY)
}
