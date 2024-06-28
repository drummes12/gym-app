import { useEffect } from 'react'

import { useWorkoutStore } from '@/store/workoutStore'
import { timeFormatted } from '@/lib/time'
import { PlayRest } from '@/components/play-rest'

export function PlayerBar() {
  const {
    timeRest,
    currentRestDuration,
    currentExercise,
    nextExercise,
    isRest,
    startTimer
  } = useWorkoutStore((state) => state)

  useEffect(() => {
    if (isRest) startTimer()
  }, [isRest, startTimer])

  const {
    title,
    variation,
    repetitions,
    currentSet,
    sets,
    weight,
    weight_unit: weightUnit,
    additional_info: additionalInfo
  } = currentExercise ?? {}

  return (
    <div className='relative flex items-center justify-center gap-2 px-4 w-full h-full rounded-lg overflow-hidden text-white/80'>
      <div
        id='bg-player'
        className='absolute left-0 top-0 -z-10 bg-white/50 h-full'
        style={{ width: `${(100 * timeRest) / currentRestDuration}%` }}
      ></div>

      <div className='w-[6.5rem] text-right overflow-clip'>
        <p className='font-semibold text-xl leading-none uppercase'>{title}</p>
      </div>
      <PlayRest />
      <div className='w-[6.5rem] [&>p]:-my-1'>
        <p className='font-semibold text-sm leading-none opacity-60'>
          {variation}
        </p>
        <p className='font-semibold text-xl'>
          {weight} {weightUnit}
        </p>
        <p className='text-xs opacity-60'>{additionalInfo}</p>
      </div>

      {currentSet !== undefined &&
        sets !== undefined &&
        sets > 0 &&
        currentSet < sets && (
          <div
            id='timer-rest'
            className='absolute left-0 top-0 opacity-70 flex items-center justify-center font-dseg14 text-[#ffff00]'
          >
            <div className='flex flex-col font-semibold gap-1 text-[2.4rem] leading-none'>
              <p>{currentSet?.toString().padStart(2, '0')}</p>
              <p className='flex'>{sets?.toString().padStart(2, '0')}</p>
            </div>
            <p className='text-xs leading-none'>{repetitions}x</p>
          </div>
        )}

      <div
        id='timer-rest'
        className='absolute right-0 top-0 opacity-70 flex flex-col items-end justify-center font-semibold gap-1 text-[2.4rem] leading-none font-dseg14 text-[#ffff00]'
      >
        <p>
          <span className='text-xs leading-none'>min</span>
          {timeFormatted(timeRest).minutesFormatted}
        </p>
        <p className='flex'>
          <span className='text-xs leading-none'>seg</span>
          {timeFormatted(timeRest).secondsFormatted}
        </p>
      </div>
    </div>
  )
}

function notifyMe() {
  const messageNotification = '🔔 ¡Dale duro! 🦾'

  if (!('Notification' in window)) {
    console.error(messageNotification)
  } else if (Notification.permission === 'granted') {
    new Notification(messageNotification)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(messageNotification)
      }
    })
  }
}
