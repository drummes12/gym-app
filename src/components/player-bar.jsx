import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

import { useWorkoutStore } from '@/store/workoutStore'
import { timeFormatted } from '@/lib/time'
import { PlayRest } from './play-rest'

export function PlayerBar() {
  const { currentExercise, isRest, dialogElement, setIsRest, setCurrentExercise } = useWorkoutStore((state) => state)

  const [currentRestTime, setCurrentRestTime] = useState(currentExercise.rest)
  const [time, setTime] = useState(currentExercise.rest)

  useEffect(() => {
    setCurrentRestTime(currentExercise.rest)
    setTime(currentExercise.rest)
  }, [currentExercise.rest])

  useEffect(() => {
    let intervalId = null
    if (isRest) {
      intervalId = setInterval(() => {
        setTime((currentTime) => currentTime - 1)
      }, 1000)
    } else if (!isRest) {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isRest])

  useEffect(() => {
    if (time === 0) {
      setIsRest(false)
      handleSetCompletion()
    }
  }, [time])

  function handleSetCompletion() {
    const { currentSet, totalSets, rest, breakRest } = currentExercise

    if (currentSet < totalSets - 1) {
      const newCurrentSet = currentSet + 1
      setCurrentExercise({
        ...currentExercise,
        currentSet: newCurrentSet,
      })
      const newRestTime = currentSet === totalSets - 2 ? breakRest ?? rest : rest
      setCurrentRestTime(newRestTime)
      setTime(newRestTime)
      dialogElement?.showModal()
      confetti()
    } else {
      setCurrentExercise({
        ...currentExercise,
        currentSet: 0,
      })
      setCurrentRestTime(rest)
      setTime(rest)
    }
  }

  const { title, nextWorkout, currentSet, totalSets } = currentExercise

  return (
    <div className='relative flex items-center gap-2 px-4 w-full h-full rounded-lg overflow-hidden text-white/80'>
      <div
        id='bg-player'
        className='absolute left-0 top-0 -z-10 bg-white/50 h-full'
        style={{ width: `${(100 * time) / currentRestTime}%` }}
      ></div>
      <PlayRest />

      <div className='w-1/2'>
        {currentSet < totalSets - 1 ? (
          <>
            <p className='font-semibold text-xl leading-none'>{title}</p>
            <p className='text-xs'>
              {currentSet} de {totalSets}
            </p>
          </>
        ) : (
          <>
            <p className='font-semibold text-xl leading-none'>{nextWorkout}</p>
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
