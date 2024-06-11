import { WORKOUT_SESSION } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export async function GET({ params }: { params: { id: string } }) {
  const matchingSession = WORKOUT_SESSION.find(
    (workout) => workout.id === params.id
  )
  if (!matchingSession) {
    return createResponse({ error: 'Session not found' }, 404)
  }
  return createResponse(matchingSession)
}
