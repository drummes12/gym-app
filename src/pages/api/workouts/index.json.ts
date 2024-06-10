import { WORKOUT_DAY } from '@/data/gymPredefined'

export async function GET() {
  return new Response(JSON.stringify(WORKOUT_DAY), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
