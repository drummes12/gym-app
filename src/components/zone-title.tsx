import { useEffect, useState } from 'react'
import type { BodyZones } from '@/types/GymTracker'
import { fetchJson } from '@/services'
import { useWorkoutStore } from '@/store/workoutStore'

export function ZoneTitle({ zone_id }: { zone_id: string }) {
  const { getBodyZone } = useWorkoutStore()
  const [zone, setZone] = useState<BodyZones | undefined>()

  useEffect(() => {
    getBodyZone(zone_id)
      .then((zoneTitle) => setZone(zoneTitle))
      .catch((error) => console.error(error))
  }, [])

  if (!zone) return null

  return (
    <h1 className='sticky top-0 text-6xl sm:text-8xl text-right text-black/20 dark:text-white/30 font-synemono font-bold !leading-[0.72] tracking-tighter'>
      {zone.abbreviation.toUpperCase()}
    </h1>
  )
}
