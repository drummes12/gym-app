import type { APIRoute } from 'astro'

import { EXERCISES, BODY_ZONES } from '@/data/gymPredefined'
import { createResponse, sanitizeString } from '@/lib/utils'
import type { Exercises } from '@/types/GymTracker'

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)

  const exerciseSearchParams: Partial<Record<keyof Exercises, string>> = {
    title: sanitizeString(params.get('title')),
    zone_id: params.get('zone_id') ?? undefined,
    variation: sanitizeString(params.get('variation'))
  }

  const filterByZone = sanitizeString(params.get('zone'))
  if (filterByZone) {
    const zone = BODY_ZONES.find((zone) =>
      sanitizeString(zone.name)?.includes(filterByZone)
    )
    if (zone) {
      exerciseSearchParams.zone_id = zone.id
    }
  }

  if (
    Object.values(exerciseSearchParams).every((value) => value == null) &&
    filterByZone == null
  ) {
    return createResponse(EXERCISES)
  }

  const filteredExercises = filterExercises(exerciseSearchParams)

  if (filteredExercises.length < 1) {
    return createResponse(
      {
        error: 'Exercises not found',
        filters: exerciseSearchParams
      },
      404
    )
  }

  const response = {
    exercises: filteredExercises,
    total: filteredExercises.length,
    filters: exerciseSearchParams
  }
  return createResponse(response)
}

function filterExercises(
  searchParams: Partial<Record<keyof Exercises, string>>
) {
  return EXERCISES.filter((exercise) =>
    Object.entries(searchParams).some(([key, value]) => {
      if (value == null) return false
      if (key.includes('id')) {
        return exercise[key as keyof Exercises] === value
      }
      return sanitizeString(exercise[key as keyof Exercises])?.includes(value)
    })
  )
}
