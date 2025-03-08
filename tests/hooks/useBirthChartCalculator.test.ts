import useBirthChartCalculator from '../../src/hooks/useBirthChartCalculator';
import { describe, it, expect } from 'vitest'
import * as Astronomy from "astronomy-engine"

describe('useBirthChartCalculator', () => {
	describe('For date 25/10/1993, 19:30 in Campinas - Brazil', () => {
		const mockedDate = '1993-10-25';
		const mockedTime = '19:30';
		const mockedTimeZone = 'UTC-2';
		const observer = new Astronomy.Observer(-22.9056391, -47.059564, 0);
		const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone, observer);
	
		it('should calculate correctly the angles given', () => {
			const res = birthChartCalculator
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

	describe('For date 09/03/1959, 19:30 in Campinas - Brazil', () => {
		const mockedDate = '1959-03-09';
		const mockedTime = '19:30';
		const mockedTimeZone = 'UTC-2';
		const observer = new Astronomy.Observer(-22.9056391, -47.059564, 0);
		const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone, observer);
	
		it('should calculate correctly the angles given', () => {
			const res = birthChartCalculator;
			expect(res).toStrictEqual({
				sun: {
					sign: 'Pisces',
					longitude: expect.any(Number),
				},
				moon: {
					sign: 'Pisces',
					longitude: expect.any(Number),
				},
				mercury: {
					sign: 'Aries',
					longitude: expect.any(Number),
				},
				venus: {
					sign: 'Aries',
					longitude: expect.any(Number),
				},
				mars: {
					sign: 'Gemini',
					longitude: expect.any(Number),
				},
				jupiter: {
					sign: 'Sagittarius',
					longitude: expect.any(Number),
				},
				saturn: {
					sign: 'Capricorn',
					longitude: expect.any(Number),
				},
				uranus: {
					sign: 'Leo',
					longitude: expect.any(Number),
				},
				neptune: {
					sign: 'Scorpio',
					longitude: expect.any(Number),
				},
				pluto: {
					sign: 'Virgo',
					longitude: expect.any(Number),
				},
			})
		});
	});

	describe('For date 05/02/1979, 15:17 in Starnberg - Germany', () => {
		const mockedDate = '1979-02-05';
		const mockedTime = '15:17';
		const mockedTimeZone = 'UTC-2';
		const observer = new Astronomy.Observer(47.9986851, 11.3410791, 0);
		const birthChartCalculator = useBirthChartCalculator(mockedDate, mockedTime, mockedTimeZone, observer);
	
		it('should calculate correctly the angles given', () => {
			const res = birthChartCalculator;
			expect(res).toStrictEqual({
				sun: {
					sign: 'Aquarius',
					longitude: expect.any(Number),
				},
				moon: {
					sign: 'Gemini',
					longitude: expect.any(Number),
				},
				mercury: {
					sign: 'Aquarius',
					longitude: expect.any(Number),
				},
				venus: {
					sign: 'Capricorn',
					longitude: expect.any(Number),
				},
				mars: {
					sign: 'Aquarius',
					longitude: expect.any(Number),
				},
				jupiter: {
					sign: 'Leo',
					longitude: expect.any(Number),
				},
				saturn: {
					sign: 'Virgo',
					longitude: expect.any(Number),
				},
				uranus: {
					sign: 'Scorpio',
					longitude: expect.any(Number),
				},
				neptune: {
					sign: 'Sagittarius',
					longitude: expect.any(Number),
				},
				pluto: {
					sign: 'Libra',
					longitude: expect.any(Number),
				},
			})
		});
	});
});
