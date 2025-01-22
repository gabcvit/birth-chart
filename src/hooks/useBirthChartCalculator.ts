import { Sun } from '../utils/classes/Sun';
import { Mercury } from '../utils/classes/Mercury';
import { Moon } from '../utils/classes/Moon';

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

	const calculate = () => {
		return {
			sun: calculateSunSign(),
			moon: calculateMoonSign(),
			mercury: calculateMercurySign(),
		};
	}

	return {
		calculate,
	};
}
