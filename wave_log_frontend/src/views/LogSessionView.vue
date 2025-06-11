<script setup lang="ts">
// Placeholder for LogSessionView with ocean-themed style and upbeat logging hints.
</script>

<template>
  <div class="log-session-view">
    <h1>
      <span class="surf-emoji" aria-label="Surfboard">🏄‍♂️</span>
      Log New Surf Session
    </h1>
    <p>
      Record your latest ride — input details like <b>date</b>, <b>spot</b>, <b>board</b>, <b>wave count</b>, <b>mood</b>, and notes.
    </p>
    <div class="log-form-placeholder">
      <span class="icon" aria-label="date">📅</span>
      <span class="icon" aria-label="location">🏝️</span>
      <span class="icon" aria-label="board">🏄‍♀️</span>
      <span class="icon" aria-label="wave count">🌊</span>
      <span class="icon" aria-label="mood">😃</span>
      <span class="icon" aria-label="notes">📝</span>
      <span style="margin-left:0.8em;font-size:.98em;vertical-align:middle;">... actual logger coming soon!</span>
    </div>
  </div>
</template>

<style scoped>
.log-session-view {
  padding: 2rem 0.4rem 2rem 0.4rem;
  text-align: center;
}
.log-session-view h1 {
  font-size: 2.0em;
  color: #20798b;
  letter-spacing: 1px;
  margin-bottom: .7em;
}
.surf-emoji {
  font-size: 1.4em;
  vertical-align: middle;
  margin: 0 0.3em 0 0;
}
.log-form-placeholder {
  border-radius: 16px;
  background: linear-gradient(90deg, #e0f7fa33 80%, #f5e9da40 100%);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.25em;
  margin-top: 1.3em;
  box-shadow: 0 1px 8px #2EC4B610;
  padding: 0.6em 1.5em 0.8em 1.5em;
  font-size: 1.3em;
  letter-spacing: .04em;
}
.icon {
  font-size: 1.2em;
  margin: 0 0.2em;
  vertical-align: middle;
}
</style>
