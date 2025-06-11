<script setup lang="ts">
import LogSessionForm from '@/components/LogSessionForm.vue'
</script>

<template>
  <div class="log-session-view">
    <h1>
      <span class="surf-emoji" aria-label="Surfboard">🏄‍♂️</span>
      Log New Surf Session
    </h1>
    <p class="session-desc">
      Record your latest ride &mdash; input details like <b>date</b>, <b>spot</b>, <b>board</b>, <b>wave count</b>, <b>mood</b>, notes, and conditions.
    </p>
    <div class="the-form-row">
      <LogSessionForm />
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
.session-desc {
  color: #4689a2;
  margin-bottom: 1.8em;
  font-size: 1.05em;
}
.surf-emoji {
  font-size: 1.4em;
  vertical-align: middle;
  margin: 0 0.3em 0 0;
}
.the-form-row {
  display: flex;
  justify-content: center;
}
</style>
