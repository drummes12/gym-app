import { useEffect, useState } from 'react'
import { useWorkoutStore } from '@/store/workoutStore'
import { timeFormatted } from '@/lib/time'

export const Pause = ({ className }) => (
  <svg className={className} role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 16 16'>
    <path
      fill='currentColor'
      d='M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z'
    ></path>
  </svg>
)

export const Play = ({ className }) => (
  <svg className={className} role='img' height='24' width='24' aria-hidden='true' viewBox='0 0 16 16'>
    <path
      fill='currentColor'
      d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'
    ></path>
  </svg>
)

export function PlayerBar() {
  const { currentRestTime, currentExercise, isRest, setIsRest, setCurrentExercise } = useWorkoutStore((state) => state)

  const [time, setTime] = useState(currentRestTime)

  useEffect(() => {
    if (time === 0) {
      notifyMe()
      setIsRest(false)
    }

    let intervalId = null
    if (isRest) {
      intervalId = setInterval(() => {
        setTime((currentTime) => currentTime - 1)
      }, 1000)
    } else if (!isRest && time !== currentRestTime) {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isRest, time])

  useEffect(() => {
    if (time === 0) {
      setTime(currentRestTime)
      setCurrentExercise({
        ...currentExercise,
        currentSet: currentExercise.currentSet + 1,
      })
    }
  }, [time])

  const handleClick = () => {
    setIsRest(!isRest)
  }

  return (
    <div className='relative flex items-center gap-2 px-4 w-full h-full rounded-lg overflow-hidden text-white/80'>
      <div
        id='bg-player'
        className='absolute left-0 top-0 -z-10 bg-white/50 h-full'
        style={{ width: `${(100 * time) / currentRestTime}%` }}
      ></div>
      <button className='bg-zinc-800/70 rounded-full p-4' onClick={handleClick}>
        {isRest ? <Pause /> : <Play />}
      </button>

      <div>
        <p className='font-semibold text-xl'>{currentExercise.title}</p>
        <p className='text-xs'>{currentExercise.currentSet} de 4</p>
      </div>

      <div
        id='timer-rest'
        className='absolute right-0 top-0 opacity-70 flex flex-col items-center justify-center font-semibold gap-1 text-[2.4rem] leading-none font-dseg14 text-[#ffff00]'
      >
        <p>
          <span className='text-base leading-none'>min</span>
          {timeFormatted(time).minutesFormatted}
        </p>
        <p className='flex'>
          <span className='text-base leading-none'>seg</span>
          {timeFormatted(time).secondsFormatted}
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
