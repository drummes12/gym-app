import { REST_BETWEEN_SETS } from '@/constants'
import { create } from 'zustand'

interface TimerStoreState {
  // Timer state
  isRest: boolean
  timeRest: number
  intervalId: NodeJS.Timeout | null

  // Timer actions
  setIsRest: (isRest: boolean) => void
  startTimer: (duration?: number) => void
  stopTimer: () => void
  resetTimer: () => void

  // Timer utilities
  formatTime: (seconds: number) => string
  getTimeRemaining: () => number
}

export const useTimerStore = create<TimerStoreState>((set, get) => ({
  // Initial state
  isRest: false,
  timeRest: REST_BETWEEN_SETS,
  intervalId: null,

  // Actions
  setIsRest: (isRest: boolean) => {
    const { stopTimer } = get()

    if (!isRest) {
      stopTimer()
    }

    set({ isRest })
  },

  startTimer: (duration = REST_BETWEEN_SETS) => {
    const { stopTimer } = get()

    // Clear any existing timer
    stopTimer()

    set({
      timeRest: duration,
      isRest: true
    })

    const intervalId = setInterval(() => {
      const { timeRest } = get()

      if (timeRest <= 1) {
        get().stopTimer()
        set({ isRest: false })
        return
      }

      set({ timeRest: timeRest - 1 })
    }, 1000)

    set({ intervalId })
  },

  stopTimer: () => {
    const { intervalId } = get()

    if (intervalId) {
      clearInterval(intervalId)
      set({ intervalId: null })
    }
  },

  resetTimer: () => {
    const { stopTimer } = get()

    stopTimer()
    set({
      timeRest: REST_BETWEEN_SETS,
      isRest: false
    })
  },

  formatTime: (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  },

  getTimeRemaining: () => {
    return get().timeRest
  }
}))

// Cleanup timer on unmount
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useTimerStore.getState().stopTimer()
  })
}
