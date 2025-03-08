<template>
  <div v-if="areParamsValid">
    <div class="mb-16">
      <h1 class="text-3xl">
        Your birth chart
      </h1>
    </div>
    <h2 class="text-2xl">
      Data inserted
    </h2>
    <p>Date of birth: {{ birthdate }}</p>
    <p>Time of birth: {{ birthtime }}</p>
    <p>Latitude: {{ latitude }}</p>
    <p>Longitude: {{ longitude }}</p>
    <div class="mt-8">
      <h2 class="text-2xl">
        Planetary Positions
      </h2>
      <ul>
        <li
          v-for="(planet, index) in birthChartData"
          :key="index"
        >
          {{ capitalize(index) }}: {{ planet.sign }} ({{ formatAngle(planet.longitude) }})
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <div class="mb-16">
      <h1 class="text-3xl">
        It was not possible to generate your birth chart
      </h1>
      <p class="text-xl">
        Please go back to the initial form page and fill in the necessary data
      </p>
      <button
        class="mt-8 p-4 bg-zinc-800"
        :onClick="() => onGoBackClicked()"
      >
        Go back to form
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBirthChartCalculator from '../hooks/useBirthChartCalculator';
import { extractStringFromLocationQueryValue,
	extractNumberFromLocationQueryValue,
	capitalize,
	formatAngle,
} from '../utils/helpers';
import * as Astronomy from 'astronomy-engine';

const route = useRoute();
const router = useRouter();

const birthtime = ref<string>(extractStringFromLocationQueryValue(route?.query.birthtime) || '');
const latitude = ref<number>(extractNumberFromLocationQueryValue(route?.query.lat) || 0);
const longitude = ref<number>(extractNumberFromLocationQueryValue(route?.query.lon) || 0);
const observer = computed<Astronomy.Observer>(() => {
	return new Astronomy.Observer(-22.9056391, -47.059564, 0);
})
const timeZone = ref<string>(extractStringFromLocationQueryValue(route?.query.timeZone) || '');
const birthdate = ref<string>(extractStringFromLocationQueryValue(route?.query.birthdate) || '');

const areParamsValid = computed(() => {
	return birthdate.value && birthtime.value && latitude.value && longitude.value && timeZone.value;
});

const onGoBackClicked = async () => {
	await router.push({
		name: 'home',
	});
}

const birthChartData = computed(() => {
	if (areParamsValid.value) {
		return useBirthChartCalculator(
			birthdate.value,
			birthtime.value,
			timeZone.value,
			observer.value,
		);
	}
	return null;
});

</script>