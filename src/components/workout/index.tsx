import { animations } from '@formkit/drag-and-drop'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import type { Exercises } from '@/types/GymTracker'

import { ExerciseCard } from '@/components/exercise-card'

import { useTrainingStore } from '@/store/trainingStore'

export function Workout({ exercises }: { exercises: Exercises[] }) {
  const { isExerciseInfoVisible } = useTrainingStore()

  const [parent, exercisesList] = useDragAndDrop<HTMLUListElement, string>(
    exercises.map((exercise) => exercise.id),
    {
      plugins: [animations()],
      dragHandle: '.drag-handle'
    }
  )

  return (
    <ul
      ref={parent}
      className={`flex flex-col gap-1 ${
        isExerciseInfoVisible ? 'h-min max-h-full' : ''
      }`}
    >
      {exercisesList.map((exerciseId) => {
        const exerciseInfo = exercises.find((ex) => ex.id === exerciseId)

        if (!exerciseInfo) return null
        return <ExerciseCard key={exerciseId} exercise={exerciseInfo} />
      })}
    </ul>
  )
}
