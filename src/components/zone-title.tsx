import { useEffect, useState } from 'react'
import type { BodyZones } from '@/types/GymTracker'
import { fetchJson } from '@/services'
import { useDataStore } from '@/store/dataStore'

export function ZoneTitle({ zone_id }: { zone_id: string }) {
  const { bodyZones, getBodyZones, getBodyZone } = useDataStore()
  const [zone, setZone] = useState<BodyZones | undefined>()

  useEffect(() => {
    // Check if zone is already in cache
    const cachedZone = bodyZones?.get(zone_id)
    if (cachedZone) {
      setZone(cachedZone)
      return
    }

    // Try to get the specific zone first
    getBodyZone(zone_id)
      .then((loadedZone) => {
        if (loadedZone) {
          setZone(loadedZone)
        }
      })
      .catch((error: unknown) => console.error(error))
  }, [zone_id, bodyZones, getBodyZone])

  if (!zone) return null

  return (
    <h1 className='sticky top-0 text-6xl sm:text-8xl text-right text-black/20 dark:text-white/30 font-synemono font-bold !leading-[0.72] tracking-tighter'>
      {zone.abbreviation.toUpperCase()}
    </h1>
  )
}
