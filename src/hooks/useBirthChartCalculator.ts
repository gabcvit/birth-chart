import { DateTime } from 'luxon';

export default function useBirthChartCalculator(
	date: string,
	time: string,
	timeZone: string,
) {
	console.log(date,
		time,
		timeZone)
	const degToRad = (degrees: number): number => (degrees * Math.PI) / 180;

	const calculateJulianDate = (): number => {
		const dt = DateTime.fromISO(`${date}T${time}`, { zone: timeZone });
		console.log(dt);

		let year = dt.year;
		let month = dt.month;
		const day = dt.day + dt.hour / 24 + dt.minute / 1440; // Add fractional day

		if (month <= 2) {
			year -= 1;
			month += 12;
		}

		const A = Math.floor(year / 100);
		const B = 2 - A + Math.floor(A / 4);

		const JD = Math.floor(365.25 * (year + 4716))
			+ Math.floor(30.6001 * (month + 1))
			+ day + B - 1524.5;

		console.log(JD);
		return JD;
	};

	const calculateSunLongitude = (jd: number): number => {
		const T = (jd - 2451545.0) / 36525;

		// Mean longitude of the Sun (L0)
		const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T ** 2;

		// Mean anomaly of the Sun (M)
		const M = 357.52911 + 35999.05029 * T - 0.0001537 * T ** 2;

		// Equation of center (C)
		const C = (1.914602 - 0.004817 * T - 0.000014 * T ** 2) * Math.sin(degToRad(M))
			+ (0.019993 - 0.000101 * T) * Math.sin(degToRad(2 * M))
			+ 0.000289 * Math.sin(degToRad(3 * M));

		// True longitude of the Sun
		const trueLongitude = L0 + C;

		// Correct for precession (apparent longitude)
		const Omega = 125.04 - 1934.136 * T;
		const apparentLongitude = trueLongitude - 0.00569 - 0.00478 * Math.sin(degToRad(Omega));

		return apparentLongitude % 360;
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
		const jd = calculateJulianDate();
		const sunLongitude = calculateSunLongitude(jd);
		const zodiacSign = getZodiacSign(sunLongitude);

		return {
			sunLongitude,
			zodiacSign
		};
	};

	const calculate = () => {
		return {
			sun: calculateSunSign(),
		};
	}

	return {
		calculate,
	};
}
