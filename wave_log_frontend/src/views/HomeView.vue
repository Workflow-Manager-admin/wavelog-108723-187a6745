<script setup lang="ts">
// Placeholder HomeView for WaveLog main screen with ocean theme and navigable "+ Log New Session" button

import { useRouter } from 'vue-router'
const router = useRouter()
function goToLogSession() {
  router.push('/log')
}
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
    <div class="session-list-placeholder">
      <p>Past surf sessions will be shown here as cards, each sparkling with mood icons.</p>
      <div class="session-placeholder-card">No sessions yet — go log your first ride! 🏄‍♂️</div>
    </div>
  </div>
</template>

<style scoped>
.wave-home-view {
  padding: 1.8rem 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #b8e0efbb 80%, #f5e9da80 100%);
  border-radius: 18px;
  padding: 0.7rem 1rem 0.7rem 1.1rem;
  box-shadow: 0 4px 12px #4F8FBF16;
  margin-bottom: 0.8rem;
}
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
.session-list-placeholder {
  text-align: center;
  color: #4689a2;
  margin-top: 1rem;
}
.session-placeholder-card {
  display: inline-block;
  margin-top: 1.3rem;
  background: #e0f7fa88;
  border: 1.2px dashed #2EC4B6;
  border-radius: 18px;
  color: #555;
  font-size: 1.05em;
  padding: 1.4em 2.2em;
  min-width: 170px;
}
@media (max-width: 600px) {
  .home-header {
    flex-direction: column;
    gap: 0.6em;
    padding: 0.7rem 0.8rem;
  }
}
</style>
