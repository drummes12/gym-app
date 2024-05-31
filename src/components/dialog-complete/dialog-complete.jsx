import { useEffect } from 'react'
import styles from '@/components/dialog-complete/dialog-complete.module.css'
import { useWorkoutStore } from '@/store/workoutStore'
import { Close } from '@/icons/close.jsx'
import { PlayRest } from '../play-rest'

export function DialogComplete() {
  const { currentExercise, nextExercise, setDialogElement } = useWorkoutStore((state) => state)

  useEffect(() => {
    const $dialog = document.querySelector('dialog')

    $dialog.addEventListener('mousedown', (e) => {
      if (e.target === $dialog) {
        $dialog.close()
      }
    })
    setDialogElement($dialog)
  }, [])

  const { title, currentSet, sets } = currentExercise ?? {}
  return (
    <dialog>
      <form method='dialog' className={styles.dialog}>
        <header className='pb-4 text-2xl font-bold'>
          <h1>¡Descanso Terminado!</h1>
        </header>

        <section>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='text-xs'>
            {currentSet} de {sets}
          </p>
        </section>

        {currentSet === sets - 1 && (
          <section>
            <h2 className='text-lg font-semibold'>¡Ultima serie!</h2>
            <p className='text-xs [&>span]:font-bold'>
              <span>Siguiente ejercicio:</span> {nextExercise?.title}
            </p>
          </section>
        )}

        <menu className='pt-4 flex justify-between'>
          <PlayRest />
          {currentSet < sets - 1 ? (
            <p className='pt-4 text-xs'>Descanso de {currentExercise?.rest} segundos</p>
          ) : (
            <p className='pt-4 text-xs'>Descanso de {currentExercise?.breakRest ?? currentExercise?.rest} segundos</p>
          )}
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
