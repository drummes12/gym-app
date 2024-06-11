import { EXERCISES } from '@/data/gymPredefined'
import { createResponse } from '@/lib/utils'

export async function GET({ params }: { params: { id: string } }) {
  const matchingExercise = EXERCISES.find(
    (exercise) => exercise.id === params.id
  )
  if (!matchingExercise) {
    return createResponse({ error: 'Exercise not found' }, 404)
  }
  return createResponse(matchingExercise)
}
