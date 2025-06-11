<script setup lang="ts">
// PUBLIC_INTERFACE
defineProps<{
  filters?: object // future: { spot: string, board: string, mood: string }
}>()
</script>

<template>
  <div class="wavelog-filter-bar ocean-theme">
    <!-- Placeholder input/selects for filtering by fields (spot, board, mood) -->
    <select disabled class="ocean-filter-input"><option>Spot</option></select>
    <select disabled class="ocean-filter-input"><option>Board</option></select>
    <select disabled class="ocean-filter-input"><option>Mood</option></select>
    <button disabled class="sea-btn">Apply</button>
    <span class="filter-placeholder">(Filters coming soon!)</span>
  </div>
</template>
<style scoped>
.wavelog-filter-bar {
  display: flex;
  gap: .8em;
  align-items: center;
  background: linear-gradient(99deg, #e0f7fa22 80%, #f5e9da25 100%);
  border-radius: 13px;
  padding: .63em 1.4em;
  margin-bottom: 0.85em;
  border: 1px solid #2EC4B643;
}
.ocean-filter-input {
  font-size: 1em;
  background: #e0f7fa44;
  border: 1px solid #4F8FBF33;
  border-radius: 8px;
  color: #217390;
  padding: 0.29em 0.7em;
  min-width: 70px;
}
.sea-btn {
  background: #4F8FBF;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  padding: 0.18em 1.12em;
  transition: background 0.18s;
  box-shadow: 0 0 4px #2EC4B63c;
  cursor: not-allowed;
}
.filter-placeholder {
  margin-left: 1.5em;
  color: #88b5c1;
  font-size: .97em;
}
</style>
