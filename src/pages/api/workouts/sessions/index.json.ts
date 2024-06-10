import { WORKOUT_SESSION } from '@/data/gymPredefined'

export async function GET() {
  return new Response(JSON.stringify(WORKOUT_SESSION), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
