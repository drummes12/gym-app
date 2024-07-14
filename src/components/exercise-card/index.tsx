import { useEffect, useState } from 'react'
import { useWorkoutStore } from '@/store/workoutStore'
import type { ExerciseSeriesWorkout, UUID } from '@/types/GymTracker'

export function ExerciseCard({
  exerciseSerie,
  workoutSessionId
}: {
  exerciseSerie: ExerciseSeriesWorkout
  workoutSessionId: UUID
}) {
  const {
    isRest,
    workoutSessions,
    currentExercise,
    nextExercise,
    setCurrentExercise,
    setCurrentWorkoutSession
  } = useWorkoutStore((state) => state)

  const [isActive, setIsActive] = useState(false)
  const [isNext, setIsNext] = useState(false)

  const exercise = workoutSessions
    ?.find(({ id }) => id === workoutSessionId)
    ?.exercises_series.find(
      ({ exercise_series_id }) =>
        exercise_series_id === exerciseSerie.exercise_series_id
    )

  const handleClick = () => {
    if (exercise == null) return
    setCurrentWorkoutSession(workoutSessionId)

    if (currentExercise === null) {
      setCurrentExercise({ ...exercise, currentSet: 0 })
      return
    }

    const { currentSet, sets = 0 } = currentExercise
    if (isRest || (currentSet !== 0 && currentSet <= sets)) return

    setCurrentExercise({ ...exercise, currentSet: 0 })
  }

  useEffect(() => {
    setIsActive(
      currentExercise?.exercise_series_id === exerciseSerie.exercise_series_id
    )

    const { sets = 0, currentSet } = currentExercise ?? {}

    const isLastSet = currentSet === sets - 1
    if (isLastSet) {
      setIsNext(
        nextExercise?.exercise_series_id === exerciseSerie.exercise_series_id
      )
    }
  }, [currentExercise, nextExercise])

  if (exercise == null) return null
  const {
    title,
    variation,
    sets,
    repetitions,
    weight,
    weight_unit: weightUnit,
    additional_info: additionalInfo
  } = exercise

  return (
    <li
      className={`link-card ${isActive ? 'current-exercise' : ''} ${
        isNext ? 'next-exercise' : ''
      }`}
    >
      <button className='w-full' onClick={handleClick}>
        <header className='flex gap-2 items-center justify-between'>
          <h3 className='text-l text-left mr-1 font-semibold text-xl'>
            {title}
          </h3>
          {variation && (
            <h4 className='text-r text-right font-medium opacity-70'>
              {variation}
            </h4>
          )}
        </header>

        <div className='flex gap-2 items-center justify-between text-sm'>
          <p className='text-l'>
            {sets && `${sets}x`}
            {repetitions}
          </p>
          <span className='text-r opacity-90'>
            {weight && `${weight} ${weightUnit}`}
          </span>
        </div>
        {additionalInfo && (
          <p className='text-l text-left text-xs opacity-90'>
            {additionalInfo}
          </p>
        )}
      </button>
    </li>
  )
}
