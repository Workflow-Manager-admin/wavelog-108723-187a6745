<script setup lang="ts">
// PUBLIC_INTERFACE
defineProps<{
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}>()
</script>
<template>
  <div
    class="wavelog-notification-banner ocean-theme"
    :class="type ? `banner-${type}` : 'banner-info'"
    v-if="message"
    role="alert"
  >
    <span class="notif-icon" aria-label="Notification">🐚</span>
    <span class="notif-message">{{ message }}</span>
  </div>
</template>
<style scoped>
.wavelog-notification-banner {
  display: flex;
  align-items: center;
  gap: .8em;
  font-weight: 600;
  background: #e0f7fa;
  border-radius: 12px;
  border: 1.4px solid #2EC4B6;
  color: #138fa0;
  padding: .39em 1.15em;
  margin-bottom: 1em;
  font-size: 1em;
  box-shadow: 0 1px 5px #2EC4B620;
  position: relative;
  z-index: 10;
  min-height: 2.1em;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.banner-success { background: #b1edd0; color: #287556; border-color: #3cd673; }
.banner-error   { background: #ffe2cc; color: #a3472f; border-color: #ff7546; }
.banner-warning { background: #fffae3; color: #c5b625; border-color: #ffda2b; }
.banner-info    { background: #e0f7fa; color: #138fa0; border-color: #2EC4B6; }
.notif-icon {
  font-size: 1.4em;
  vertical-align: middle;
}
.notif-message {
  flex: 1;
}
</style>
