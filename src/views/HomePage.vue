<template>
  <div>
    <div class="mb-16">
      <h1 class="text-3xl">
        Birth chart
      </h1>
      <p class="text-xl">
        Enter the data bellow to find out
      </p>
    </div>

    <form @submit.prevent="onClickSummit">
      <div class="mt-4 flex flex-col items-center">
        <label for="birthdate">Birthdate:</label>
        <input
          class="mt-2 p-4 bg-zinc-800 w-40"
          type="date"
          id="birthdate"
          v-model="birthdate"
          required
        >
      </div>
      <div class="mt-4 flex flex-col items-center">
        <label for="birthtime">Time of Birth:</label>
        <input
          class="mt-2 p-4 bg-zinc-800 w-40"
          type="time"
          id="birthtime"
          v-model="birthtime"
          required
        >
      </div>
      <div class="mt-4 flex flex-col items-center">
        <label for="city">City:</label>
        <CitySearchInput @on-city-selected="(val?: City) => selectedCity = val" />
      </div>
      <button
        type="submit"
        :disabled="shouldDisableSubmitButton"
        class="disabled:opacity-50 disabled:cursor-not-allowed mt-8 p-4 bg-zinc-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import CitySearchInput from '../components/CitySearchInput.vue';
import type { City } from '../types/types.interfaces';
import { useRouter } from 'vue-router';

const birthdate = ref('');
const birthtime = ref('');
const selectedCity = ref<City>();
const router = useRouter();

const shouldDisableSubmitButton = computed(() => {
  return !birthdate.value || !birthtime.value || !selectedCity.value;
});

const onClickSummit = async () => {
  await router.push({
    name: 'result',
    query: {
      birthdate: birthdate.value,
      birthtime: birthtime.value,
      lat: selectedCity.value?.lat,
      lon: selectedCity.value?.lon,
      timeZone: selectedCity.value?.timeZone,
    }
  });
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>