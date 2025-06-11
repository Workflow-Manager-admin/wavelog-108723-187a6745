import { defineStore } from 'pinia'
import { ref } from 'vue'

// Demo: Default options (normally would be dynamic)
const sampleSpots = ['Malibu', 'Huntington Beach', 'Trestles']
const sampleBoards = ['Shortboard', 'Fish', 'Longboard']
const sampleMoods = ['😀', '😎', '🤙']

// PUBLIC_INTERFACE
export const useFilterStore = defineStore('filterStore', () => {
  // Current filter selection
  const filters = ref<{
    spot?: string
    board?: string
    mood?: string
  }>({})

  // Options
  const options = ref<{
    spots: string[]
    boards: string[]
    moods: string[]
  }>({
    spots: sampleSpots,
    boards: sampleBoards,
    moods: sampleMoods
  })

  // PUBLIC_INTERFACE
  function setFilter(name: keyof typeof filters.value, value: string | undefined) {
    filters.value[name] = value
  }

  // PUBLIC_INTERFACE
  function clearFilters() {
    filters.value = {}
  }

  return {
    filters,
    options,
    setFilter,
    clearFilters
  }
})
