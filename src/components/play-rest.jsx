import { Pause } from '@/icons/pause'
import { Play } from '@/icons/play'
import { useWorkoutStore } from '@/store/workoutStore'

export function PlayRest() {
  const { currentExercise, isRest, setIsRest } = useWorkoutStore((state) => state)
  const { currentSet, totalSets } = currentExercise

  const handleClick = () => {
    if (currentSet > totalSets || totalSets === 0) return
    setIsRest(!isRest)
  }
  return (
    <button
      class='bg-zinc-800/70 rounded-full p-4 transition hover:bg-neon hover:text-zinc-800 hover:scale-110'
      onClick={handleClick}
    >
      {isRest ? <Pause /> : <Play />}
    </button>
  )
}
