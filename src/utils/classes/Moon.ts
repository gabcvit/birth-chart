import { simplifyAngle } from '../helpers';
import { CelestialBody } from './CelestialBody';

export class Moon extends CelestialBody {
	private geocentricLongitude: number = 0;

	constructor(date: string, time: string, timeZone: string) {
		super(date, time, timeZone);
		this.calculateLongitude();
	}

	getGeocentricLongitude() {
		return this.geocentricLongitude;
	}

	calculateLongitude() {
		// Number of days from epoch J2000.0
		const daysFromEpoch = this.julianDate - 2451545.0;

		// Mean anomaly
		const meanAnomaly = 134.963 + 13.064993 * daysFromEpoch;

		// Mean longitude
		const meanLongitude = 218.316 + 13.176396 * daysFromEpoch;

		// Perturbations (corrections)
		const correctedPerturbations = 6.289 * Math.sin(meanAnomaly)

		// Apparent Longitude
		const apparentLongitude = meanLongitude + correctedPerturbations;

		this.geocentricLongitude = simplifyAngle(apparentLongitude);
	};
}