import { CelestialBody } from './CelestialBody';

export class Earth extends CelestialBody {
	private heliocentricDistance: number = 0;
	private heliocentricLongitude: number = 0;

	constructor(date: string, time: string, timeZone: string) {
		super(date, time, timeZone);
		this.calculateHeliocentricLongitude();
	}

	getHeliocentricDistance() {
		return this.heliocentricDistance;
	}

	getHeliocentricLongitude() {
		return this.heliocentricLongitude;
	}

	calculateHeliocentricLongitude() {
		const daysFromEpoch = this.julianDate - 2451545.0;

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
		this.heliocentricLongitude = trueAnomaly + meanLongitude;

		// Heliocentric Distance
		this.heliocentricDistance = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));
	}
}