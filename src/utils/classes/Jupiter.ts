import { CelestialBody } from './CelestialBody';
import * as Astronomy from "astronomy-engine"
import {Body} from 'astronomy-engine'

export class Jupiter extends CelestialBody {

	constructor(date: string, time: string, timeZone: string, observer: Astronomy.Observer) {
		super(date, time, timeZone, Body.Jupiter);
		this.calculateGeocentricLongitude(observer);
	}

	getGeocentricLongitude() {
		return this.geocentricLongitude;
	}
}