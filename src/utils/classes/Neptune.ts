import { CelestialBody } from './CelestialBody';
import * as Astronomy from "astronomy-engine"
import {Body} from 'astronomy-engine'
import { DateTime } from 'luxon';

export class Neptune extends CelestialBody {
	private heliocentricDistance: number = 0;
	private heliocentricLongitude: number = 0;

	constructor(date: string, time: string, timeZone: string, observer: Astronomy.Observer) {
		super(date, time, timeZone);
		this.calculateGeocentricLongitude(observer);
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

	calculateGeocentricLongitude(observer: Astronomy.Observer) {
		const dateTime = DateTime.fromISO(`${this.date}T${this.time}`, { zone: this.timeZone });
		const equatorialCoordinates = Astronomy.Equator(Body.Neptune, dateTime.toUTC().toJSDate(), observer, true, true);
		const ecliptic = Astronomy.Ecliptic(equatorialCoordinates.vec);
		this.geocentricLongitude = ecliptic.elon;
	}
}