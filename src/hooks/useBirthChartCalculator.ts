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
import * as Astronomy from "astronomy-engine"

export default function useBirthChartCalculator(
	date: string,
	time: string,
	timeZone: string,
	observer: Astronomy.Observer,
) {
	const calculateSunSign = () => {
		const sun = new Sun(date, time, timeZone, observer);

		return {
			sign: sun.getZodiacSign(),
			longitude: sun.getGeocentricLongitude(),
		};
	};

	const calculateMoonSign = () => {
		const moon = new Moon(date, time, timeZone, observer);

		return {
			sign: moon.getZodiacSign(),
			longitude: moon.getGeocentricLongitude()
		};
	};
	
	const calculateMercurySign = () => {

		const mercury = new Mercury(date, time, timeZone, observer);

		return {
			sign: mercury.getZodiacSign(),
			longitude: mercury.getGeocentricLongitude()
		};
	};

	const calculateVenusSign = () => {
		const venus = new Venus(date, time, timeZone, observer);

		return {
			sign: venus.getZodiacSign(),
			longitude: venus.getGeocentricLongitude()
		};
	};

	const calculateMarsSign = () => {
		const mars = new Mars(date, time, timeZone, observer);

		return {
			sign: mars.getZodiacSign(),
			longitude: mars.getGeocentricLongitude()
		};
	};

	const calculateJupiterSign = () => {
		const jupiter = new Jupiter(date, time, timeZone, observer);

		return {
			sign: jupiter.getZodiacSign(),
			longitude: jupiter.getGeocentricLongitude()
		};
	};

	const calculateSaturnSign = () => {
		const saturn = new Saturn(date, time, timeZone, observer);

		return {
			sign: saturn.getZodiacSign(),
			longitude: saturn.getGeocentricLongitude()
		};
	};

	const calculateUranusSign = () => {
		const uranus = new Uranus(date, time, timeZone, observer);

		return {
			sign: uranus.getZodiacSign(),
			longitude: uranus.getGeocentricLongitude()
		};
	};

	const calculateNeptuneSign = () => {
		const neptune = new Neptune(date, time, timeZone, observer);

		return {
			sign: neptune.getZodiacSign(),
			longitude: neptune.getGeocentricLongitude(),
		};
	};

	const calculatePlutoSign = () => {
		const pluto = new Pluto(date, time, timeZone, observer);

		return {
			sign: pluto.getZodiacSign(),
			longitude: pluto.getGeocentricLongitude()
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
