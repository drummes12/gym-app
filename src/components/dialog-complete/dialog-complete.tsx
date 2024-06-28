import { useEffect } from 'react'
import styles from '@/components/dialog-complete/dialog-complete.module.css'
import { useWorkoutStore } from '@/store/workoutStore'
import { Close } from '@/icons/close.jsx'
import { PlayRest } from '@/components/play-rest'

export function DialogComplete() {
  const { currentExercise, setDialogElement, timeRest } = useWorkoutStore(
    (state) => state
  )

  useEffect(() => {
    const $dialog = document.querySelector('dialog')
    if (!$dialog) return

    $dialog.addEventListener('mousedown', (e) => {
      if (e.target === $dialog) {
        $dialog.close()
      }
    })
    setDialogElement($dialog)
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

  let sizeTitle = 'text-7xl'

  if (wordLargeTitle.length > 12) {
    sizeTitle = 'text-3xl'
  } else if (wordLargeTitle.length > 9) {
    sizeTitle = 'text-4xl'
  } else if (wordLargeTitle.length > 7) {
    sizeTitle = 'text-5xl'
  } else if (wordLargeTitle.length > 6) {
    sizeTitle = 'text-6xl'
  }

  return (
    <dialog>
      <form method='dialog' className={styles.dialog}>
        <header className='text-lg font-bold overflow-hidden'>
          <h1 className='opacity-80'>{statusTitle}</h1>
          <h2 className={`${sizeTitle} max-w-[20ch] uppercase`}>{title}</h2>
        </header>

        <section>
          <div className='flex flex-col justify-center items-center my-6'>
            {variation && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right'>
                  {variation}
                </span>
                <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                  Variation
                </span>
              </p>
            )}
            {weight && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right'>
                  {weight} {weightUnit}
                </span>
                <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                  Weight
                </span>
              </p>
            )}
            {additional_info && (
              <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
                <span className='inline-block flex-1 text-right'>
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
          <p className='flex justify-between font-dseg14 text-[#ffff00] text-3xl'>
            <span className='font-dseg14'>
              {currentSet?.toString().padStart(2, '0')}/
              {sets?.toString().padStart(2, '0')}
            </span>
            <span className=''>{repetitions}x</span>
          </p>
        </section>

        <menu className='pt-8 flex justify-between items-end'>
          <p className='pt-4 text-xs'>Descanso de {timeRest} segundos</p>
          <PlayRest size='md' />
        </menu>

        <button
          className='absolute bg-zinc-800 rounded-full p-1 top-0 right-0 translate-x-1/2 -translate-y-1/2 stroke-2 hover:scale-110 transform transition-transform duration-300 focus:outline-none'
          type='submit'
        >
          <Close />
        </button>
      </form>
    </dialog>
  )
}
