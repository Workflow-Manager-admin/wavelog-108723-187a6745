<script setup lang="ts">
// HomeView: Connects to Pinia's sessionStore and filterStore to display session cards and a filter bar.

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import { useFilterStore } from '@/stores/filterStore'
import { useNotificationStore } from '@/stores/notificationStore'

import FilterBar from '@/components/FilterBar.vue'
import SessionCard from '@/components/SessionCard.vue'

// --- Notification & Reminder Logic ---
const notificationStore = useNotificationStore()
const router = useRouter()
const sessionStore = useSessionStore()
const filterStore = useFilterStore()

function goToLogSession() {
  router.push('/log')
}

// Memoized: get filtered sessions array
const filteredSessions = computed(() =>
  sessionStore.getSessionsFiltered(filterStore.filters)
)

// --- Daily Reminder Banner logic ---
// When user enters HomeView, show reminder if no session today.
function checkDailyLogReminder() {
  const todayStr = new Date().toISOString().slice(0, 10)
  const hasSessionToday = sessionStore.sessions.some(s => s.date === todayStr)
  if (!hasSessionToday) {
    // Don't double-spam the same banner if it is already visible
    const reminderMsg = "Daily reminder: Log your surf session for today! 🐚"
    const alreadyShown = notificationStore.notifications.some(
      n =>
        n.type === 'info' &&
        n.message.startsWith("Daily reminder") // fuzzy match in case more than one
    )
    if (!alreadyShown) {
      notificationStore.addNotification({
        message: reminderMsg,
        type: 'info',
        timeoutMs: 10000
      })
    }
  }
}

onMounted(() => {
  checkDailyLogReminder()
})
</script>

<template>
  <div class="wave-home-view">
    <div class="home-header">
      <h1>
        <span class="wave-emoji" aria-label="Wave">🌊</span>
        Surf Session History
      </h1>
      <button class="log-session-btn" @click="goToLogSession">
        <span class="surf-emoji" aria-label="Surfboard">🏄‍♂️</span>
        + Log New Session
      </button>
    </div>
    <FilterBar :filters="filterStore.filters" />
    <div
      v-if="filteredSessions.length === 0"
      class="session-empty-placeholder"
    >
      <p>No sessions yet — go log your first ride!</p>
    </div>
    <div
      v-else
      class="session-list"
    >
      <SessionCard
        v-for="session in filteredSessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </div>
</template>

<style scoped>
.wave-home-view {
  padding: 1.8rem 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  min-height: 60vh;
}

/* Header Row */
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #b8e0efbb 80%, #f5e9da80 100%);
  border-radius: 18px;
  padding: 0.7rem 1rem 0.7rem 1.1rem;
  box-shadow: 0 4px 12px #4F8FBF16;
  margin-bottom: 0.6rem;
}

/* Icon styles */
.wave-emoji {
  font-size: 2em;
  margin-right: 0.4em;
  vertical-align: middle;
}
.log-session-btn {
  background: linear-gradient(95deg, #2EC4B6 60%, #4F8FBF 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.06em;
  border: none;
  border-radius: 14px;
  padding: 0.55em 1.12em;
  cursor: pointer;
  outline: none;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px #2ec4b625;
  display: flex;
  align-items: center;
  gap: 0.45em;
  transition: background 0.18s;
}
.log-session-btn:hover {
  background: linear-gradient(97deg, #27afac 67%, #3579aa 100%);
}
.surf-emoji {
  font-size: 1.36em;
}

.session-empty-placeholder {
  text-align: center;
  color: #4689a2;
  margin-top: 2.1rem;
  font-size: 1.14em;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  max-height: 520px;
  overflow-y: auto;
  margin-top: 0.4em;
  padding-bottom: 0.8em;
}

@media (max-width: 600px) {
  .home-header {
    flex-direction: column;
    gap: 0.6em;
    padding: 0.7rem 0.8rem;
  }
  .wave-home-view {
    gap: 1.1rem;
  }
}
</style>
