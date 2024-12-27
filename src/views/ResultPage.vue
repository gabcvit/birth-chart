<template>
	<div v-if="areParamsValid">
		<div class="mb-16">
			<h1 class="text-3xl">Your birth chart</h1>
		</div>
		<p>Date of birth: {{ birthdate?.toDateString() }}</p>
		<p>Time of birth: {{ birthtime }}</p>
		<p>Latitude: {{ latitude }}</p>
		<p>Longitude: {{ longitude }}</p>
	</div>
	<div v-else>
		<div class="mb-16">
			<h1 class="text-3xl">It was not possible to generate your birth chart</h1>
			<p class="text-xl">Please go back to the initial form page and fill in the necessary data</p>
			<button class="mt-8 p-4 bg-zinc-800" :onClick="() => onGoBackClicked()">
				Go back to form
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const birthtime = ref(route?.query.birthtime || '');
const latitude = ref(route?.query.lat || '');
const longitude = ref(route?.query.lon || '');
const birthdate = computed(() => {
	if (route?.query.birthdate && typeof route.query.birthdate === 'string') {
		return new Date(route.query.birthdate);
	}
	return null
});

const areParamsValid = computed(() => {
	return birthdate.value && birthtime.value && latitude.value && longitude.value;
});

const onGoBackClicked = async () => {
	await router.push({
		name: 'home',
	});
}

</script>