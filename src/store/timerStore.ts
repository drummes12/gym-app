import { REST_BETWEEN_SETS } from '@/constants'
import { create } from 'zustand'
import { playSound } from '@/services/audioNotification'

interface TimerStoreState {
  // Timer state
  isRest: boolean
  isPaused: boolean
  timeRest: number
  intervalId: NodeJS.Timeout | null
  onCompleteCallback: (() => void) | null

  // Timer actions
  setIsRest: (isRest: boolean) => void
  startTimer: (duration?: number, onComplete?: () => void) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  resetTimer: () => void

  // Timer utilities
  formatTime: (seconds: number) => string
  getTimeRemaining: () => number
}

export const useTimerStore = create<TimerStoreState>((set, get) => ({
  // Initial state
  isRest: false,
  isPaused: false,
  timeRest: REST_BETWEEN_SETS,
  intervalId: null,
  onCompleteCallback: null,

  // Actions
  setIsRest: (isRest: boolean) => {
    const { stopTimer } = get()

    if (!isRest) {
      stopTimer()
    }

    set({ isRest })
  },

  startTimer: (duration = REST_BETWEEN_SETS, onComplete?: () => void) => {
    const { stopTimer } = get()

    // Clear any existing timer
    stopTimer()

    set({
      timeRest: duration,
      isRest: true,
      onCompleteCallback: onComplete || null
    })

    const intervalId = setInterval(() => {
      const { timeRest, onCompleteCallback } = get()

      if (timeRest <= 1) {
        try {
          playSound()
        } catch (error) {
          console.warn('Could not play sound:', error)
        }

        // Execute custom completion callback if provided
        if (onCompleteCallback) {
          onCompleteCallback()
        } else {
          console.warn('⚠️ No completion callback provided')
        }

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
    set({ isPaused: false, onCompleteCallback: null })
  },

  pauseTimer: () => {
    const { intervalId } = get()

    if (intervalId) {
      clearInterval(intervalId)
      set({ intervalId: null, isPaused: true })
    }
  },

  resumeTimer: () => {
    const { isPaused, timeRest } = get()

    if (!isPaused) return

    const intervalId = setInterval(() => {
      const { timeRest, onCompleteCallback } = get()

      if (timeRest <= 1) {
        try {
          playSound()
        } catch (error) {
          console.warn('Could not play sound:', error)
        }

        // Execute custom completion callback if provided
        if (onCompleteCallback) {
          onCompleteCallback()
        }

        get().stopTimer()
        set({ isRest: false })
        return
      }

      set({ timeRest: timeRest - 1 })
    }, 1000)

    set({ intervalId, isPaused: false })
  },

  resetTimer: () => {
    const { stopTimer } = get()

    stopTimer()
    set({
      timeRest: REST_BETWEEN_SETS,
      isRest: false,
      isPaused: false,
      onCompleteCallback: null
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
