import { EXERCISES } from '@/data/gymPredefined'

export async function GET({ params }: { params: { id: string } }) {
  console.log('🚀 ~  params.id:', params.id)
  const matchingExercise = EXERCISES.find(
    (exercise) => exercise.id === params.id
  )
  if (!matchingExercise) {
    return new Response('Exercise not found', { status: 404 })
  }
  return new Response(JSON.stringify(matchingExercise), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
