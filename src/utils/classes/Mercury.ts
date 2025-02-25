import { CelestialBody } from './CelestialBody';
import * as Astronomy from "astronomy-engine"
import {Body} from 'astronomy-engine'

export class Mercury extends CelestialBody {
	constructor(date: string, time: string, timeZone: string, observer: Astronomy.Observer) {
		super(date, time, timeZone, Body.Mercury);
		this.calculateGeocentricLongitude(observer);
	}
}