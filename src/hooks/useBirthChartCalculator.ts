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

	const radToDeg = (rad: number): number => {
		return rad * (180 / Math.PI);
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
		// Number of days from epoch (T)
		const daysFromEpoch = julianDate - 2451545.0;

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
		const daysFromEpoch = julianDate - 2451545.0;

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

	const calculateEarthLongitude = (julianDate: number) => {
		const daysFromEpoch = julianDate - 2451545.0;

		const meanAnomaly = 357.52911 + 35999.05029 * daysFromEpoch;

		const eccentricity = 0.01671123;

		const semiMajorAxis = 1.000000

		// Mean longitude (L)
		const a0 = 99.69668;
		const a1 = 36000.76892;
		const a2 = 0.0003025;
		const meanLongitude = a0 + (a1 * daysFromEpoch) + (a2 * Math.pow(daysFromEpoch, 2));
		
		// Kepler's Equation for Eccentric Anomaly
		let eccentricAnomaly = meanAnomaly; // Initial guess
		for (let i = 0; i < 10; i++) {
			eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
		}

		// True Anomaly
		const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

		// Heliocentric Longitude
		const heliocentricLongitude = trueAnomaly + meanLongitude;

		// Heliocentric Distance
		const heliocentricDistance = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

		return {
			heliocentricLongitude,
			heliocentricDistance,
		}
	}

	const calculateMercuryLongitude = (julianDate: number): number => {
		const daysFromEpoch = julianDate - 2451545.0;

		// Eccentricity (e)
		const eccentricity = 0.205630 + 0.00002 * daysFromEpoch;

		// Semi-Major Axis (a)
		const semiMajorAxis = 0.387098

		// Argument of Perihelion (w)
		const argumentOfPerihelion = 77.4577 + 0.1594 * daysFromEpoch;

		// Longitude of Ascending Node (O)
		const longitudeOfAscendingNode = 48.3308 + 0.1258 * daysFromEpoch;

		// Perihelion (q)
		const longitudeOfPerihelion = argumentOfPerihelion + longitudeOfAscendingNode;

		// Mean longitude (L)
		const a0 = 178.179078;
		const a1 = 149474.07078;
		const a2 = 0.0003011;
		const meanLongitude = a0 + (a1 * daysFromEpoch) + (a2 * Math.pow(daysFromEpoch, 2));

		// Mean anomaly (M)
		const meanAnomaly = meanLongitude - longitudeOfPerihelion;

		// Kepler's Equation for Eccentric Anomaly
		let eccentricAnomaly = meanAnomaly; // Initial guess
		for (let i = 0; i < 10; i++) {
			eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
		}

		// True Anomaly
		const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

		// Heliocentric Distance
		const heliocentricDistance = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

		// Heliocentric Longitude
		const heliocentricLongitude = trueAnomaly + longitudeOfPerihelion;

		// Earth's position
		const earth = calculateEarthLongitude(julianDate);
		
		// Calculate Geocentric Longitude
		const earthCartesianAngles = {
			x: earth.heliocentricDistance * Math.cos(earth.heliocentricLongitude),
			y: earth.heliocentricDistance * Math.sin(earth.heliocentricLongitude),
		}

		const mercuryCartesianAngles = {
			x: heliocentricDistance * Math.cos(heliocentricLongitude),
			y: heliocentricDistance * Math.sin(heliocentricLongitude),
		}

		const relativeCartesianAngles = {
			x: mercuryCartesianAngles.x - earthCartesianAngles.x,
			y: mercuryCartesianAngles.y - earthCartesianAngles.y,
		}
		
		const geocentricLongitude = radToDeg(Math.atan2(relativeCartesianAngles.y, relativeCartesianAngles.x));
		return simplifyAngle(geocentricLongitude);
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
	
	const calculateMercurySign = () => {
		const julianDate = calculateJulianDate();
		const moonLongitude = calculateMercuryLongitude(julianDate);
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
			mercury: calculateMercurySign(),
		};
	}

	return {
		calculateJulianDate,
		calculateSunLongitude,
		calculateMercuryLongitude,
		calculate,
	};
}
