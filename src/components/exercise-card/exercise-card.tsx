import type { Exercises } from "@/types/GymTracker"

import styles from './exercise-card.module.css'
import { useWorkoutStore } from "@/store/workoutStore"

export function ExerciseCard({ exercise }: { exercise: Exercises }) {
  const { title, variation, sets, repetitions, weight, weight_unit: weightUnit, additional_info: additionalInfo } = exercise

  const { isRest, currentExercise, setCurrentExercise } = useWorkoutStore((state) => state)

  const handleClick = () => {
    if (currentExercise === null) {
      setCurrentExercise({ ...exercise, currentSet: 0 })
      return
    }

    const { currentSet, sets = 0 } = currentExercise
    if (isRest || (currentSet !== 0 && currentSet <= sets)) return

    setCurrentExercise({ ...exercise, currentSet: 0 })
  }

  return (
  <li className={styles['link-card']}>
    <button className='w-full' onClick={handleClick}>
      <header className='flex gap-2 items-center justify-between'>
        <h3 className='text-left mr-1 font-semibold text-xl'>{title}</h3>
        {variation && <h4 className='text-right font-medium opacity-70'>{variation}</h4>}
      </header>

      <div className='flex gap-2 items-center justify-between text-sm'>
        <p>
          {sets && `${sets}x`}
          {repetitions}
        </p>
        <span className='opacity-90'>
          {weight && `${weight} ${weightUnit}`}
        </span>
      </div>
      {additionalInfo && <p className='text-left text-xs opacity-90'>{additionalInfo}</p>}
    </button>
  </li>
  )
}