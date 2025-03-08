import { DateTime } from 'luxon';
import { LocationQueryValue } from 'vue-router';

export const simplifyAngle = (angle: number): number => {
	const simplifiedAngle = angle % 360;
	if (simplifiedAngle < 0) {
		return 360 + simplifiedAngle;
	}
	return simplifiedAngle;
}

export const radToDeg = (rad: number): number => {
	return rad * (180 / Math.PI);
}

export const calculateJulianDate = (
	date: string,
	time: string,
	timeZone: string): number => {
	const dateTime = DateTime.fromISO(`${date}T${time}`, { zone: timeZone }).toUTC();

	let year = dateTime.year;
	let month = dateTime.month;
	const day = dateTime.day + dateTime.hour / 24 + dateTime.minute / 1440;

	if (month <= 2) {
		year -= 1;
		month += 12;
	}

	const A = Math.floor(year / 100);
	const B = 2 - A + Math.floor(A / 4);

	const julianDate = Math.floor(365.25 * (year + 4716))
		+ Math.floor(30.6001 * (month + 1))
		+ day + B - 1524.5;

	return julianDate;
};

export const capitalize = (s: string) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export const formatAngle = (angle: number) => {
	const degrees = Math.floor(angle);
	const minutes = Math.round((angle - degrees) * 60);
	return `${degrees}° ${minutes}'`;
}

export const extractStringFromLocationQueryValue = (query: LocationQueryValue | LocationQueryValue[] | undefined) => {
	if (Array.isArray(query)) {
		return query[0];
	}
	return query;
}

export const extractNumberFromLocationQueryValue = (query: LocationQueryValue | LocationQueryValue[] | undefined) => {
	const stringValue = extractStringFromLocationQueryValue(query);
	if (stringValue) {
		return parseFloat(stringValue);
	}
	return undefined;
}