import { useEffect } from 'react'
import { ZoneTitle } from '@/components/zone-title'

import type { UUID } from '@/types/GymTracker'
import { ExerciseCard } from '@/components/exercise-card'
import { useDataStore } from '@/store/dataStore'

export function WorkoutDay({ workoutDayId }: { workoutDayId: UUID }) {
  const { loading, setWorkoutDay, workoutSessions } = useDataStore()

  useEffect(() => {
    setWorkoutDay(workoutDayId)
  }, [workoutDayId, setWorkoutDay])

  // Convert Map to Array and sort
  const workoutSessionsArray = workoutSessions ? Array.from(workoutSessions.values()) : []

  return (
    <>
      {loading.workoutSessions && <div className='loader mx-auto mt-20'></div>}
      {!loading.workoutSessions &&
        workoutSessionsArray.length > 0 &&
        workoutSessionsArray
          .sort((a, b) => {
            if (a.sequence != null && b.sequence != null) {
              return a.sequence - b.sequence
            }
            return 0
          })
          .map((workoutSession) => {
            return (
              <section key={workoutSession.id} className='pb-2'>
                <ZoneTitle zone_id={workoutSession.zone_id} />
                <ul className='flex flex-col gap-1 [&>div]:flex [&>div]:gap-1 [&>div]:flex-col'>
                  {workoutSession.exercises_series.map((exercise) => {
                    return (
                      <ExerciseCard
                        key={exercise.exercise_series_id}
                        workoutSessionId={workoutSession.id}
                        exerciseSerie={exercise}
                      />
                    )
                  })}
                </ul>
              </section>
            )
          })}
    </>
  )
}
