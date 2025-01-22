import useBirthChartCalculator from '../../src/hooks/useBirthChartCalculator';
import { describe, it, expect, beforeEach } from 'vitest'

describe('useBirthChartCalculator', () => {
	const mockedDate = '1993-10-25';
	const mockedTime = '19:30';
	const mockedTimeZone = 'UTC-2';
	const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone);

	it('should calculate correctly the angles given', () => {
		const res = birthChartCalculator.calculate()
		expect(res).toStrictEqual({
			sun: {
				sign: 'Scorpio',
				longitude: 213
			},
			moon: {
				sign: 'Pisces',
				longitude: 339
			},
			mercury: {
				sign: 'Scorpio',
				longitude: 236,
			}
		})
	});
});
