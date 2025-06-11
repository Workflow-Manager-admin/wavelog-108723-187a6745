<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import LogSessionForm from '@/components/LogSessionForm.vue'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

// Fetch session ID from route (e.g., /session/:id)
const sessionId = computed(() => route.params.id as string)
const session = computed(() => 
  sessionStore.sessions.find(s => s.id === sessionId.value) || null
)

// Edit mode for embedded LogSessionForm
const editMode = ref(false)

// Used to trigger remount of LogSessionForm when switching out of edit mode
const logSessionFormKey = ref(0)

// Handler to start editing
function startEdit() {
  editMode.value = true
}



/**
 * Handler for saving edits.
 * @param editedSession - The updated session (with possible extra fields).
 */
function onEditSave(editedSession: SessionWithExtras) {
  // editedSession should have all fields merged; just update by id
  sessionStore.updateSession(sessionId.value, { ...editedSession })
  editMode.value = false
  logSessionFormKey.value++
}

// Handler for canceling edit
function onEditCancel() {
  editMode.value = false
  logSessionFormKey.value++
}

// Handler for delete
function deleteSession() {
  if (window.confirm('Are you sure you want to delete this surf session? This cannot be undone.')) {
    sessionStore.deleteSession(sessionId.value)
    router.push({ path: '/' })
  }
}

/**
 * Helper for displaying session fields safely.
 * Accepts string, number, undefined types (never uses any).
 */
function display(value: string | number | undefined) {
  return value !== undefined && value !== null && value !== '' ? value : '—'
}

type SessionBase = {
  id: string
  date: string
  spot: string
  board: string
  waves: number
  mood: string
  notes?: string
}
type SessionWithExtras = SessionBase & {
  swell?: string
  wind?: string
  tide?: string
}

function hasField(obj: Partial<SessionWithExtras>, key: keyof SessionWithExtras): boolean {
  // Checks if property exists and is non-empty string
  return typeof obj[key] === 'string' && !!obj[key]
}

function hasExtraFields(obj: Partial<SessionWithExtras>): boolean {
  return hasField(obj, 'swell') || hasField(obj, 'wind') || hasField(obj, 'tide')
}

// Optionally, dynamic mood highlight
function moodStyle(mood: string) {
  // A simple color mapping per mood emoji (extend as needed)
  switch (mood) {
    case '😀': return { background: '#e0ffc2', color: '#226800', borderColor: '#baff73' }
    case '😎': return { background: '#e0f3fa', color: '#1a4b68', borderColor: '#2ec4b6' }
    case '🤙': return { background: '#ffe6fa', color: '#740e75', borderColor: '#d68aff' }
    case '😴': return { background: '#f8fff2', color: '#556e82', borderColor: '#aad6b0' }
    case '😡': return { background: '#ffe6e4', color: '#b0031d', borderColor: '#ff7878' }
    case '🏄‍♂️': return { background: '#c8f2fe', color: '#176777', borderColor: '#4f8fbf' }
    case '🌊': return { background: '#e0f7fa', color: '#2288ab', borderColor: '#2ec4b6' }
    default: return { background: '#fffbe6', color: '#7a672c', borderColor: '#ffd166' }
  }
}
</script>

<template>
  <div class="session-detail-view">
    <h1>
      <span class="sunset-emoji" aria-label="Wave">🌅</span>
      Surf Session Detail
    </h1>
    <div v-if="session" class="session-detail-card">
      <div class="session-detail-header">
        <span class="session-date">
          <span title="Date">📅</span> {{ display(session.date) }}
        </span>
        <span class="mood-highlight" :style="moodStyle(session.mood)">
          <span v-if="session.mood" class="mood-emoji" :aria-label="'Mood ' + session.mood">{{ session.mood }}</span>
        </span>
      </div>
      <div class="session-detail-fields">
        <div>
          <b>Spot:</b>
          <span>🏝️ {{ display(session.spot) }}</span>
        </div>
        <div>
          <b>Board:</b>
          <span>🏄‍♂️ {{ display(session.board) }}</span>
        </div>
        <div>
          <b>Wave Count:</b>
          <span>🌊 {{ display(session.waves) }}</span>
        </div>
      </div>
      <div
        class="session-extra-fields"
        v-if="hasExtraFields(session)"
      >
        <div v-if="hasField(session, 'swell')">
          <b>Swell Size:</b>
          <span>🌊📏 {{ display((session as SessionWithExtras).swell) }}</span>
        </div>
        <div v-if="hasField(session, 'wind')">
          <b>Wind:</b>
          <span>🍃 {{ display((session as SessionWithExtras).wind) }}</span>
        </div>
        <div v-if="hasField(session, 'tide')">
          <b>Tide:</b>
          <span>🌅 {{ display((session as SessionWithExtras).tide) }}</span>
        </div>
      </div>
      <div v-if="session.notes" class="notes-highlight" title="Session Notes">
        <span class="notes-emoji" aria-label="Note">📝</span>
        <span class="session-notes">{{ session.notes }}</span>
      </div>
      <div class="session-detail-actions">
        <button class="edit-btn sea-btn" @click="startEdit">✏️ Edit</button>
        <button class="delete-btn sea-btn" @click="deleteSession">🗑️ Delete</button>
      </div>
    </div>
    <div v-else class="not-found">
      <span class="not-found-msg">Session not found.</span>
      <button class="sea-btn" @click="$router.push('/')">Back to Home</button>
    </div>
    <!-- Edit Form: shown only if in edit mode -->
    <div v-if="editMode" class="edit-form-popover">
      <div class="edit-form-header">
        <span>✏️ Edit Session</span>
        <button class="close-btn" @click="onEditCancel" title="Cancel Edit">❌</button>
      </div>
      <LogSessionForm
        :key="logSessionFormKey"
        :form-data="{ ...session }"
        :edit-mode="true"
        @submit.prevent="onEditSave"
        @cancel="onEditCancel"
      />
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
  color: #4F8FBF;
  letter-spacing: .06em;
}
.sunset-emoji {
  font-size: 1.20em;
  margin-right: .28em;
  vertical-align: middle;
}
.session-detail-card {
  display: flex;
  flex-direction: column;
  gap: 1.09em;
  max-width: 450px;
  margin: 0 auto 2em auto;
  border-radius: 18px;
  background: linear-gradient(96deg, #b8e0ef44 80%, #f5e9da55 100%);
  border: 1.5px solid #2EC4B6;
  box-shadow: 0 1px 10px #2EC4B611;
  padding: 1.6em 1.55em 1.2em 1.55em;
  align-items: stretch;
}
.session-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.16em;
  font-weight: 600;
  margin-bottom: -0.35em;
}
.session-date {
  color: #217390;
}
.mood-highlight {
  border-radius: 32px;
  border: 1.7px solid #ffd166;
  display: flex;
  align-items: center;
  padding: 0.16em 1.13em 0.13em 1.13em;
  font-size: 1.51em;
  font-weight: 800;
  min-width: 2.7em;
  margin-left: 0.33em;
  box-shadow: 0 2px 6px #ffd1663a;
}
.mood-emoji {
  filter: drop-shadow(0 1.8px 3px #ffd16658);
}
.session-detail-fields, .session-extra-fields {
  display: flex;
  justify-content: space-between;
  gap: 1.01em;
  flex-wrap: wrap;
  font-size: 1.09em;
}
.session-detail-fields > div,
.session-extra-fields > div {
  flex: 1 0 120px;
  text-align: left;
  padding: 0.17em 0.4em;
  color: #19708f;
}
.notes-highlight {
  margin-top: 0.18em;
  background: #fcf7e7;
  border: 1.1px solid #ffd166;
  border-radius: 14px;
  color: #7a5a24;
  font-size: 1.09em;
  box-shadow: 0 2px 7px #f5e9da2a;
  padding: 0.75em 1.13em 0.6em 1.13em;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 2.1em;
  gap: 0.7em;
  font-weight: 700;
}
.notes-emoji {
  font-size: 1.19em;
  margin-right: 0.22em;
  margin-top: .09em;
}
.session-notes {
  flex: 1 1 auto;
  word-break: break-word;
  font-style: italic;
  opacity: .98;
}
.session-detail-actions {
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  margin-top: 0.19em;
}
.sea-btn {
  background: linear-gradient(97deg, #2EC4B6 60%, #4F8FBF 100%);
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  padding: 0.19em 1.35em;
  font-size: 1.04em;
  cursor: pointer;
  outline: none;
  letter-spacing: 0.01em;
  box-shadow: 0 0 4.5px #2EC4B628;
  margin-left: 0.12em;
  transition: background 0.18s;
}
.sea-btn:hover {
  background: linear-gradient(100deg, #27afac 67%, #3579aa 100%);
}
.delete-btn {
  background: linear-gradient(97deg, #ffdede 57%, #ff7979 100%);
  color: #a22432;
}
.delete-btn:hover {
  background: #ff7979;
  color: #fff;
}
.edit-form-popover {
  background: #fff;
  border: 2.2px solid #2EC4B6;
  border-radius: 20px;
  box-shadow: 0 6px 32px #2EC4B630;
  max-width: 520px;
  margin: 2.3em auto 0 auto;
  padding: 1.3em 1.1em 1.05em 1.1em;
  z-index: 30;
  position: relative;
}
.edit-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
  font-weight: 700;
  color: #2EC4B6;
  margin-bottom: .5em;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.32em;
  color: #4f8fbf;
  cursor: pointer;
  margin-left: .7em;
}
.not-found {
  background: #fce6e6;
  border: 1.3px solid #ff7979;
  border-radius: 15px;
  padding: 1.3em 1.1em;
  color: #aa2939;
  max-width: 420px;
  margin: 2.1em auto 0 auto;
}
.not-found-msg {
  font-weight: 700;
  font-size: 1.11em;
}
@media (max-width: 620px) {
  .session-detail-card, .edit-form-popover {
    padding: 1.1em 0.4em 1.25em 0.4em;
    max-width: 99vw;
    font-size: 1em;
  }
  .session-detail-fields, .session-extra-fields {
    flex-direction: column;
    gap: 0.37em;
    font-size: 1em;
  }
}
</style>
