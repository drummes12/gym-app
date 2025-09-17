import { useEffect, useState } from 'react'
import { useTimerStore } from '@/store/timerStore'
import { useDataStore } from '@/store/dataStore'
import { useWorkoutSessionStore } from '@/store/workoutSessionStore'
import type { ExerciseSeriesWorkout, UUID } from '@/types/GymTracker'

export function ExerciseCard({
  exerciseSerie,
  workoutSessionId
}: {
  exerciseSerie: ExerciseSeriesWorkout
  workoutSessionId: UUID
}) {
  const { isRest } = useTimerStore()
  const { workoutSessions } = useDataStore()
  const { 
    currentExercise, 
    setCurrentWorkoutSession, 
    setCurrentExercise,
    currentExerciseIndex,
    currentWorkoutSession
  } = useWorkoutSessionStore()

  const [isActive, setIsActive] = useState(false)
  const [isNext, setIsNext] = useState(false)

  const exercise = workoutSessions?.get(workoutSessionId)
    ?.exercises_series.find(
      (ex) => ex.exercise_series_id === exerciseSerie.exercise_series_id
    )

  const handleClick = () => {
    if (exercise == null) return
    
    // Set the workout session if it's different
    if (currentWorkoutSession?.id !== workoutSessionId) {
      const workoutSession = workoutSessions?.get(workoutSessionId)
      if (workoutSession) {
        setCurrentWorkoutSession(workoutSession)
      }
    }

    // Find the exercise index in the current workout session
    const exerciseIndex = currentWorkoutSession?.exercises_series.findIndex(
      (ex) => ex.exercise_series_id === exerciseSerie.exercise_series_id
    ) ?? -1

    if (exerciseIndex >= 0) {
      setCurrentExercise(exerciseIndex)
    }
  }

  useEffect(() => {
    setIsActive(
      currentExercise?.exercise.exercise_series_id === exerciseSerie.exercise_series_id
    )

    const totalSets = currentExercise?.exercise.sets || currentExercise?.completedSets?.length || 0
    const currentSet = currentExercise?.currentSet || 0

    const isLastSet = currentSet === totalSets - 1
    if (isLastSet) {
      // Check if this is the next exercise in the sequence
      const nextExerciseIndex = currentExerciseIndex + 1
      const nextExercise = currentWorkoutSession?.exercises_series[nextExerciseIndex]
      setIsNext(
        nextExercise?.exercise_series_id === exerciseSerie.exercise_series_id
      )
    }
  }, [currentExercise, currentExerciseIndex, currentWorkoutSession])

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
