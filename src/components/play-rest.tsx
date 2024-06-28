import { Pause } from '@/icons/pause'
import { Play } from '@/icons/play'
import { useWorkoutStore } from '@/store/workoutStore'

export function PlayRest() {
  const { currentExercise, isRest, setIsRest } = useWorkoutStore((state) => state)
  const { currentSet, sets, rest_between_sets, rest_after_exercise } =
    currentExercise ?? {}

  const handleClick = () => {
    if (currentSet && sets && currentSet > sets) return
    if (!rest_between_sets || !rest_after_exercise) return
    setIsRest(!isRest)
  }
  return (
    <button
      className='bg-neon text-zinc-800 sm:text-white scale-110 sm:bg-zinc-800/70 rounded-full p-4 transition sm:hover:bg-neon sm:hover:text-zinc-800 sm:hover:scale-110'
      onClick={handleClick}
    >
      {isRest ? <Pause /> : <Play />}
    </button>
  )
}
