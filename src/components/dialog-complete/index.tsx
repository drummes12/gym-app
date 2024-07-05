import { useEffect } from 'react'
import styles from '@/components/dialog-complete/dialog-complete.module.css'
import { useWorkoutStore } from '@/store/workoutStore'
import { Close } from '@/icons/close.jsx'
import { PlayRest } from '@/components/play-rest'
import { timeFormatted } from '@/lib/time'
import confetti from 'canvas-confetti'

export function DialogComplete() {
  const {
    currentExercise,
    nextExercise,
    controlTime,
    setDialogElement,
    setDialogConfetti,
    hideDialog
  } = useWorkoutStore((state) => state)

  useEffect(() => {
    const $dialog = document.querySelector('dialog')
    if (!$dialog) return

    $dialog.addEventListener('mousedown', (e) => {
      if (e.target === $dialog) {
        hideDialog()
      }
    })
    setDialogElement($dialog)
  }, [])

  useEffect(() => {
    const $canvas = document.getElementById(
      'confettiCanvas'
    ) as HTMLCanvasElement | null
    if (!$canvas) return

    const dialogConfetti = confetti.create($canvas, {
      resize: true,
      useWorker: true
    })
    setDialogConfetti(dialogConfetti)
  }, [])

  const {
    title,
    currentSet,
    sets = 0,
    repetitions,
    variation,
    weight,
    weight_unit: weightUnit,
    additional_info
  } = currentExercise ?? {}

  const isLastSet = currentSet === sets - 1
  const statusTitle = isLastSet ? '¡Última Serie!' : '¡Descanso Terminado!'

  const wordsTitle = title?.split(' ')
  const wordLargeTitle =
    wordsTitle?.reduce((a, b) => (a.length > b.length ? a : b)) ?? ''

  let sizeTitle = 'text-6xl sm:text-7xl'

  if (wordLargeTitle.length > 12) {
    sizeTitle = 'text-2xl sm:text-3xl'
  } else if (wordLargeTitle.length > 9) {
    sizeTitle = 'text-3xl sm:text-4xl'
  } else if (wordLargeTitle.length > 7) {
    sizeTitle = 'text-4xl sm:text-5xl'
  } else if (wordLargeTitle.length > 6) {
    sizeTitle = 'text-5xl sm:text-6xl'
  }

  return (
    <dialog>
      <canvas id='confettiCanvas'></canvas>
      <form method='dialog' className={styles.dialog}>
        <header className='relative text-lg font-bold overflow-hidden'>
          <h1 className='opacity-80'>{statusTitle}</h1>
          <h2 className={`${sizeTitle} max-w-[20ch] uppercase`}>{title}</h2>
        </header>

        <section>
          <div className='flex flex-col gap-2 justify-center items-center my-6'>
            {variation && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right leading-none'>
                  {variation}
                </span>
                <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                  Variation
                </span>
              </p>
            )}
            {weight && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right leading-none'>
                  {weight} {weightUnit}
                </span>
                <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                  Weight
                </span>
              </p>
            )}
            {additional_info && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right leading-none'>
                  {additional_info}
                </span>
                <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                  Info
                </span>
              </p>
            )}
          </div>

          <p className='flex justify-between opacity-60 uppercase text-xs'>
            <span>Sets</span>
            <span>Reps</span>
          </p>
          <p className='flex justify-between font-dseg14 text-neon-dark dark:text-neon text-3xl'>
            <span className='font-dseg14'>
              {currentSet?.toString().padStart(2, '0')}/
              {sets?.toString().padStart(2, '0')}
            </span>
            <span>{repetitions}x</span>
          </p>
        </section>

        <menu className='pt-8 flex h-min gap-4 justify-between items-end'>
          <div className='flex flex-col text-sm'>
            {nextExercise ? (
              <>
                <h4 className='pb-1'>Siguiente Ejercicio</h4>
                <div className='opacity-50 flex flex-wrap gap-0.5 leading-none tracking-tighter'>
                  <div
                    className={`w-min flex justify-center items-center py-1 px-2 border-2 ${
                      isLastSet
                        ? 'border-neon-dark/60 text-neon-dark/60 dark:border-neon/60 dark:text-neon/60'
                        : 'border-black/20 dark:border-white/20'
                    } rounded-lg`}
                  >
                    <p>{nextExercise.title}</p>
                  </div>
                  {nextExercise.weight && (
                    <div
                      className={`flex justify-center items-center py-1 px-2 border-2 ${
                        isLastSet
                          ? 'border-neon-dark/60 text-neon-dark/60 dark:border-neon/60 dark:text-neon/60'
                          : 'border-black/20 dark:border-white/20'
                      } rounded-lg`}
                    >
                      <p>
                        {nextExercise.weight} {nextExercise.weight_unit}
                        <span className='block opacity-60 text-xs'>Weight</span>
                      </p>
                    </div>
                  )}
                  {nextExercise.sets && nextExercise.repetitions && (
                    <div
                      className={`flex justify-center items-center py-1 px-2 border-2 ${
                        isLastSet
                          ? 'border-neon-dark/60 text-neon-dark/60 dark:border-neon/60 dark:text-neon/60'
                          : 'border-black/20 dark:border-white/20'
                      } rounded-lg`}
                    >
                      <p>
                        {nextExercise.sets}x{nextExercise.repetitions}
                        <span className='block opacity-60 text-xs'>Sets</span>
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className='text-center'>¡Último ejercicio!</p>
            )}
          </div>
          <div className='w-min aspect-square'>
            <PlayRest size='xl' />
            <div className='mt-2 flex justify-center items-center opacity-70'>
              <p className='h-min text-xs pt-2'>Tiempo de control</p>
              <div className='flex flex-col gap-1 items-center justify-center relative text-base leading-none font-dseg14 tracking-tighter text-[#b47200] dark:text-[#fb9f00]'>
                <p className='flex-1'>
                  {timeFormatted(controlTime).minutesFormatted}
                </p>
                <p className='flex-1'>
                  {timeFormatted(controlTime).secondsFormatted}
                </p>
              </div>
            </div>
          </div>
        </menu>

        <button
          className='hidden sm:flex absolute bg-white dark:bg-zinc-800 rounded-full p-1 top-0 right-0 translate-x-1/2 -translate-y-1/2 stroke-2 hover:scale-110 transform transition-transform duration-300 focus:outline-none'
          type='submit'
        >
          <Close />
        </button>
      </form>
    </dialog>
  )
}
