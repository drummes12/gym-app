import { useEffect } from 'react'

import { useWorkoutStore } from '@/store/workoutStore'
import { timeFormatted } from '@/lib/time'
import { PlayRest } from './play-rest'

export function PlayerBar() {
  const { timeRest, currentRestDuration, currentExercise, nextExercise, isRest, startTimer } = useWorkoutStore(
    (state) => state
  )

  useEffect(() => {
    if (isRest) startTimer()
  }, [isRest, startTimer])

  const { title, currentSet, sets } = currentExercise ?? {}

  return (
    <div className='relative flex items-center gap-2 px-4 w-full h-full rounded-lg overflow-hidden text-white/80'>
      <div
        id='bg-player'
        className='absolute left-0 top-0 -z-10 bg-white/50 h-full'
        style={{ width: `${(100 * timeRest) / currentRestDuration}%` }}
      ></div>
      <PlayRest />

      <div className='w-1/2'>
        {currentSet < sets - 1 ? (
          <>
            <p className='font-semibold text-xl leading-none'>{title}</p>
            <p className='text-xs'>
              {currentSet} de {sets}
            </p>
          </>
        ) : (
          <>
            <p className='font-semibold text-xl leading-none'>{nextExercise?.title}</p>
            <p className='text-xs'>Siguiente Ejercicio</p>
          </>
        )}
      </div>

      <div
        id='timer-rest'
        className='absolute right-0 top-0 opacity-70 flex flex-col items-center justify-center font-semibold gap-1 text-[2.4rem] leading-none font-dseg14 text-[#ffff00]'
      >
        <p>
          <span className='text-base leading-none'>min</span>
          {timeFormatted(timeRest).minutesFormatted}
        </p>
        <p className='flex'>
          <span className='text-base leading-none'>seg</span>
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
