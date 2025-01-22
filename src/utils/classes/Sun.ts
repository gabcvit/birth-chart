import { simplifyAngle } from '../helpers';
import { CelestialBody } from './CelestialBody';

export class Sun extends CelestialBody {

	constructor(date: string, time: string, timeZone: string) {
		super(date, time, timeZone);
		this.calculateLongitude();
	}

	getGeocentricLongitude() {
		return this.geocentricLongitude;
	}

	calculateLongitude() {
		// Number of days from epoch (T)
		const daysFromEpoch = this.julianDate - 2451545.0;

		// Mean anomaly of the Sun
		const meanAnomaly = 357.529 + 0.98560028 * daysFromEpoch;

		// Mean longitude of the Sun
		const meanLongitude = 280.459 + 0.98564736 * daysFromEpoch;

		// Geocentric apparent ecliptic longitude of the Sun
		const apparentLongitude = meanLongitude + 1.915 * Math.sin(meanAnomaly)
			+ 0.020 * Math.sin(2 * meanAnomaly);

		this.geocentricLongitude = simplifyAngle(apparentLongitude);
	};
}