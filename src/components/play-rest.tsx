import { Pause } from '@/icons/pause'
import { Play } from '@/icons/play'
import { useTimerStore } from '@/store/timerStore'
import { useWorkoutSessionStore } from '@/store/workoutSessionStore'
import { useUIStore } from '@/store/uiStore'
import { REST_AFTER_EXERCISE, REST_BETWEEN_SETS } from '@/constants'

export function PlayRest({ size = 'sm' }) {
  const { isRest, isPaused, startTimer, pauseTimer, resumeTimer } =
    useTimerStore()
  const { currentExercise, nextSet } = useWorkoutSessionStore()
  const { closeAllDialogs, openDialog } = useUIStore()

  const { currentSet, completedSets, exercise } = currentExercise ?? {}
  const { rest_between_sets, rest_after_exercise } = exercise ?? {}

  const handleClick = () => {
    if (!currentExercise || !exercise) return

    const totalSets = exercise.sets || completedSets?.length || 0
    if (currentSet !== undefined && currentSet >= totalSets) return

    if (!rest_between_sets && !rest_after_exercise) return

    if (isRest) {
      if (isPaused) {
        resumeTimer()
      } else {
        pauseTimer()
      }
    } else {
      // Determine which rest time to use based on current set
      const totalSets = exercise.sets || completedSets?.length || 0
      const isLastSet = currentSet !== undefined && currentSet >= totalSets - 1

      const restTime = isLastSet
        ? rest_after_exercise || REST_AFTER_EXERCISE
        : rest_between_sets || REST_BETWEEN_SETS

      // Start timer with completion callback
      startTimer(restTime, () => {
        // Open dialog when timer completes
        openDialog('exerciseDetails')
        nextSet()
      })
    }

    closeAllDialogs()
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
      className={`${sizeButton} aspect-square transition-all duration-200 sm:hover:scale-110
      flex items-center justify-center border-2 rounded-full p-4 backdrop-blur-sm
      bg-neon-dark text-neon border-neon-dark/40
      dark:bg-neon dark:text-zinc-800 dark:border-neon/40
      sm:hover:bg-neon-dark sm:hover:text-neon sm:hover:border-neon-dark
      dark:sm:hover:bg-neon dark:sm:hover:text-zinc-800 dark:sm:hover:border-neon
      `}
      onClick={handleClick}
    >
      {isRest && !isPaused ? (
        <Pause className={sizeIcon} />
      ) : (
        <Play className={sizeIcon} />
      )}
    </button>
  )
}
