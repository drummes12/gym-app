import { create } from 'zustand'

interface UIStoreState {
  // Loading states
  loading: boolean
  
  // Dialog states
  dialogs: {
    exerciseDetails: boolean
    workoutComplete: boolean
    confirmReset: boolean
  }

  // Navigation state
  currentPage: string | null
  
  // Notification state
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>

  // Actions
  setLoading: (loading: boolean) => void
  
  // Dialog actions
  openDialog: (dialogName: keyof UIStoreState['dialogs']) => void
  closeDialog: (dialogName: keyof UIStoreState['dialogs']) => void
  closeAllDialogs: () => void
  
  // Navigation actions
  setCurrentPage: (page: string) => void
  
  // Notification actions
  addNotification: (notification: Omit<UIStoreState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIStoreState>((set, get) => ({
  // Initial state
  loading: false,
  
  dialogs: {
    exerciseDetails: false,
    workoutComplete: false,
    confirmReset: false
  },

  currentPage: null,
  notifications: [],

  // Actions
  setLoading: (loading: boolean) => {
    set({ loading })
  },

  // Dialog actions
  openDialog: (dialogName) => {
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [dialogName]: true
      }
    }))
  },

  closeDialog: (dialogName) => {
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [dialogName]: false
      }
    }))
  },

  closeAllDialogs: () => {
    set({
      dialogs: {
        exerciseDetails: false,
        workoutComplete: false,
        confirmReset: false
      }
    })
  },

  // Navigation actions
  setCurrentPage: (page: string) => {
    set({ currentPage: page })
  },

  // Notification actions
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      const duration = notification.duration || 5000
      setTimeout(() => {
        get().removeNotification(id)
      }, duration)
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },

  clearNotifications: () => {
    set({ notifications: [] })
  }
}))