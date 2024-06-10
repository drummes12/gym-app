import { EXERCISES } from '@/data/gymPredefined'
import type { Exercises } from '@/types/GymTracker'

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)

  const filters: Partial<Record<keyof Exercises, string>> = {
    title: sanitizeString(params.get('title')),
    zone_id: sanitizeString(params.get('zone_id')),
    variation: sanitizeString(params.get('variation'))
  }

  const filteredExercises = EXERCISES.filter((exercise) =>
    Object.entries(filters).some(
      ([key, value]) =>
        value != null &&
        sanitizeString(exercise[key as keyof Exercises])?.includes(value)
    )
  )

  if (filteredExercises.length < 1) {
    return new Response(JSON.stringify(EXERCISES), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new Response(JSON.stringify(filteredExercises), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function sanitizeString(str: any | null) {
  if (typeof str !== 'string') return str ?? undefined
  return (
    str
      .toString()
      .replaceAll(/[^a-zA-Z0-9]/g, '')
      .toLowerCase() ?? undefined
  )
}
