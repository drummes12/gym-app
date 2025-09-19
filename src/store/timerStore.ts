import { REST_BETWEEN_SETS } from '@/constants'
import { create } from 'zustand'
import { playSound } from '@/services/audioNotification'

interface TimerStoreState {
  // Timer state
  isRest: boolean
  isPaused: boolean
  timeRest: number
  intervalId: number | null
  onCompleteCallback: (() => void) | null
  
  // Timestamp validation for rest timer
  restStartTime: number | null
  restDuration: number
  restPausedTime: number // Total time paused

  // Control timer state (independent background timer)
  controlTime: number
  controlIntervalId: number | null
  isControlPaused: boolean
  
  // Timestamp validation for control timer
  controlStartTime: number | null
  controlPausedTime: number // Total time paused
  controlLastPauseTime: number | null

  // Timer actions
  setIsRest: (isRest: boolean) => void
  startTimer: (duration?: number, onComplete?: () => void) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  resetTimer: () => void

  // Control timer actions
  startControlTimer: () => void
  pauseControlTimer: () => void
  resumeControlTimer: () => void
  stopControlTimer: () => void
  resetControlTimer: () => void

  // Timer utilities
  formatTime: (seconds: number) => string
  getTimeRemaining: () => number
  
  // Validation utilities
  validateRestTimer: () => void
  validateControlTimer: () => void
}

export const useTimerStore = create<TimerStoreState>((set, get) => ({
  // Initial state
  isRest: false,
  isPaused: false,
  timeRest: REST_BETWEEN_SETS,
  intervalId: null,
  onCompleteCallback: null,
  
  // Timestamp validation initial state
  restStartTime: null,
  restDuration: 0,
  restPausedTime: 0,

  // Control timer initial state
  controlTime: 0,
  controlIntervalId: null,
  isControlPaused: false,
  
  // Control timer timestamp validation initial state
  controlStartTime: null,
  controlPausedTime: 0,
  controlLastPauseTime: null,

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

    const now = Date.now()
    set({
      timeRest: duration,
      isRest: true,
      onCompleteCallback: onComplete || null,
      restStartTime: now,
      restDuration: duration,
      restPausedTime: 0
    })

    const intervalId = window.setInterval(() => {
      const { validateRestTimer, timeRest, onCompleteCallback } = get()
      
      // Validate timer against real time
      validateRestTimer()
      
      const currentState = get()

      if (currentState.timeRest <= 1) {
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

      // Only decrement if we haven't already updated via validation
      if (currentState.timeRest === timeRest) {
        set({ timeRest: timeRest - 1 })
      }
    }, 1000)

    set({ intervalId })
  },

  stopTimer: () => {
    const { intervalId } = get()

    if (intervalId) {
      clearInterval(intervalId)
      set({ intervalId: null })
    }
    set({ 
      isPaused: false, 
      onCompleteCallback: null,
      restStartTime: null,
      restDuration: 0,
      restPausedTime: 0
    })
  },

  pauseTimer: () => {
    const { intervalId, restStartTime } = get()

    if (intervalId) {
      clearInterval(intervalId)
      
      // Calculate and store paused time
      if (restStartTime) {
        const now = Date.now()
        const { restPausedTime } = get()
        set({ 
          intervalId: null, 
          isPaused: true,
          restPausedTime: restPausedTime + (now - restStartTime)
        })
      } else {
        set({ intervalId: null, isPaused: true })
      }
    }
  },

  resumeTimer: () => {
    const { isPaused, timeRest } = get()

    if (!isPaused) return

    // Reset start time to current time when resuming
    const now = Date.now()
    set({ restStartTime: now })

    const intervalId = window.setInterval(() => {
      const { validateRestTimer, timeRest, onCompleteCallback } = get()
      
      // Validate timer against real time
      validateRestTimer()
      
      const currentState = get()

      if (currentState.timeRest <= 1) {
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

      // Only decrement if we haven't already updated via validation
      if (currentState.timeRest === timeRest) {
        set({ timeRest: timeRest - 1 })
      }
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
      onCompleteCallback: null,
      restStartTime: null,
      restDuration: 0,
      restPausedTime: 0
    })
  },

  // Control timer actions
  startControlTimer: () => {
    const { stopControlTimer } = get()
    
    // Clear any existing control timer
    stopControlTimer()
    
    const now = Date.now()
    set({ 
      controlTime: 0,
      isControlPaused: false,
      controlStartTime: now,
      controlPausedTime: 0,
      controlLastPauseTime: null
    })

    const intervalId = window.setInterval(() => {
      const { isControlPaused, validateControlTimer } = get()
      
      if (!isControlPaused) {
        // Validate timer against real time
        validateControlTimer()
        
        const currentState = get()
        // Only increment if we haven't already updated via validation
        if (currentState.controlTime === get().controlTime) {
          set((state) => ({ 
            controlTime: state.controlTime + 1 
          }))
        }
      }
    }, 1000)

    set({ controlIntervalId: intervalId })
  },

  pauseControlTimer: () => {
    const now = Date.now()
    set({ 
      isControlPaused: true,
      controlLastPauseTime: now
    })
  },

  resumeControlTimer: () => {
    const { controlLastPauseTime } = get()
    const now = Date.now()
    
    if (controlLastPauseTime) {
      const pauseDuration = now - controlLastPauseTime
      set((state) => ({ 
        isControlPaused: false,
        controlPausedTime: state.controlPausedTime + pauseDuration,
        controlLastPauseTime: null
      }))
    } else {
      set({ isControlPaused: false })
    }
  },

  stopControlTimer: () => {
    const { controlIntervalId } = get()
    
    if (controlIntervalId) {
      clearInterval(controlIntervalId)
    }
    
    set({ 
      controlIntervalId: null,
      isControlPaused: false,
      controlStartTime: null,
      controlPausedTime: 0,
      controlLastPauseTime: null
    })
  },

  resetControlTimer: () => {
    const { stopControlTimer } = get()
    
    stopControlTimer()
    set({ 
      controlTime: 0,
      isControlPaused: false,
      controlStartTime: null,
      controlPausedTime: 0,
      controlLastPauseTime: null
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
  },

  // Validation functions
  validateRestTimer: () => {
    const { restStartTime, restDuration, restPausedTime, isPaused } = get()
    
    if (!restStartTime || isPaused) return
    
    const now = Date.now()
    const elapsedMs = now - restStartTime - restPausedTime
    const elapsedSeconds = Math.floor(elapsedMs / 1000)
    const expectedTimeRemaining = Math.max(0, restDuration - elapsedSeconds)
    
    // If there's a significant difference (more than 2 seconds), sync with real time
    const currentTimeRest = get().timeRest
    if (Math.abs(currentTimeRest - expectedTimeRemaining) > 2) {
      console.warn(`Timer sync: Expected ${expectedTimeRemaining}s, had ${currentTimeRest}s`)
      set({ timeRest: expectedTimeRemaining })
    }
  },

  validateControlTimer: () => {
    const { controlStartTime, controlPausedTime, isControlPaused } = get()
    
    if (!controlStartTime) return
    
    const now = Date.now()
    let elapsedMs = now - controlStartTime - controlPausedTime
    
    // If currently paused, don't count time since last pause
    if (isControlPaused) {
      const { controlLastPauseTime } = get()
      if (controlLastPauseTime) {
        elapsedMs = controlLastPauseTime - controlStartTime - controlPausedTime
      }
    }
    
    const elapsedSeconds = Math.floor(elapsedMs / 1000)
    const currentControlTime = get().controlTime
    
    // If there's a significant difference (more than 2 seconds), sync with real time
    if (Math.abs(currentControlTime - elapsedSeconds) > 2) {
      console.warn(`Control timer sync: Expected ${elapsedSeconds}s, had ${currentControlTime}s`)
      set({ controlTime: elapsedSeconds })
    }
  }
}))

// Cleanup timer on unmount
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useTimerStore.getState().stopTimer()
  })
}
