<script setup lang="ts">
// PUBLIC_INTERFACE
defineProps<{
  initialData?: object // replace with more specific types when ready
}>()
</script>

<template>
  <form class="wavelog-log-session-form ocean-theme">
    <div class="form-header">
      <span>📝</span> <b>Log New Session</b>
    </div>
    <div class="form-group ocean-form-row">
      <!-- Placeholders for input fields -->
      <input type="text" placeholder="Spot" class="ocean-input" disabled />
      <input type="date" class="ocean-input" disabled />
      <input type="text" placeholder="Board" class="ocean-input" disabled />
      <input type="number" placeholder="Waves" class="ocean-input" disabled />
      <!-- future: Icon pickers/dropdowns, mood, notes -->
      <textarea placeholder="Mood/Notes..." class="ocean-input" disabled></textarea>
    </div>
    <div class="form-footer">
      <button class="sea-btn" disabled>Save Session</button>
    </div>
    <div class="ocean-form-placeholder">
      (Form interaction coming soon!)
    </div>
  </form>
</template>

<style scoped>
.wavelog-log-session-form {
  background: linear-gradient(90deg, #e0f7fa55 80%, #f5e9da60 100%);
  border: 1.2px solid #4F8FBF;
  border-radius: 18px;
  padding: 1.7em 1.2em 1.6em 1.2em;
  box-shadow: 0 1px 10px #2EC4B611;
  max-width: 420px;
  margin: 0 auto 1.3em auto;
}
.form-header {
  font-size: 1.2em;
  color: #20798b;
  margin-bottom: .7em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: .7em;
}
.ocean-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 0.9em;
}
.ocean-input {
  background: #e0f7fa26;
  border: 1px solid #2EC4B680;
  padding: 0.6em;
  border-radius: 8px;
  min-width: 40%;
  flex: 1 0 120px;
  margin-bottom: .3em;
}
.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.7em;
}
.sea-btn {
  background: #2EC4B6;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  padding: 0.2em 1.2em;
  transition: background 0.18s;
  cursor: not-allowed;
}
.ocean-form-placeholder {
  color: #6fbac9;
  text-align: center;
  margin-top: .7em;
  font-size: .98em;
}
</style>
