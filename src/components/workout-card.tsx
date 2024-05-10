import { TRAINING } from '@/data/training'
import { useWorkoutStore } from '@/store/workoutStore'
import type { Workouts } from '@/types/Training'

const REST = 60
const BREAK = 90

export function WorkoutCard({
  title,
  variation,
  sets,
  reps,
  weight,
  weightUnit,
  additionalInfo,
  rest,
  breakRest,
}: Workouts) {
  const { isRest, currentExercise, setCurrentExercise } = useWorkoutStore((state) => state)

  const handleClick = () => {
    const { currentSet, totalSets } = currentExercise
    if (isRest || (currentSet !== 0 && currentSet <= totalSets)) return

    const flattenedWorkouts = TRAINING.flatMap(training => 
      training.workouts.flatMap(workout => 
        Array.isArray(workout) ? workout.slice(0, 1) : [workout]
      )
    )
    const nextWorkoutIndex = flattenedWorkouts.findIndex(workout => workout.title === title) + 1
    
    setCurrentExercise({
      title,
      currentSet: 0,
      totalSets: sets ?? 1,
      nextWorkout: flattenedWorkouts[nextWorkoutIndex]?.title ?? 'Terminaste 🦾',
      breakRest: breakRest ?? BREAK,
      rest: rest ?? REST,
    })
  }

  return (
    <li className='link-card'>
      <button className='w-full' onClick={handleClick}>
        <header className='flex gap-2 items-center justify-between'>
          <h3 className='text-left mr-1 font-semibold text-xl'>{title}</h3>
          {variation && <h4 className='text-right font-medium opacity-70'>{variation}</h4>}
        </header>

        <div className='flex gap-2 items-center justify-between text-sm'>
          <p>
            {sets && `${sets}x`}
            {reps}
          </p>
          <span className='opacity-90'>
            {weight}
            {weightUnit}
          </span>
        </div>
        {additionalInfo && <p className='text-left text-xs opacity-90'>{additionalInfo}</p>}
      </button>
    </li>
  )
}
