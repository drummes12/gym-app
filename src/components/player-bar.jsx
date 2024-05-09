import { useEffect, useState } from 'react'

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
  const initialRest = 60

  const [isRest, setIsRest] = useState(false)
  const [time, setTime] = useState(initialRest)

  useEffect(() => {
    if (time === 0) {
      notifyMe()
      setIsRest(false)
      setTime(initialRest)
    }

    let intervalId = null
    if (isRest) {
      intervalId = setInterval(() => {
        setTime((currentTime) => currentTime - 1)
      }, 1000)
    } else if (!isRest && time !== initialRest) {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isRest, time])

  const handleClick = () => {
    document.getElementById('bip-notification').play()
    setIsRest(!isRest)
  }

  return (
    <div className='relative flex items-center justify-between px-4 w-full h-full rounded-lg overflow-hidden text-white/80'>
      <div
        id='bg-player'
        className='absolute left-0 top-0 -z-10 bg-white/50 h-full'
        style={{ width: `${(100 * time) / initialRest}%` }}
      ></div>
      <button className='bg-zinc-800/70 rounded-full p-4' onClick={handleClick}>
        {isRest ? <Pause /> : <Play />}
      </button>
      <audio id='bip-notification' src='/level-up-191997.mp3' preload='auto'></audio>
      <p className='flex flex-col items-end font-semibold text-4xl tabular-nums'>
        {timeFormatted(time)}
        <span className='block text-base'>{displayFormattedTime(initialRest)}</span>
      </p>
    </div>
  )
}

function timeFormatted(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const minutesFormatted = minutes.toString().padStart(2, '0')
  const secondsFormatted = remainingSeconds.toString().padStart(2, '0')

  return `${minutesFormatted}:${secondsFormatted}`
}

function displayFormattedTime(seconds) {
  const minutos = Math.floor(seconds / 60)
  const segundosRestantes = seconds % 60

  let resultado = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' }).format(
    [minutos > 0 ? `${minutos} min` : null, segundosRestantes > 0 ? `${segundosRestantes} s` : null].filter(Boolean)
  )

  return resultado
}

function notifyMe() {
  const audio = document.getElementById('bip-notification')
  audio.play().catch((error) => console.error(error))
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
