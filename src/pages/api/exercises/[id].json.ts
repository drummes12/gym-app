import { EXERCISES } from '@/data/gymPredefined'

export async function GET({ params }: { params: { id: string } }) {
  const matchingSession = EXERCISES.find(
    (exercise) => exercise.id === params.id
  )
  if (!matchingSession) {
    return new Response('Exercise not found', { status: 404 })
  }
  return new Response(JSON.stringify(matchingSession), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
