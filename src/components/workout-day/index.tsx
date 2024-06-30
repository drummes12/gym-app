import { useEffect } from 'react'
import { ZoneTitle } from '@/components/zone-title'

import type { UUID } from '@/types/GymTracker'
import { ExerciseCard } from '@/components/exercise-card'
import { useWorkoutStore } from '@/store/workoutStore'

export function WorkoutDay({ workoutDayId }: { workoutDayId: UUID }) {
  const { setWorkoutDay, workoutSessions } = useWorkoutStore()

  useEffect(() => {
    setWorkoutDay(workoutDayId)
  }, [workoutDayId])

  return (
    <>
      {Array.isArray(workoutSessions) &&
        workoutSessions.map((workoutSession) => {
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
