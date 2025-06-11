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
 * These cover different dates, spots, boards, moods, wave counts, swell, wind, tide, and notes for robust demo/stats.
 */
const SAMPLE_SESSIONS: Session[] = [
  {
    id: 's1',
    date: '2024-06-19',
    spot: 'Malibu',
    board: 'Shortboard',
    waves: 14,
    mood: '😀',
    notes: 'Clean, peaky sunset glass-off. Shared an epic set with friends. Swell: Medium, Wind: Calm, Tide: High'
  },
  {
    id: 's2',
    date: '2024-06-18',
    spot: 'Trestles',
    board: 'Longboard',
    waves: 10,
    mood: '🤙',
    notes: 'Long mellow rides and good company. Dolphins spotted! Swell: Small, Wind: Offshore, Tide: Mid'
  },
  {
    id: 's3',
    date: '2024-06-17',
    spot: 'Huntington Beach',
    board: 'Fish',
    waves: 7,
    mood: '😎',
    notes: 'Peaky beachbreak, windy but fun. Couple surprise barrels. Swell: Medium, Wind: Onshore, Tide: Low'
  },
  {
    id: 's4',
    date: '2024-06-14',
    spot: 'Malibu',
    board: 'Shortboard',
    waves: 9,
    mood: '🌊',
    notes: 'Zen solo dawn patrol—clean lined-up sets. Swell: Small, Wind: Calm, Tide: Mid'
  },
  {
    id: 's5',
    date: '2024-06-12',
    spot: 'Trestles',
    board: 'Fish',
    waves: 12,
    mood: '🏄‍♂️',
    notes: 'Found a secret peak, best rides in weeks! Swell: Large, Wind: Offshore, Tide: High'
  },
  {
    id: 's6',
    date: '2024-06-10',
    spot: 'Huntington Beach',
    board: 'Longboard',
    waves: 5,
    mood: '😴',
    notes: 'Slow day, tired after work but worth it. Swell: Tiny, Wind: Calm, Tide: High'
  },
  {
    id: 's7',
    date: '2024-06-07',
    spot: 'Malibu',
    board: 'Longboard',
    waves: 15,
    mood: '😀',
    notes: 'Classic Malibu! Endless nose rides, sunny all morning. Swell: Medium, Wind: Sideoff, Tide: Mid'
  },
  {
    id: 's8',
    date: '2024-06-05',
    spot: 'Trestles',
    board: 'Shortboard',
    waves: 13,
    mood: '😡',
    notes: 'Crowded lineup, some localism... but scored a couple bombs. Swell: Large, Wind: Swell, Tide: Low'
  },
  {
    id: 's9',
    date: '2024-06-03',
    spot: 'Huntington Beach',
    board: 'Fish',
    waves: 6,
    mood: '😎',
    notes: 'Just cruised, fun warmup. Swell: Small, Wind: Calm, Tide: Mid'
  },
  {
    id: 's10',
    date: '2024-05-31',
    spot: 'Malibu',
    board: 'Shortboard',
    waves: 10,
    mood: '🤙',
    notes: 'Evening sun and glassy conditions. Swell: Medium, Wind: Offshore, Tide: High'
  },
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
