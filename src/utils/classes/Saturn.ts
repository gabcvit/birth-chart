import { simplifyAngle, radToDeg } from '../helpers';
import { CelestialBody } from './CelestialBody';
import { Earth } from './Earth';

export class Saturn extends CelestialBody {
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
		const eccentricity = 0.047318 + 7.45E-9 * daysFromEpoch;

		// Semi-Major Axis (a)
		const semiMajorAxis = 19.18171 - 1.55E-8 * daysFromEpoch;

		// Argument of Perihelion (w)
		const argumentOfPerihelion = 339.3939 + 2.97661E-5 * daysFromEpoch;

		// Longitude of Ascending Node (O)
		const longitudeOfAscendingNode = 113.665524 - 0.256897 * daysFromEpoch;

		// Perihelion (q)
		const longitudeOfPerihelion = argumentOfPerihelion + longitudeOfAscendingNode;

		// Mean longitude (L)
		const a0 = 244.197470;
		const a1 = 429.863546;
		const a2 = 0.0003160;
		const a3 = -0.00000060;
		const meanLongitude = a0 + (a1 * daysFromEpoch) + (a2 * Math.pow(daysFromEpoch, 2)) + (a3 * Math.pow(daysFromEpoch, 3));

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