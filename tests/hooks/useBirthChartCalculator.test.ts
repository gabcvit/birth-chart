import useBirthChartCalculator from '../../src/hooks/useBirthChartCalculator';
import { describe, it, expect } from 'vitest'

describe('useBirthChartCalculator', () => {
	it('should calculate correctly the angles given', () => {
		const mockedDate = '1993-10-25';
		const mockedTime = '19:30';
		const mockedTimeZone = 'UTC-3';

		const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone);
		const res = birthChartCalculator.calculate()
		expect(res).toBe({
			sun: 2.32
		})
	});
});
