import { Body, Observer, Ecliptic, Equator } from 'astronomy-engine'
import { DateTime } from 'luxon';

export class CelestialBody {
	protected dateTime: Date;
	protected body: Body = Body.Star1;
	protected geocentricLongitude = 0;
	
	constructor(
		date: string,
		time: string,
		timeZone: string,
		body: Body,
	) {
		this.dateTime = DateTime.fromISO(`${date}T${time}`, { zone: timeZone }).toUTC().toJSDate();
		this.body = body;
	}

	getZodiacSign(): string {
		const zodiacSigns = [
			"Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
			"Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
		];
	
		const index = Math.floor(this.geocentricLongitude / 30);
		return zodiacSigns[index];
	};

	getGeocentricLongitude() {
		return this.geocentricLongitude;
	}

	calculateGeocentricLongitude(observer: Observer) {
		const equatorialCoordinates = Equator(this.body, this.dateTime, observer, true, true);
		const ecliptic = Ecliptic(equatorialCoordinates.vec);
		this.geocentricLongitude = ecliptic.elon;
	}
}