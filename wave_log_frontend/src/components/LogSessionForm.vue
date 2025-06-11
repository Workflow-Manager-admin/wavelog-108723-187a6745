<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import { useFilterStore } from '@/stores/filterStore'
import { useNotificationStore } from '@/stores/notificationStore'

const filterStore = useFilterStore()
const sessionStore = useSessionStore()
const notificationStore = useNotificationStore()
const router = useRouter()

// Ocean-appropriate sample options
const swellSizes = [
  { label: 'Tiny (0-1ft)', value: 'Tiny' },
  { label: 'Small (1-3ft)', value: 'Small' },
  { label: 'Medium (3-6ft)', value: 'Medium' },
  { label: 'Large (6-10ft)', value: 'Large' },
  { label: 'XL (10+ ft)', value: 'XL' }
]
const winds = [
  { label: 'Calm', value: 'Calm' },
  { label: 'Offshore', value: 'Offshore' },
  { label: 'Onshore', value: 'Onshore' },
  { label: 'Sideoff', value: 'Sideoff' },
  { label: 'Swelly', value: 'Swell' }
]
const tides = [
  { label: 'Low', value: 'Low' },
  { label: 'Mid', value: 'Mid' },
  { label: 'High', value: 'High' },
]

// Mood emoji options (use large emoji for picker)
const moods = [
  { emoji: '😀', label: 'Stoked' },
  { emoji: '😎', label: 'Chilled' },
  { emoji: '🤙', label: 'Flowy' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😡', label: 'Frustrated' },
  { emoji: '🏄‍♂️', label: 'Epic' },
  { emoji: '🌊', label: 'Zen' }
]

// Use Pinia-provided options for spots and boards
const spotOptions = computed(() => filterStore.options.spots)
const boardOptions = computed(() => filterStore.options.boards)

const todayStr = new Date().toISOString().slice(0, 10)

const form = ref({
  date: todayStr,
  spot: '',
  board: '',
  waves: '',
  mood: '',
  notes: '',
  swell: '',
  wind: '',
  tide: '',
})
const errors = ref<Record<string, string>>({
  date: '',
  spot: '',
  board: '',
  waves: '',
  mood: '',
  swell: '',
  wind: '',
  tide: '',
})

// Field validation logic
function validateField(field: string) {
  switch (field) {
    case 'date':
      errors.value.date = form.value.date ? '' : 'Please enter a date'
      break
    case 'spot':
      errors.value.spot = form.value.spot ? '' : 'Please select a surf spot'
      break
    case 'board':
      errors.value.board = form.value.board ? '' : 'Please select a board'
      break
    case 'waves':
      if (!form.value.waves) {
        errors.value.waves = 'Enter the number of waves'
      } else if (isNaN(Number(form.value.waves)) || Number(form.value.waves) < 1) {
        errors.value.waves = 'Waves must be at least 1'
      } else {
        errors.value.waves = ''
      }
      break
    case 'mood':
      errors.value.mood = form.value.mood ? '' : 'Select your mood'
      break
    case 'swell':
      errors.value.swell = form.value.swell ? '' : 'Select swell size'
      break
    case 'wind':
      errors.value.wind = form.value.wind ? '' : 'Select wind'
      break
    case 'tide':
      errors.value.tide = form.value.tide ? '' : 'Select tide'
      break
  }
}

// Validate all fields before submit
function validateAll() {
  ['date','spot','board','waves','mood','swell','wind','tide'].forEach(f => validateField(f))
  return Object.values(errors.value).every(val => !val)
}

// On field blur
function blurField(field: string) {
  validateField(field)
}

/**
 * PUBLIC_INTERFACE
 * Enhanced submitForm: shows notification banners on form error or success.
 */
function submitForm(e: Event) {
  e.preventDefault()
  // Check validation: if not valid, show error feedback
  if (!validateAll()) {
    // Find first error
    const firstField = Object.keys(errors.value).find(k => !!errors.value[k])
    const msg = errors.value[firstField!] || 'Please fill all required fields.'
    notificationStore.addNotification({
      message: msg,
      type: 'error',
      timeoutMs: 5000
    })
    return
  }

  // Compose session object (Pinia Session definition + extended fields swell/wind/tide/notes)
  const session = {
    id: `s-${Date.now()}-${Math.random().toString().slice(2,7)}`,
    date: form.value.date,
    spot: form.value.spot,
    board: form.value.board,
    waves: Number(form.value.waves),
    mood: form.value.mood,
    notes: form.value.notes,
    swell: form.value.swell,
    wind: form.value.wind,
    tide: form.value.tide
  }
  sessionStore.addSession(session)
  // Feedback: success banner
  notificationStore.addNotification({
    message: 'Session added successfully!',
    type: 'success',
    timeoutMs: 4200
  })
  router.push({ path: '/' })
}

function selectMood(moodEmoji: string) {
  form.value.mood = moodEmoji
  errors.value.mood = ''
}
</script>

<template>
  <form
    class="wavelog-log-session-form ocean-theme"
    autocomplete="off"
    @submit="submitForm"
    novalidate
  >
    <div class="form-header">
      <span>📝</span>
      <b>Log New Session</b>
    </div>
    <div class="form-group-group">
      <div class="form-group ocean-form-row">
        <label>
          <span title="Date">📅</span>
          <input
            type="date"
            class="ocean-input"
            v-model="form.date"
            @blur="blurField('date')"
            :max="todayStr"
            required
            autocomplete="off"
          />
          <span class="input-error" v-if="errors.date">{{ errors.date }}</span>
        </label>
        <label>
          <span title="Spot">🏝️</span>
          <select
            class="ocean-input"
            v-model="form.spot"
            @blur="blurField('spot')"
            required
          >
            <option value="">Surf Spot...</option>
            <option v-for="s in spotOptions" :key="s" :value="s">{{ s }}</option>
          </select>
          <span class="input-error" v-if="errors.spot">{{ errors.spot }}</span>
        </label>
      </div>
      <div class="form-group ocean-form-row">
        <label>
          <span title="Board">🏄‍♀️</span>
          <select
            class="ocean-input"
            v-model="form.board"
            @blur="blurField('board')"
            required
          >
            <option value="">Board...</option>
            <option v-for="b in boardOptions" :key="b" :value="b">{{ b }}</option>
          </select>
          <span class="input-error" v-if="errors.board">{{ errors.board }}</span>
        </label>
        <label>
          <span title="Wave Count">🌊</span>
          <input
            type="number"
            class="ocean-input"
            min="1"
            step="1"
            v-model="form.waves"
            @blur="blurField('waves')"
            required
            placeholder="Waves caught"
            inputmode="numeric"
          />
          <span class="input-error" v-if="errors.waves">{{ errors.waves }}</span>
        </label>
      </div>
      <div class="form-group ocean-form-row mood-row">
        <label>
          <span title="Mood">😃</span>
        </label>
        <div class="mood-emoji-row">
          <button
            v-for="m in moods"
            type="button"
            :key="m.emoji"
            class="mood-emoji-btn"
            :aria-label="m.label"
            :class="{ selected: form.mood === m.emoji }"
            @click="selectMood(m.emoji)"
          >
            {{ m.emoji }}
          </button>
        </div>
        <span class="input-error" v-if="errors.mood" style="flex-basis:100%">{{ errors.mood }}</span>
      </div>
      <div class="form-group ocean-form-row">
        <label>
          <span title="Swell Size">🌊📏</span>
          <select
            class="ocean-input"
            v-model="form.swell"
            @blur="blurField('swell')"
            required
          >
            <option value="">Swell Size...</option>
            <option v-for="sw in swellSizes" :key="sw.value" :value="sw.value">
              {{ sw.label }}
            </option>
          </select>
          <span class="input-error" v-if="errors.swell">{{ errors.swell }}</span>
        </label>
        <label>
          <span title="Wind">🍃</span>
          <select
            class="ocean-input"
            v-model="form.wind"
            @blur="blurField('wind')"
            required
          >
            <option value="">Wind...</option>
            <option v-for="w in winds" :key="w.value" :value="w.value">{{ w.label }}</option>
          </select>
          <span class="input-error" v-if="errors.wind">{{ errors.wind }}</span>
        </label>
        <label>
          <span title="Tide">🌅</span>
          <select
            class="ocean-input"
            v-model="form.tide"
            @blur="blurField('tide')"
            required
          >
            <option value="">Tide...</option>
            <option v-for="t in tides" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
          <span class="input-error" v-if="errors.tide">{{ errors.tide }}</span>
        </label>
      </div>
      <div class="form-group notes-row">
        <label
          style="width:100%"
        >
          <span title="Notes">📝</span>
          <textarea
            class="ocean-input"
            v-model="form.notes"
            rows="2"
            maxlength="250"
            placeholder="Session notes (vibe, memorable wave, friends, etc)..."
            autocomplete="off"
          />
        </label>
      </div>
    </div>
    <div class="form-footer">
      <button
        class="sea-btn"
        type="submit"
        :disabled="!validateAll()"
        :aria-disabled="!validateAll()"
      >
        Save Session
      </button>
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
  max-width: 480px;
  margin: 0 auto 1.3em auto;
  font-size: 1.06em;
}
.form-header {
  font-size: 1.2em;
  color: #20798b;
  margin-bottom: .7em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: .7em;
  letter-spacing: 0.4px;
}
.form-group-group {
  display: flex;
  flex-direction: column;
  gap: 0.18em;
}
.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  margin-bottom: 0.7em;
}
label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.13em;
  min-width: 120px;
  flex: 1 0 120px;
  font-weight: 500;
  color: #217390;
  font-size: 1em;
}

.ocean-input {
  background: #e0f7fa26;
  border: 1px solid #2EC4B680;
  padding: 0.52em 0.6em;
  border-radius: 8px;
  min-width: 80px;
  font-size: 1.05em;
  width: 100%;
  transition: border 0.16s;
  outline: none;
  margin-bottom: 0.09em;
}
.ocean-input:focus {
  border-color: #4F8FBF;
  background: #e0f7fa77;
}
.notes-row {
  margin-top: 0.1em;
  margin-bottom: 0.38em;
}
textarea.ocean-input {
  min-height: 2.3em;
  resize: vertical;
}
.input-error {
  color: #c22d37;
  font-size: 0.97em;
  margin-top: 0.09em;
  font-weight: 600;
}
.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.12em;
}
.sea-btn {
  background: linear-gradient(95deg, #2EC4B6 60%, #4F8FBF 100%);
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  padding: 0.26em 1.34em;
  transition: background 0.18s;
  box-shadow: 0 0 4.5px #2EC4B626;
  font-size: 1.09em;
  cursor: pointer;
}
.sea-btn[disabled], .sea-btn[aria-disabled="true"] {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
  opacity: 0.75;
}
.mood-row {
  gap: 0.24em;
  align-items: center;
}
.mood-emoji-row {
  display: flex;
  gap: .15em;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 0.2em;
}
.mood-emoji-btn {
  background: #fff;
  border: 2.2px solid #e0f7fa77;
  border-radius: 100px;
  padding: 0.1em 0.19em 0.1em 0.23em;
  font-size: 1.4em;
  margin: 0 0.04em;
  cursor: pointer;
  line-height: 1.19;
  outline: none;
  filter: drop-shadow(0 1.5px 2px #039fb028);
  transition: border .15s;
  min-width: 1.95em;
}
.mood-emoji-btn.selected, .mood-emoji-btn:focus {
  border: 2.2px solid #4F8FBF;
  background: #f5e9daee;
}
.mood-emoji-btn:hover {
  border: 2.2px solid #2EC4B6;
  background: #b8e0ef44;
}
@media (max-width: 620px) {
  .wavelog-log-session-form {
    padding: 1.1em 0.4em 1.25em 0.4em;
    font-size: 1em;
    max-width: 99vw;
  }
  .form-header {
    font-size: 1em;
  }
  .form-group {
    flex-direction: column;
    gap: 0.3em;
  }
  .mood-emoji-row {
    font-size: 0.95em;
  }
}
</style>
