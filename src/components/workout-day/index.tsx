import { useEffect } from 'react'
import { ZoneTitle } from '@/components/zone-title'

import type { UUID, WorkoutSession } from '@/types/GymTracker'
import { ExerciseCard } from '@/components/exercise-card'
import { useDataStore } from '@/store/dataStore'
import { useWorkoutSessionStore } from '@/store/workoutSessionStore'

export function WorkoutDay({ workoutDayId }: { workoutDayId: UUID }) {
  const { loading, setWorkoutDay, workoutSessions, currentWorkoutDay } =
    useDataStore()
  const { setWorkoutDay: setWorkoutSessionDay } = useWorkoutSessionStore()

  useEffect(() => {
    // Only load new day data, don't reset active session
    setWorkoutDay(workoutDayId)
  }, [workoutDayId, setWorkoutDay])

  // When currentWorkoutDay and sessions are loaded, update the workout session store
  useEffect(() => {
    if (currentWorkoutDay && workoutSessions) {
      const allDaySessions = currentWorkoutDay.workout_sessions
        .map((daySession) => workoutSessions.get(daySession.workout_id))
        .filter((session) => session !== undefined)
        .sort((a, b) => {
          const seqA =
            currentWorkoutDay.workout_sessions.find(
              (s) => s.workout_id === a!.id
            )?.sequence || 0
          const seqB =
            currentWorkoutDay.workout_sessions.find(
              (s) => s.workout_id === b!.id
            )?.sequence || 0
          return seqA - seqB
        }) as WorkoutSession[]

      if (allDaySessions.length > 0) {
        setWorkoutSessionDay(currentWorkoutDay, allDaySessions)
      }
    }
  }, [currentWorkoutDay, workoutSessions, setWorkoutSessionDay])

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
                      key={exercise.exercise_series_id + exercise.sequence}
                      workoutSessionId={workoutSession.id}
                      exerciseSerie={exercise}
                      sequence={exercise.sequence}
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
