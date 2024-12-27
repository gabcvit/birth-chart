import { render, screen, cleanup } from '@testing-library/vue'
import ResultPage from '../../src/views/ResultPage.vue'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import renderWithRouter from '../renderWithRouter'

describe('Result page', async () => {
	const mockedUrlParams = {
		birthdate: '1995-11-21',
		birthtime: '15:30',
		lat: '40.7127281',
		lon: '-74.0060152'
	}

	const generateUrlParamsString = (urlParams = mockedUrlParams) => {
		return Object.keys(urlParams).map((key) => `${key}=${urlParams[key]}`).join('&')
	}
	beforeEach(() => {
		vi.clearAllMocks();
	})

	afterEach(() => {
		cleanup();
	});

	it('should render the result page and all the required elements, matching the url params given', async () => {
		await renderWithRouter(ResultPage, {}, `/birth-chart/result?${generateUrlParamsString()}`)
		expect(screen.getByText('Your birth chart')).toBeInTheDocument()
		expect(screen.getByText('Date of birth: Tue Nov 21 1995')).toBeInTheDocument()
		expect(screen.getByText('Time of birth: 15:30')).toBeInTheDocument()
		expect(screen.getByText('Latitude: 40.7127281')).toBeInTheDocument()
		expect(screen.getByText('Longitude: -74.0060152')).toBeInTheDocument()
	});

	it.each(['birthdate',
		'birthtime',
		'lon',
		'lat'
	])('should show an error message when the url param is %s missing ', async (urlParamMissing: string) => {
		const copyOfMockedUrlParams = { ...mockedUrlParams }
		delete copyOfMockedUrlParams[urlParamMissing]
		await renderWithRouter(ResultPage, {}, `/birth-chart/result?${generateUrlParamsString(copyOfMockedUrlParams)}`)
		expect(screen.getByText('It was not possible to generate your birth chart')).toBeInTheDocument()
		expect(screen.getByText('Please go back to the initial form page and fill in the necessary data')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Go back to form' })).toBeInTheDocument()
	});
})