import { calculateJulianDate } from '../../src/utils/helpers';
import { describe, it, expect } from 'vitest'

describe('helpers', () => {
	const mockedDate = '1993-10-25';
	const mockedTime = '19:30';
	const mockedTimeZone = 'UTC-2';
	const mockedJulianDate = 2449286.3958333335;

	it('should calculate julian date correctly', () => {
		const res = calculateJulianDate(mockedDate, mockedTime, mockedTimeZone);
		expect(res).toBe(mockedJulianDate)
	});
});
