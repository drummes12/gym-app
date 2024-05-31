import { useWorkoutStore } from '@/store/workoutStore'
import type { Workout } from '@/types/Training'

export function WorkoutCard(workout: Workout) {
  const { title, variation, sets, reps, weight, weightUnit, additionalInfo } = workout
  const { isRest, currentExercise, setCurrentExercise } = useWorkoutStore((state) => state)

  const handleClick = () => {
    if (currentExercise === null) {
      setCurrentExercise({ ...workout, currentSet: 0 })
      return
    }

    const { currentSet, sets = 0 } = currentExercise
    if (isRest || (currentSet !== 0 && currentSet <= sets)) return

    setCurrentExercise({ ...workout, currentSet: 0 })
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
