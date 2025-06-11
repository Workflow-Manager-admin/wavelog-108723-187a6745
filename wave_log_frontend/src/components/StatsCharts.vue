<script setup lang="ts">
// PUBLIC_INTERFACE
import { computed } from 'vue'

// Stats prop structure
interface StatsChartData {
  mostVisitedSpot?: { spot: string, count: number }
  boardUsage?: Array<{board: string, count: number}>
  moodTrend?: Array<{date: string, mood: string}>
  sessionCount?: number
}
const props = defineProps<{ statsData?: StatsChartData }>()

// For color palette
const CHART_COLORS = ['#2EC4B6', '#4F8FBF', '#F5E9DA', '#19708f', '#ffd166', '#585481']

// Emoji: hardcode for 3 known boards for surf feel (extend as needed)
const BOARD_EMOJI_MAP: Record<string, string> = {
  'Shortboard': '🏄‍♂️',
  'Longboard': '🛶',    // Use canoe as stand-in for lack of true longboard emoji
  'Fish': '🐟',
}

// Emoji for mood
const MOOD_EMOJI = ['😀', '😎', '🤙', '😴', '😡', '🏄‍♂️', '🌊']

// Mood color
function moodColor(mood: string) {
  switch (mood) {
    case '😀': return '#e0ffc2'
    case '😎': return '#e0f3fa'
    case '🤙': return '#ffe6fa'
    case '😴': return '#f8fff2'
    case '😡': return '#ffe6e4'
    case '🏄‍♂️': return '#c8f2fe'
    case '🌊': return '#b8e0ef'
    default: return '#f5e9da'
  }
}

/* Removed unused smoothLine and all unused idx variables; add type guards below. */

const boardPieData = computed(() => {
  if (!props.statsData?.boardUsage || !props.statsData.sessionCount) return []
  const total = props.statsData.sessionCount
  let sofar = 0
  return props.statsData.boardUsage.map((b, i) => {
    const percent = total === 0 ? 0 : b.count / total
    const startA = sofar
    sofar += percent
    return {
      ...b,
      emoji: BOARD_EMOJI_MAP[b.board] || '🏄‍♂️',
      color: CHART_COLORS[i % CHART_COLORS.length],
      percent: (percent * 100).toFixed(1),
      startAngle: startA * 360,
      endAngle: (startA + percent) * 360
    }
  })
})

// Mood trend over time for line chart
const moodTrendPoints = computed(() => {
  if (!props.statsData?.moodTrend) return []
  // Assign y-values to each mood
  const moods = MOOD_EMOJI
  return props.statsData.moodTrend.map((t, i) => ({
    x: 30 + i * 50,
    y: 110 - moods.indexOf(t.mood) * 17, // invert chart so high is happy etc
    emoji: t.mood,
    date: t.date
  }))
})

// Bar chart for most visited spot
const spotBarFill = computed(() => {
  const maxCount = props.statsData?.mostVisitedSpot?.count ?? 1
  const val = props.statsData?.mostVisitedSpot?.count ?? 0
  const pct = (val / maxCount) * 96
  return pct
})
</script>

<template>
  <div class="wavelog-stats-charts ocean-theme">
    <!-- Most Visited Spot Bar -->
    <div class="chart ocean-bar-chart">
      <div class="chart-label-head">
        <span aria-label="Wave">📊</span>
        Most Visited Spot
        <span
          v-if="props.statsData && props.statsData.mostVisitedSpot && props.statsData.mostVisitedSpot.spot"
          class="highlight-spot"
        >🏝️ {{ props.statsData.mostVisitedSpot.spot }}</span>
      </div>
      <div
        v-if="props.statsData && props.statsData.mostVisitedSpot && props.statsData.mostVisitedSpot.spot"
        class="bar-row"
      >
        <span
          class="bar-fill"
          :style="'width:' + spotBarFill + '%; background:' + CHART_COLORS[1]"
        />
        <span class="bar-label">
          {{ props.statsData.mostVisitedSpot ? (props.statsData.mostVisitedSpot.count || 0) : 0 }} times
        </span>
      </div>
      <div v-else class="bar-row bar-row-empty">No data yet</div>
    </div>

    <!-- Board Usage Pie Chart -->
    <div class="chart ocean-pie-chart">
      <div class="chart-label-head">
        <span aria-label="Surfboard">🏄‍♂️</span> Board Usage %
      </div>
      <svg v-if="boardPieData.length" width="135" height="135" viewBox="0 0 135 135">
        <g>
          <template v-for="slice in boardPieData" :key="slice.board">
            <path
              :d="
                `M67.5,67.5 ` +
                `L ` +
                (67.5 + 60 * Math.cos(Math.PI * 2 * (slice.startAngle-90) / 360)).toFixed(2) + ',' +
                (67.5 + 60 * Math.sin(Math.PI * 2 * (slice.startAngle-90) / 360)).toFixed(2) +
                ` A60,60 0 ` +
                (slice.endAngle-slice.startAngle > 180 ? 1 : 0) +
                `,1 ` +
                (67.5 + 60 * Math.cos(Math.PI * 2 * (slice.endAngle-90) / 360)).toFixed(2) + ',' +
                (67.5 + 60 * Math.sin(Math.PI * 2 * (slice.endAngle-90) / 360)).toFixed(2) +
                ` Z`
              "
              :fill="slice.color"
              :opacity="0.98"
            />
            <!-- Center label/emoji for each slice -->
            <text
              :x="67.5 + 36 * Math.cos(Math.PI * 2 * ((slice.startAngle+slice.endAngle)/2-90)/360)"
              :y="67.5 + 36 * Math.sin(Math.PI * 2 * ((slice.startAngle+slice.endAngle)/2-90)/360) + 5"
              text-anchor="middle"
              alignment-baseline="middle"
              style="font-size:19px;"
            >{{ slice.emoji }}</text>
          </template>
        </g>
        <circle
          cx="67.5"
          cy="67.5"
          r="43"
          fill="#fff"
          opacity="0.18"
          stroke="#2EC4B6"
          stroke-width="1"
        />
      </svg>
      <div v-else class="ocean-pie-empty">No board data yet</div>
      <div class="pie-legend-row">
        <span
          v-for="slice in boardPieData"
          :key="slice.board"
          class="pie-legend"
        >
          <span :style="'color:' + slice.color + ';font-size:1.25em;'">{{ slice.emoji }}</span>
          {{ slice.board }} <span style="color:#888;">({{ slice.percent }}%)</span>
        </span>
      </div>
    </div>

    <!-- Mood Trend Over Time (SVG line chart with emojis) -->
    <div class="chart ocean-line-chart">
      <div class="chart-label-head">
        <span aria-label="Smiley">😊</span> Mood Trend Over Time
      </div>
      <svg v-if="moodTrendPoints.length" :width="moodTrendPoints.length * 50 + 30" height="130">
        <polyline
          v-if="moodTrendPoints.length > 1"
          :points="moodTrendPoints.map(p => p.x + ',' + p.y).join(' ')"
          fill="none"
          :stroke="CHART_COLORS[0]"
          :stroke-width="4"
          opacity="0.35"
        />
        <template v-for="pt in moodTrendPoints" :key="pt.date">
          <circle
            :cx="pt.x"
            :cy="pt.y"
            r="13"
            :fill="moodColor(pt.emoji)"
            stroke="#2EC4B6"
            stroke-width="1"
            opacity="0.87"
          />
          <text :x="pt.x" :y="pt.y+6" text-anchor="middle" font-size="20px">{{ pt.emoji }}</text>
          <!-- Date below -->
          <text :x="pt.x" :y="118" text-anchor="middle" font-size="11" fill="#19708f">{{ pt.date.slice(5) }}</text>
        </template>
      </svg>
      <div v-else class="line-empty">No mood data yet</div>
    </div>

    <!-- Bottom ocean message -->
    <div class="stats-charts-placeholder">
      <span class="wave-ocean-msg">
        🌊 Powered by the tides &mdash; keep logging those waves, more trends soon!
      </span>
    </div>
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
