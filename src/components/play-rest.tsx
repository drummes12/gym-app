import { Pause } from '@/icons/pause'
import { Play } from '@/icons/play'
import { useWorkoutStore } from '@/store/workoutStore'

export function PlayRest({ size = 'sm' }) {
  const { currentExercise, isRest, setIsRest, dialogElement } = useWorkoutStore(
    (state) => state
  )
  const { currentSet, sets, rest_between_sets, rest_after_exercise } =
    currentExercise ?? {}

  const handleClick = () => {
    if (currentSet && sets && currentSet > sets) return
    if (!rest_between_sets || !rest_after_exercise) return
    setIsRest(!isRest)
    dialogElement?.close()
  }

  let sizeButton = 'size-12'
  let sizeIcon = 'size-6'
  if (size === 'md') {
    sizeButton = 'size-16'
    sizeIcon = 'size-8'
  } else if (size === 'lg') {
    sizeButton = 'size-20'
    sizeIcon = 'size-10'
  } else if (size === 'xl') {
    sizeButton = 'size-24'
    sizeIcon = 'size-12'
  }

  return (
    <button
      className={`${sizeButton} bg-neon text-zinc-800
      flex items-center justify-center
      sm:text-white sm:bg-zinc-800 sm:border-neon/40 sm:border-2 rounded-full p-4
      transition sm:hover:bg-neon sm:hover:text-zinc-800 sm:hover:scale-110
      `}
      onClick={handleClick}
    >
      {isRest ? <Pause className={sizeIcon} /> : <Play className={sizeIcon} />}
    </button>
  )
}
