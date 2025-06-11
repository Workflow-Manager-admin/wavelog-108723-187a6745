<script setup lang="ts">
// Placeholder for SessionDetailView with card layout and mood highlight.
// No unused variables.
</script>

<template>
  <div class="session-detail-view">
    <h1>
      <span class="sunset-emoji" aria-label="Wave">🌅</span>
      Session Detail
    </h1>
    <div class="session-detail-card">
      <div>
        <b class="session-id-label">Session ID:</b>
        <span class="session-id-value">{{ $route.params.id }}</span>
      </div>
      <div class="details-placeholder">
        <span>This is where all the session data will be displayed—date, spot, board, <b>mood</b>, notes, and more.</span>
      </div>
      <div class="mood-bubble">😀</div>
      <span style="font-size:.97em;color:#4F8FBFAA;line-height:1.2;">Edit and delete options coming soon!</span>
    </div>
  </div>
</template>

<style scoped>
.session-detail-view {
  padding: 2rem 0.3rem 2rem 0.3rem;
  text-align: center;
}
.session-detail-view h1 {
  margin-bottom: 1.3em;
  font-size: 2em;
  letter-spacing: .06em;
  color: #4F8FBF;
}
.sunset-emoji {
  font-size: 1.2em;
  margin-right: .3em;
  vertical-align: middle;
}
.session-detail-card {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 16px;
  background: linear-gradient(96deg, #b8e0ef44 80%, #f5e9da55 100%);
  border: 1.2px solid #2EC4B6;
  box-shadow: 0 1px 8px #2EC4B620;
  padding: 1.5em 1.6em 1.2em 1.6em;
  margin-bottom: 2em;
  align-items: center;
}
.session-id-label {
  color: #2EC4B6;
  margin-right: 0.4em;
}
.session-id-value {
  color: #555;
}
.details-placeholder {
  color: #26667a;
  margin-top: 0.4em;
}
.mood-bubble {
  display: inline-block;
  background: #ffe6ac;
  border: 1.1px solid #FFD166;
  border-radius: 30px;
  color: #666;
  font-size: 1.52em;
  padding: 0.15em 0.6em 0.12em 0.6em;
  font-weight: 700;
  margin-top: 0.7em;
  margin-bottom: 0.2em;
  box-shadow: 0 1px 3px #FFD16633;
}
</style>
