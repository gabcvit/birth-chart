import { simplifyAngle, radToDeg } from '../helpers';
import { CelestialBody } from './CelestialBody';
import { Earth } from './Earth';

export class Mercury extends CelestialBody {
	private heliocentricDistance: number = 0;
	private heliocentricLongitude: number = 0;

	constructor(date: string, time: string, timeZone: string) {
		super(date, time, timeZone);
		this.calculateHeliocentricPosition();
		this.calculateGeocentricLongitude();
	}

	getHeliocentricDistance() {
		return this.heliocentricDistance;
	}

	getHeliocentricLongitude() {
		return this.heliocentricLongitude;
	}

	getGeocentricLongitude() {
		return this.geocentricLongitude;
	}

	calculateHeliocentricPosition() {
		const daysFromEpoch = this.julianDate - 2451545.0;
	
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

		this.heliocentricDistance = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));
		this.heliocentricLongitude = trueAnomaly + longitudeOfPerihelion;
	}

	calculateGeocentricLongitude() {
		const earth = new Earth(this.date, this.time, this.timeZone)
		
		const earthCartesianAngles = {
			x: earth.getHeliocentricDistance() * Math.cos(earth.getHeliocentricLongitude()),
			y: earth.getHeliocentricDistance() * Math.sin(earth.getHeliocentricLongitude()),
		}

		const selfCartesianAngles = {
			x: this.heliocentricDistance * Math.cos(this.heliocentricLongitude),
			y: this.heliocentricDistance * Math.sin(this.heliocentricLongitude),
		}

		const relativeCartesianAngles = {
			x: selfCartesianAngles.x - earthCartesianAngles.x,
			y: selfCartesianAngles.y - earthCartesianAngles.y,
		}

		const convertedToDegree = radToDeg(Math.atan2(relativeCartesianAngles.y, relativeCartesianAngles.x))
		this.geocentricLongitude = simplifyAngle(convertedToDegree);
	}
}