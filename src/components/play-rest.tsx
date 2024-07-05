import { Pause } from '@/icons/pause'
import { Play } from '@/icons/play'
import { useWorkoutStore } from '@/store/workoutStore'

export function PlayRest({ size = 'sm' }) {
  const { currentExercise, isRest, setIsRest, hideDialog } = useWorkoutStore(
    (state) => state
  )
  const { currentSet, sets, rest_between_sets, rest_after_exercise } =
    currentExercise ?? {}

  const handleClick = () => {
    if (currentSet && sets && currentSet > sets) return
    if (!rest_between_sets || !rest_after_exercise) return
    setIsRest(!isRest)
    hideDialog()
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
      className={`${sizeButton} aspect-square transition sm:hover:scale-110
      flex items-center justify-center sm:border-2 rounded-full p-4 backdrop-blur-sm
      bg-neon-dark text-neon dark:bg-neon dark:text-zinc-800
      sm:text-neon-dark sm:bg-white/10 sm:border-neon-dark/40
      sm:hover:bg-neon-dark sm:hover:text-neon
      dark:sm:text-neon dark:sm:bg-dark/10 dark:sm:border-neon/40 
      dark:sm:hover:bg-neon dark:sm:hover:text-zinc-800
      `}
      onClick={handleClick}
    >
      {isRest ? <Pause className={sizeIcon} /> : <Play className={sizeIcon} />}
    </button>
  )
}
