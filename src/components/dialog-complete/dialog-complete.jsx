import { useEffect } from 'react'
import styles from '@/components/dialog-complete/dialog-complete.module.css'

export function DialogComplete() {
  useEffect(() => {
    const $dialog = document.querySelector('dialog')

    if (!$dialog) {
      throw new Error('Dialog not found')
    }

    $dialog.addEventListener('mousedown', (e) => {
      if (e.target === $dialog) {
        $dialog.close()
      }
    })
    $dialog.showModal()
  }, [])

  return (
    <dialog>
      <form method='dialog' className={styles.dialog}>
        <section>
          <h1>Dialog</h1>
          <p>This is a dialog.</p>
        </section>
      </form>
    </dialog>
  )
}
