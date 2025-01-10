import { DateTime } from 'luxon';

export default function useBirthChartCalculator(
	date: string,
	time: string,
	timeZone: string,
) {
	const simplifyAngle = (angle: number): number => {
		const simplifiedAngle = angle % 360;
		if (simplifiedAngle < 0) {
			return 360 + simplifiedAngle;
		}
		return simplifiedAngle;
	}

	const calculateJulianDate = (): number => {
		const dateTime = DateTime.fromISO(`${date}T${time}`, { zone: timeZone }).toUTC();

		let year = dateTime.year;
		let month = dateTime.month;
		const day = dateTime.day + dateTime.hour / 24 + dateTime.minute / 1440;

		if (month <= 2) {
			year -= 1;
			month += 12;
		}

		const A = Math.floor(year / 100);
		const B = 2 - A + Math.floor(A / 4);

		const julianDate = Math.floor(365.25 * (year + 4716))
			+ Math.floor(30.6001 * (month + 1))
			+ day + B - 1524.5;

		return julianDate;
	};

	const calculateSunLongitude = (julianDate: number): number => {
		// Number of days from epoch J2000.0
		const daysFromEpoch = (julianDate - 2451545.0);

		// Mean anomaly of the Sun
		const meanAnomaly = 357.529 + 0.98560028 * daysFromEpoch;

		// Mean longitude of the Sun
		const meanLongitude = 280.459 + 0.98564736 * daysFromEpoch;

		// Geocentric apparent ecliptic longitude of the Sun
		const apparentLongitude = meanLongitude + 1.915 * Math.sin(meanAnomaly)
			+ 0.020 * Math.sin(2 * meanAnomaly);

		return simplifyAngle(apparentLongitude);
	};

	const calculateMoonLongitude = (julianDate: number): number => {
		// Number of days from epoch J2000.0
		const daysFromEpoch = (julianDate - 2451545.0);

		// Mean anomaly
		const meanAnomaly = 134.963 + 13.064993 * daysFromEpoch;

		// Mean longitude
		const meanLongitude = 218.316 + 13.176396 * daysFromEpoch;

		// Perturbations (corrections)
		const correctedPerturbations = 6.289 * Math.sin(meanAnomaly)

		// Apparent Longitude
		const apparentLongitude = meanLongitude + correctedPerturbations;

		return simplifyAngle(apparentLongitude);
	};

	const getZodiacSign = (longitude: number): string => {
		const zodiacSigns = [
			"Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
			"Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
		];

		const index = Math.floor(longitude / 30);
		return zodiacSigns[index];
	};

	const calculateSunSign = () => {
		const julianDate = calculateJulianDate();
		const sunLongitude = calculateSunLongitude(julianDate);
		const sign = getZodiacSign(sunLongitude);

		return {
			sign,
			longitude: Math.round(sunLongitude)
		};
	};

	const calculateMoonSign = () => {
		const julianDate = calculateJulianDate();
		const moonLongitude = calculateMoonLongitude(julianDate);
		const sign = getZodiacSign(moonLongitude);

		return {
			sign,
			longitude: Math.round(moonLongitude)
		};
	};

	const calculate = () => {
		return {
			sun: calculateSunSign(),
			moon: calculateMoonSign(),
		};
	}

	return {
		calculateJulianDate,
		calculateSunLongitude,
		calculate,
	};
}
