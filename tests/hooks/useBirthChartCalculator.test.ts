import useBirthChartCalculator from '../../src/hooks/useBirthChartCalculator';
import { describe, it, expect } from 'vitest'
import * as Astronomy from "astronomy-engine"

describe('useBirthChartCalculator', () => {
	const mockedDate = '1993-10-25';
	const mockedTime = '19:30';
	const mockedTimeZone = 'UTC-2';
	const observer = new Astronomy.Observer(-22.9056391, -47.059564, 0);
	const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone, observer);

	it('should calculate correctly the angles given', () => {
		
		const res = birthChartCalculator.calculate()
		expect(res).toStrictEqual({
			sun: {
				sign: 'Scorpio',
				longitude: expect.any(Number),
			},
			moon: {
				sign: 'Pisces',
				longitude: expect.any(Number),
			},
			mercury: {
				sign: 'Scorpio',
				longitude: expect.any(Number),
			},
			venus: {
				sign: 'Libra',
				longitude: expect.any(Number),
			},
			mars: {
				sign: 'Scorpio',
				longitude: expect.any(Number),
			},
			jupiter: {
				sign: 'Libra',
				longitude: expect.any(Number),
			},
			saturn: {
				sign: 'Aquarius',
				longitude: expect.any(Number),
			},
			uranus: {
				sign: 'Capricorn',
				longitude: expect.any(Number),
			},
			neptune: {
				sign: 'Capricorn',
				longitude: expect.any(Number),
			},
			pluto: {
				sign: 'Scorpio',
				longitude: expect.any(Number),
			},
		})
	});
});
