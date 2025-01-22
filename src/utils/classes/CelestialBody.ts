import { calculateJulianDate } from '../helpers';

export class CelestialBody {
	protected julianDate: number;
	protected date: string;
	protected time: string;
	protected timeZone: string;
	protected geocentricLongitude: number = 0;
	
	constructor(
		date: string,
		time: string,
		timeZone: string
	) {
		this.date = date;
		this.time = time;
		this.timeZone = timeZone;
		this.julianDate = calculateJulianDate(date, time, timeZone);
	}

	getZodiacSign(): string {
		const zodiacSigns = [
			"Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
			"Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
		];
	
		const index = Math.floor(this.geocentricLongitude / 30);
		return zodiacSigns[index];
	};
}