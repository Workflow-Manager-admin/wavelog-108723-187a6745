import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationBanner = {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timeoutMs?: number // optional auto-dismiss
}

// PUBLIC_INTERFACE
export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref<NotificationBanner[]>([
    {
      id: 'fake1',
      message: "Welcome to WaveLog! Log a surf session to get started.",
      type: 'info',
      timeoutMs: 8000
    }
  ])

  // PUBLIC_INTERFACE
  function addNotification(notification: Omit<NotificationBanner, 'id'>) {
    const id = Math.random().toString(36).substr(2, 8)
    notifications.value.push({ ...notification, id })
  }

  // PUBLIC_INTERFACE
  function dismissNotification(id: string) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  // PUBLIC_INTERFACE
  function clearAll() {
    notifications.value = []
  }

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll
  }
})
