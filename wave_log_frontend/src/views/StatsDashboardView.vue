<script setup lang="ts">
// StatsDashboardView fetches & derives statistics and passes data to StatsCharts (ocean vibe).
import { computed } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import StatsCharts from '@/components/StatsCharts.vue'

// Fetch all sessions from Pinia store
const sessionStore = useSessionStore()
const sessions = computed(() => sessionStore.sessions)

// --- Stats calculations ---

// 1. Most Visited Spot (by session count)
const mostVisitedSpot = computed(() => {
  const counts: {[spot: string]: number} = {}
  sessions.value.forEach(s => {
    counts[s.spot] = (counts[s.spot] ?? 0) + 1
  })
  let max = 0; let top = ''
  Object.entries(counts).forEach(([spot, count]) => {
    if (count > max) { max = count; top = spot }
  })
  return { spot: top, count: max }
})

// 2. Board Usage Breakdown (returns array: [{board, count}])
const boardUsage = computed(() => {
  const boardCounts: {[board: string]: number} = {}
  sessions.value.forEach(s => {
    boardCounts[s.board] = (boardCounts[s.board] ?? 0) + 1
  })
  // Convert to array and sort descending count
  return Object.entries(boardCounts)
    .map(([board, count]) => ({ board, count }))
    .sort((a, b) => b.count - a.count)
})

// 3. Mood Trend Over Time (date ASC list: [{date, mood}])
const moodTrend = computed(() => {
  // Extracts [{date, mood}], sorted by date ascending
  return [...sessions.value]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(s => ({ date: s.date, mood: s.mood }))
})

// Compose data structure to pass to StatsCharts
const statsData = computed(() => ({
  mostVisitedSpot: mostVisitedSpot.value,
  boardUsage: boardUsage.value,
  moodTrend: moodTrend.value,
  sessionCount: sessions.value.length
}))
</script>

<template>
  <div class="stats-dashboard-view">
    <h1>
      <span class="beach-emoji" aria-label="Stats Dashboard">🏖️</span>
      Surf Stats Dashboard
    </h1>
    <StatsCharts :statsData="statsData" />
  </div>
</template>

<style scoped>
.stats-dashboard-view {
  padding: 2rem 0.3rem 2rem 0.3rem;
  text-align: center;
}
.stats-dashboard-view h1 {
  font-size: 2em;
  margin-bottom: 1.4em;
  color: #157c7c;
}
.beach-emoji {
  font-size: 1.35em;
  margin-right: .23em;
  vertical-align: middle;
}
.dashboard-placeholder {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3em;
}
.chart-placeholder {
  background: linear-gradient(100deg, #e0f7fa90 80%, #f5e9da70 100%);
  border: 1.2px dashed #2EC4B6;
  border-radius: 13px;
  color: #297393;
  font-size: 1.06em;
  font-weight: 600;
  padding: 1.1em 2.7em;
  margin-bottom: 0.45em;
  min-width: 190px;
}
.stats-note {
  margin-top: 1em;
  color: #49738a;
  font-size: 1em;
  font-style: italic;
}
</style>
