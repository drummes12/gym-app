import { useState } from 'react'
import type { Exercises } from '@/types/GymTracker'
import { GripVertical } from '@/icons/grip-vertical'
import { useTrainingStore } from '@/store/trainingStore'

export function ExerciseCard({ exercise }: { exercise: Exercises }) {
  const [isActive, setIsActive] = useState(false)
  const [isNext, setIsNext] = useState(false)
  const { isPlayerBarVisible, showPlayerBar, setCurrentSet, showExerciseInfo } =
    useTrainingStore()

  const handleClick = () => {
    !isPlayerBarVisible && showPlayerBar()
    showExerciseInfo(exercise)

    setCurrentSet({
      ...exercise,
      numberSet: 1,
      reps: exercise.sets[0].reps,
      weight: exercise.sets[0].weight
    })
  }

  if (exercise == null) return null
  const {
    id,
    title,
    variation,
    sets = [],
    weight_unit: weightUnit,
    additional_info: additionalInfo
  } = exercise

  const sameWeight = sets?.every((set) => set.weight === sets[0].weight)
  const hasWeight = sets?.some((set) => set.weight)
  const firstWeight = sets?.find((set) => set.weight)?.weight
  const sameReps = sets?.every((set) => set.reps === sets[0].reps)

  return (
    <li
      className={`link-card select-none group ${
        isActive ? 'current-exercise' : ''
      } ${isNext ? 'next-exercise' : ''}`}
      data-label={id}
      key={id}
    >
      <span className='sm:hidden group-hover:block pl-3 cursor-grab active:cursor-grabbing drag-handle'>
        <GripVertical />
      </span>
      <button className='w-full p-3' onClick={handleClick}>
        <header className='flex gap-2 items-center justify-between'>
          <h2 className='text-l text-left mr-1 font-semibold text-xl'>
            {title}
          </h2>
          {variation && (
            <h4 className='text-r text-right font-medium opacity-70'>
              {variation}
            </h4>
          )}
        </header>

        <div className='flex gap-2 items-center justify-between text-sm'>
          <p className='text-l'>
            {sets && `${sets.length}x${sameReps ? sets[0].reps : ''}`}
          </p>
          <span className='text-r opacity-90'>
            {sameWeight && hasWeight && `${firstWeight} ${weightUnit}`}
            {!sameWeight && 'Piramidal'}
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
