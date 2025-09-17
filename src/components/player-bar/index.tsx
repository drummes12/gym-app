import { useEffect, useState } from 'react'

import styles from './player-bar.module.css'
import { useTimerStore } from '@/store/timerStore'
import { useWorkoutSessionStore } from '@/store/workoutSessionStore'
import { timeFormatted } from '@/lib/time'
import { PlayRest } from '@/components/play-rest'
import { REST_AFTER_EXERCISE, REST_BETWEEN_SETS } from '@/constants'

export function PlayerBar() {
  const { timeRest, isRest, resetTimer } = useTimerStore()
  const { currentExercise } = useWorkoutSessionStore()
  const [isVisible, setIsVisible] = useState(currentExercise != null)

  // Initialize timer display with correct duration when exercise changes
  useEffect(() => {
    if (currentExercise && !isRest) {
      resetTimer()
    }
  }, [currentExercise, isRest, resetTimer])

  useEffect(() => {
    setIsVisible(currentExercise != null)
  }, [currentExercise])

  const exercise = currentExercise?.exercise
  const {
    title,
    variation,
    repetitions,
    weight,
    weight_unit: weightUnit,
    additional_info: additionalInfo,
    sets
  } = exercise ?? {}

  const { currentSet, completedSets } = currentExercise ?? {}
  const totalSets = sets || completedSets?.length || 0

  // Calculate current rest duration based on current set (same logic as PlayRest)
  const isLastSet = currentSet !== undefined && currentSet >= totalSets - 1
  const currentRestDuration = isLastSet
    ? exercise?.rest_after_exercise || REST_BETWEEN_SETS
    : exercise?.rest_between_sets || REST_AFTER_EXERCISE

  // Update timer display when currentRestDuration changes
  useEffect(() => {
    if (currentExercise && !isRest) {
      useTimerStore.setState({ timeRest: currentRestDuration })
    }
  }, [currentExercise, currentRestDuration, isRest])

  return (
    <div
      className={`${
        isVisible ? 'flex' : 'hidden'
      } relative items-center justify-center gap-2 px-4 w-full h-20 rounded-lg overflow-visible dark:text-white/80`}
    >
      <div className='absolute left-0 top-0 w-full h-full flex -z-10 justify-center bg-white/50 dark:bg-black/20 rounded-lg'>
        <div
          className={`${styles['bg-player']} h-full`}
          style={{ width: `${(100 * timeRest) / currentRestDuration}%` }}
        ></div>
      </div>

      <div className='w-44 mr-1 text-right overflow-clip hidden sm:block'>
        <p className='font-semibold text-xl leading-none uppercase'>{title}</p>
      </div>
      <PlayRest size='xl' />
      <div className='w-44 ml-1 [&>p]:-my-1 hidden sm:block'>
        <p className='font-semibold text-sm leading-none opacity-60'>
          {variation}
        </p>
        <p className='font-semibold text-xl'>
          {weight} {weightUnit}
        </p>
        <p className='text-xs opacity-60'>{additionalInfo}</p>
      </div>

      {currentSet !== undefined &&
        totalSets !== undefined &&
        totalSets > 0 &&
        currentSet < totalSets && (
          <div
            className={`${styles['text-player']} absolute h-full left-0 top-0 opacity-70 flex items-center justify-center font-semibold gap-1 text-4xl leading-none font-dseg14 text-neon-dark dark:text-neon`}
          >
            <div className='flex flex-col gap-1 relative'>
              <span className='absolute left-0 text-black/5 dark:text-black/20 text -z-10 [text-shadow:none]'>
                00
              </span>
              <span className='absolute left-0 bottom-0 text-black/5 dark:text-black/20 text -z-10 [text-shadow:none]'>
                00
              </span>
              <p className='flex-1'>
                {currentSet?.toString().padStart(2, '0')}
              </p>
              <p className='flex-1'>{totalSets?.toString().padStart(2, '0')}</p>
            </div>
            <p className='text-xs'>{repetitions}x</p>
          </div>
        )}

      <div
        className={`${styles['text-player']} absolute h-full right-0 top-0 opacity-70 flex items-center justify-center font-semibold gap-1 text-4xl leading-none font-dseg14 text-neon-dark dark:text-neon`}
      >
        <div className='flex flex-col gap-1'>
          <p className='flex-1 relative'>
            <span className='text-xs leading-none'>min</span>
            <span className='absolute right-0 text-black/5 dark:text-black/20 text -z-10 [text-shadow:none]'>
              00
            </span>
            <span>{timeFormatted(timeRest).minutesFormatted}</span>
          </p>
          <p className='flex-1 flex relative'>
            <span className='text-xs leading-none'>seg</span>
            <span className='absolute right-0 text-black/5 dark:text-black/20 text -z-10 [text-shadow:none]'>
              00
            </span>
            <span>{timeFormatted(timeRest).secondsFormatted}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
