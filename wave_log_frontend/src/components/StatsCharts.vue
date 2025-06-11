<script setup lang="ts">
// PUBLIC_INTERFACE
defineProps<{
  statsData?: object // Will specify structure when integrating with real stats
}>()
</script>

<template>
  <div class="wavelog-stats-charts ocean-theme">
    <!-- Placeholders for surf stats charts -->
    <div class="chart ocean-chart-placeholder">📊 Spot Stats Coming Soon</div>
    <div class="chart ocean-chart-placeholder">🏄‍♂️ Board Usage %</div>
    <div class="chart ocean-chart-placeholder">😊 Mood Trends</div>
    <div class="stats-charts-placeholder">(Charts powered by the ocean... coming soon!)</div>
  </div>
</template>

<style scoped>
.wavelog-stats-charts {
  display: flex;
  flex-direction: column;
  gap: 1.1em;
  align-items: center;
  background: linear-gradient(100deg, #b8e0ef33 80%, #f5e9da44 100%);
  border-radius: 16px;
  border: 1.1px dashed #2EC4B6;
  padding: 1.4em 1.8em 1.4em 1.8em;
}
.ocean-chart-placeholder {
  background: #e0f7fa55;
  border-radius: 10px;
  color: #19708f;
  font-weight: 600;
  padding: 1.05em 2.5em;
  margin-bottom: .2em;
  box-shadow: 0 2px 8px #2EC4B610;
}
.stats-charts-placeholder {
  margin-top: 0.7em;
  color: #538fa2;
  font-size: 1em;
  font-style: italic;
}
</style>
