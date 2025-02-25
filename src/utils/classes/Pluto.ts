import { CelestialBody } from './CelestialBody';
import * as Astronomy from "astronomy-engine"
import {Body} from 'astronomy-engine'

export class Pluto extends CelestialBody {
	constructor(date: string, time: string, timeZone: string, observer: Astronomy.Observer) {
		super(date, time, timeZone, Body.Pluto);
		this.calculateGeocentricLongitude(observer);
	}
}