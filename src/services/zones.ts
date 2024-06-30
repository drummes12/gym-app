import type { BodyZones } from '@/types/GymTracker'
import { fetchJson } from '.'

export function getZones(): Promise<BodyZones[]> {
  return fetchJson('/api/zones')
}

export function getZoneById(zoneId: string): Promise<BodyZones> {
  return fetchJson(`/api/zones/${zoneId}`)
}
