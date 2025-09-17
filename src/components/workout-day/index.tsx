import { useEffect } from 'react'
import { ZoneTitle } from '@/components/zone-title'

import type { UUID } from '@/types/GymTracker'
import { ExerciseCard } from '@/components/exercise-card'
import { useDataStore } from '@/store/dataStore'
import { useWorkoutSessionStore } from '@/store/workoutSessionStore'

export function WorkoutDay({ workoutDayId }: { workoutDayId: UUID }) {
  const { loading, setWorkoutDay, workoutSessions, currentWorkoutDay } =
    useDataStore()
  const { currentExercise } = useWorkoutSessionStore()

  useEffect(() => {
    // Only load new day data, don't reset active session
    setWorkoutDay(workoutDayId)
  }, [workoutDayId, setWorkoutDay])

  // Show message if user has active session but is viewing different day
  const hasActiveSession = currentExercise !== null

  // Filter and sort workout sessions to show only those belonging to current day
  const workoutSessionsArray =
    workoutSessions && currentWorkoutDay
      ? currentWorkoutDay.workout_sessions
          .map((daySession) => ({
            session: workoutSessions.get(daySession.workout_id),
            sequence: daySession.sequence
          }))
          .filter((item) => item.session !== undefined)
          .sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
          .map((item) => item.session!)
      : []

  return (
    <>
      {hasActiveSession && (
        <div className='absolute top-4 right-0 bg-green-500/20 border border-green-400/50 rounded-lg px-3 py-1 mb-4 text-green-100'>
          <p className='text-sm text-green-400'>
            &bull; Tienes una sesión activa
          </p>
        </div>
      )}
      {loading.workoutSessions && <div className='loader mx-auto mt-20'></div>}
      {!loading.workoutSessions &&
        workoutSessionsArray.length > 0 &&
        workoutSessionsArray.map((workoutSession) => {
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
