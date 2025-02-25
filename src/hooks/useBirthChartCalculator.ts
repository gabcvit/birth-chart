import { Sun } from '../utils/classes/Sun';
import { Mars } from '../utils/classes/Mars';
import { Mercury } from '../utils/classes/Mercury';
import { Moon } from '../utils/classes/Moon';
import { Venus } from '../utils/classes/Venus';
import { Jupiter } from '../utils/classes/Jupiter';
import { Saturn } from '../utils/classes/Saturn';
import { Uranus } from '../utils/classes/Uranus';
import { Neptune } from '../utils/classes/Neptune';
import { Pluto } from '../utils/classes/Pluto';

export default function useBirthChartCalculator(
	date: string,
	time: string,
	timeZone: string,
) {
	const calculateSunSign = () => {
		const sun = new Sun(date, time, timeZone);

		return {
			sign: sun.getZodiacSign(),
			longitude: Math.round(sun.getGeocentricLongitude())
		};
	};

	const calculateMoonSign = () => {
		const moon = new Moon(date, time, timeZone);

		return {
			sign: moon.getZodiacSign(),
			longitude: Math.round(moon.getGeocentricLongitude())
		};
	};
	
	const calculateMercurySign = () => {
		const mercury = new Mercury(date, time, timeZone);

		return {
			sign: mercury.getZodiacSign(),
			longitude: Math.round(mercury.getGeocentricLongitude())
		};
	};

	const calculateVenusSign = () => {
		const venus = new Venus(date, time, timeZone);

		return {
			sign: venus.getZodiacSign(),
			longitude: Math.round(venus.getGeocentricLongitude())
		};
	};

	const calculateMarsSign = () => {
		const mars = new Mars(date, time, timeZone);

		return {
			sign: mars.getZodiacSign(),
			longitude: Math.round(mars.getGeocentricLongitude())
		};
	};

	const calculateJupiterSign = () => {
		const jupiter = new Jupiter(date, time, timeZone);

		return {
			sign: jupiter.getZodiacSign(),
			longitude: Math.round(jupiter.getGeocentricLongitude())
		};
	};

	const calculateSaturnSign = () => {
		const saturn = new Saturn(date, time, timeZone);

		return {
			sign: saturn.getZodiacSign(),
			longitude: Math.round(saturn.getGeocentricLongitude())
		};
	};

	const calculateUranusSign = () => {
		const uranus = new Uranus(date, time, timeZone);

		return {
			sign: uranus.getZodiacSign(),
			longitude: Math.round(uranus.getGeocentricLongitude())
		};
	};

	const calculateNeptuneSign = () => {
		const neptune = new Neptune(date, time, timeZone);

		return {
			sign: neptune.getZodiacSign(),
			longitude: Math.round(neptune.getGeocentricLongitude())
		};
	};

	const calculatePlutoSign = () => {
		const pluto = new Pluto(date, time, timeZone);

		return {
			sign: pluto.getZodiacSign(),
			longitude: Math.round(pluto.getGeocentricLongitude())
		};
	};

	const calculate = () => {
		return {
			sun: calculateSunSign(),
			moon: calculateMoonSign(),
			mercury: calculateMercurySign(),
			venus: calculateVenusSign(),
			mars: calculateMarsSign(),
			jupiter: calculateJupiterSign(),
			saturn: calculateSaturnSign(),
			uranus: calculateUranusSign(),
			neptune: calculateNeptuneSign(),
			pluto: calculatePlutoSign(),
		};
	}

	return {
		calculate,
	};
}
