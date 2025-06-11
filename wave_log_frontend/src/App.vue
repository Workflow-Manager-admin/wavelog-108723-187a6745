<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="wavelog-shell">
    <header class="wavelog-header">
      <div class="logo-brand">
        <!-- Replace below SVG with an ocean-stylized SVG later for full theme -->
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" fill="#2EC4B6" stroke="#4F8FBF" stroke-width="2"/>
          <path d="M5 30 Q20 20 35 30" stroke="#4F8FBF" stroke-width="2" fill="none"/>
          <ellipse cx="20" cy="16" rx="8" ry="5" fill="#F5E9DA" />
        </svg>
        <span class="brand-title">WaveLog</span>
      </div>
      <nav class="wavelog-nav">
        <RouterLink to="/" class="nav-link" active-class="nav-active">
          <!-- Home/History icon: wave -->
          <span class="nav-icon" aria-label="Home">
            🌊
          </span>
          <span>Wave History</span>
        </RouterLink>
        <RouterLink to="/log" class="nav-link" active-class="nav-active">
          <!-- Log icon: surfboard -->
          <span class="nav-icon" aria-label="Log New Session">
            🏄‍♂️
          </span>
          <span>Log Session</span>
        </RouterLink>
        <RouterLink to="/stats" class="nav-link" active-class="nav-active">
          <!-- Stats icon: beach umbrella or sun -->
          <span class="nav-icon" aria-label="Stats Dashboard">
            🏖️
          </span>
          <span>Stats Dashboard</span>
        </RouterLink>
      </nav>
      <div class="notifications-slot">
        <!-- Notifications: seashell bell -->
        <slot name="notifications">
          <span class="notif-icon" aria-label="Notifications">🐚</span>
        </slot>
      </div>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#wavelog-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #e0f7fa 0%, #b8e0ef 70%, #f5e9da 100%);
}
.wavelog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 2rem 0.2rem 1.4rem;
  background: #4F8FBF;
  color: #fff;
  border-bottom: 2px solid #2EC4B6;
  box-shadow: 0 3px 10px rgba(79,143,191,0.08);
}
.logo-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.brand-title {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 1px 8px #2EC4B680;
}
.wavelog-nav {
  display: flex;
  gap: 1.6rem;
  background: rgba(46,196,182,.08);
  border-radius: 20px;
  padding: 0.3rem 1.4rem;
}
.nav-link {
  display: flex;
  align-items: center;
  font-size: 1.08rem;
  gap: 0.5em;
  text-decoration: none;
  color: #fffad4;
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border 0.22s;
  font-weight: 600;
  padding: 0.25em 0.5em;
}
.nav-link:hover, .nav-link:focus {
  color: #2EC4B6;
  border-bottom: 2px solid #F5E9DA;
  background: #ffffff22;
  border-radius: 8px 8px 0 0;
}
.nav-active {
  color: #fff;
  border-bottom: 2px solid #2EC4B6;
  background: #2EC4B640;
}
.nav-icon {
  font-size: 1.45rem;
  line-height: 1;
  margin-right: 0.2em;
  filter: drop-shadow(0 1px 2px #033f5a28);
}

.notifications-slot {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 2.6em;
  font-size: 1.2em;
  justify-content: flex-end;
}
.notif-icon {
  font-size: 1.45rem;
}

/* Content styling */
.main-content {
  flex: 1 1 0;
  padding: 2rem 0.6rem 2.3rem 0.6rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 750px) {
  .wavelog-header {
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.65rem 0.2rem;
    align-items: stretch;
  }
  .brand-title {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0.4rem;
  }
  .wavelog-nav {
    justify-content: center;
    padding: 0.2rem 0.5rem;
    gap: 0.6rem;
    margin: 0.2rem 0;
  }
  .main-content {
    padding: 1rem 0.3rem 1.3rem 0.4rem;
  }
}
</style>
