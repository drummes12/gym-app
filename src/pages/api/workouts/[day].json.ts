import { WORKOUT_DAY } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export async function GET({ params }: { params: { day: string } }) {
  const targetWorkout = WORKOUT_DAY.find(
    (workout) => workout.day === params.day
  )
  if (!targetWorkout) {
    return createResponse({ error: 'Day not found' }, 404)
  }
  return createResponse(targetWorkout)
}
