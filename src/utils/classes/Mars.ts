import { simplifyAngle, radToDeg } from '../helpers';
import { CelestialBody } from './CelestialBody';
import { Earth } from './Earth';

export class Mars extends CelestialBody {
	private heliocentricDistance: number = 0;
	private heliocentricLongitude: number = 0;

	constructor(date: string, time: string, timeZone: string) {
		super(date, time, timeZone);
		this.calculateHeliocentricLongitude();
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

	calculateHeliocentricLongitude() {
		const daysFromEpoch = this.julianDate - 2451545.0;
	
		// Eccentricity (e)
		const eccentricity = 0.093405 + 2.516E-9 * daysFromEpoch;

		// Semi-Major Axis (a)
		const semiMajorAxis = 1.523688

		// Argument of Perihelion (w)
		const argumentOfPerihelion = 286.5016 + 2.92961E-5 * daysFromEpoch;

		// Longitude of Ascending Node (O)
		const longitudeOfAscendingNode = 49.558093 - 0.29257343 * daysFromEpoch;

		// Perihelion (q)
		const longitudeOfPerihelion = argumentOfPerihelion + longitudeOfAscendingNode;

		// Mean longitude (L)
		const a0 = 293.737334;
		const a1 = 19141.69551;
		const a2 = 0.0003107;
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