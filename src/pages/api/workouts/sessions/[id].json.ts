import { WORKOUT_SESSION } from '@/data/gymPredefined'

export async function GET({ params }: { params: { id: string } }) {
  const matchingSession = WORKOUT_SESSION.find(
    (workout) => workout.id === params.id
  )
  if (!matchingSession) {
    return new Response('Session not found', { status: 404 })
  }
  return new Response(JSON.stringify(matchingSession), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
