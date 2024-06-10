import { WORKOUT_DAY } from '@/data/gymPredefined'

export async function GET({ params }: { params: { day: string } }) {
  const targetWorkout = WORKOUT_DAY.find(
    (workout) => workout.day === params.day
  )
  if (!targetWorkout) {
    return new Response('Day not found', { status: 404 })
  }
  return new Response(JSON.stringify(targetWorkout), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
