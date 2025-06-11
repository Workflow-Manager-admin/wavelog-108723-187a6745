import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Surf session object shape for demo.
 */
export type Session = {
  id: string
  date: string
  spot: string
  board: string
  waves: number
  mood: string
  notes?: string
}

/**
 * Sample sessions for development/testing.
 */
const SAMPLE_SESSIONS: Session[] = [
  {
    id: 's1',
    date: '2024-06-18',
    spot: 'Malibu',
    board: 'Shortboard',
    waves: 11,
    mood: '😀',
    notes: 'Glass off at sunset, mellow crowd. Fun rights all session.'
  },
  {
    id: 's2',
    date: '2024-06-16',
    spot: 'Huntington Beach',
    board: 'Fish',
    waves: 8,
    mood: '😎',
    notes: 'Peaky beachbreak but a bit windy. Fast drops, some barrels.'
  },
  {
    id: 's3',
    date: '2024-06-10',
    spot: 'Trestles',
    board: 'Longboard',
    waves: 14,
    mood: '🤙',
    notes: 'Super clean, long rides. Good company and dolphins!'
  }
]

// PUBLIC_INTERFACE
export const useSessionStore = defineStore('sessionStore', () => {
  const sessions = ref<Session[]>([...SAMPLE_SESSIONS])

  // Selected session for detail view
  const selectedSessionId = ref<string | null>(null)
  const selectedSession = computed(() =>
    sessions.value.find(s => s.id === selectedSessionId.value) || null
  )

  // PUBLIC_INTERFACE
  function addSession(session: Session) {
    sessions.value.unshift(session)
  }

  // PUBLIC_INTERFACE
  function updateSession(id: string, updates: Partial<Session>) {
    const idx = sessions.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      sessions.value[idx] = { ...sessions.value[idx], ...updates }
    }
  }

  // PUBLIC_INTERFACE
  function deleteSession(id: string) {
    sessions.value = sessions.value.filter(s => s.id !== id)
  }

  // PUBLIC_INTERFACE
  function selectSession(id: string) {
    selectedSessionId.value = id
  }

  // PUBLIC_INTERFACE
  function clearSelection() {
    selectedSessionId.value = null
  }

  // PUBLIC_INTERFACE
  function getSessionsFiltered(filters: { spot?: string, board?: string, mood?: string }) {
    return sessions.value.filter(s =>
      (!filters.spot || s.spot === filters.spot) &&
      (!filters.board || s.board === filters.board) &&
      (!filters.mood || s.mood === filters.mood)
    )
  }

  return {
    sessions,
    selectedSessionId,
    selectedSession,
    addSession,
    updateSession,
    deleteSession,
    selectSession,
    clearSelection,
    getSessionsFiltered
  }
})
