<script setup lang="ts">
// Placeholder for StatsDashboardView with on-theme, cheerful ocean dashboard style
</script>

<template>
  <div class="stats-dashboard-view">
    <h1>
      <span class="beach-emoji" aria-label="Stats Dashboard">🏖️</span>
      Surf Stats Dashboard
    </h1>
    <div class="dashboard-placeholder">
      <div class="chart-placeholder">
        <span>📊</span> Most Visited Spot
      </div>
      <div class="chart-placeholder">
        <span>🏄‍♂️</span> Board Usage %<br>
      </div>
      <div class="chart-placeholder">
        <span>😊</span> Mood Trends Over Time
      </div>
      <div class="stats-note">
        Visual surf stats and trend charts will be here soon!
      </div>
    </div>
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
