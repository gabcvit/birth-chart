<template>
  <div class="w-full max-w-md mx-auto">
    <div class="relative">
      <input v-model="query" @input="debouncedSearch" @keydown.down="onArrowDown" @keydown.up="onArrowUp"
        @keydown.enter="onEnter" type="text" placeholder="Enter a city name"
        class="mt-2 p-4 bg-zinc-800 w-full text-white bg-white border rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <ul v-if="suggestions.length > 0"
        class="absolute z-10 w-full mt-1 bg-zinc-950 rounded-md shadow-lg max-h-60 overflow-auto">
        <li v-for="(suggestion, index) in suggestions" :key="suggestion.place_id" @click="selectCity(suggestion)"
          :class="[
            'px-4 py-2 cursor-pointer hover:bg-zinc-900',
            { 'bg-zinc-900': index === arrowCounter }
          ]">
          {{ suggestion.display_name }}
        </li>
      </ul>
    </div>
    <div v-if="selectedCity" class="mt-4 p-4 bg-zinc-900 rounded-md">
      <h3 class="text-md font-semibold mb-2">
        Selected City:
      </h3>
      <p class="text-sm"><strong>Name:</strong> {{ selectedCity.display_name }}</p>
      <p class="text-sm"><strong>Latitude:</strong> {{ selectedCity.lat }}</p>
      <p class="text-sm"><strong>Longitude:</strong> {{ selectedCity.lon }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import type { City } from '../types/types.interfaces';

const API_URL = 'https://nominatim.openstreetmap.org/search'

const emit = defineEmits(['onCitySelected'])

const query = ref('')
const suggestions = ref<City[]>([])
const selectedCity = ref<City>()
const arrowCounter = ref(-1)

let debounceTimer: ReturnType<typeof setTimeout>

const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (query.value.length > 2) {
      fetchSuggestions()
    } else {
      suggestions.value = []
    }
  }, 300)
}

const fetchSuggestions = async () => {
  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(query.value)}&format=json&limit=5&addressdetails=1&featuretype=city`
    )
    const data = await response.json()
    suggestions.value = data
  } catch (error) {
    console.error('Error fetching suggestions:', error)
  }
}

const selectCity = (city: City) => {
  selectedCity.value = city
  query.value = city.display_name
  suggestions.value = []
  arrowCounter.value = -1
  emit('onCitySelected', city)
}

const onArrowDown = () => {
  if (arrowCounter.value < suggestions.value.length - 1) {
    arrowCounter.value++
  }
}

const onArrowUp = () => {
  if (arrowCounter.value > 0) {
    arrowCounter.value--
  }
}

const onEnter = () => {
  if (arrowCounter.value > -1) {
    selectCity(suggestions.value[arrowCounter.value])
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  const component = (event.target as Element).closest('.relative')
  if (!component) {
    suggestions.value = []
    arrowCounter.value = -1
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>