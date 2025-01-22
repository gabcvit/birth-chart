import * as GeoTZ from 'browser-geo-tz';
import { ref } from 'vue';

export default function useTimeZoneFinder() {
	const timeZone = ref('UTC');

	const findTimeZone = async (latitude: number, longitude: number,) => {
		const tz = await GeoTZ.find(latitude, longitude);
		timeZone.value = tz[0] ?? 'UTC'
	}

	return {
		timeZone,
		findTimeZone
	};
}
