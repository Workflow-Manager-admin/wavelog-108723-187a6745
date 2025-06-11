<script setup lang="ts">
import type { Session } from '@/stores/sessionStore'
// PUBLIC_INTERFACE
defineProps<{
  session?: Session
}>()
</script>

<template>
  <div class="wavelog-session-card ocean-theme">
    <div class="session-header">
      <span class="session-date">{{ session?.date }}</span>
      <span class="mood-emoji">{{ session?.mood || "🌊" }}</span>
    </div>
    <div class="session-main-info">
      <div class="spot-name">{{ session?.spot }}</div>
      <div class="board-type">{{ session?.board }}</div>
      <div class="wave-count">Waves: {{ session?.waves }}</div>
    </div>
    <!-- Optionally, actions section could be implemented later -->
    <!-- <div class="session-actions">
      <button class="view-btn sea-btn">View</button>
    </div> -->
  </div>
</template>

<style scoped>
.wavelog-session-card {
  background: linear-gradient(95deg, #e0f7fa 80%, #f5e9da 100%);
  border: 1.3px solid #2EC4B6;
  border-radius: 18px;
  box-shadow: 0 2px 10px #2EC4B620;
  padding: 1.3em 1.5em 1.1em 1.5em;
  margin-bottom: 1.2em;
  color: #28667c;
  min-width: 170px;
}
.session-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: .4em;
  font-size: 1.12em;
  font-weight: 700;
}
.mood-emoji {
  font-size: 1.3em;
}
.session-main-info {
  display: flex;
  gap: 1em;
  font-size: 1em;
  align-items: center;
  margin-bottom: .6em;
}
.session-actions {
  display: flex;
  gap: .7em;
  justify-content: flex-end;
}
.sea-btn {
  background: #4F8FBF;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  padding: 0.26em 1em;
  transition: background 0.2s;
  box-shadow: 0 0 4px #2EC4B63a;
  cursor: pointer;
}
.sea-btn:hover {
  background: #2EC4B6;
}
</style>
