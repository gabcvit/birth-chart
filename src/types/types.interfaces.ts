export interface City {
	display_name: string;
	lat: string;
	lon: string;
	place_id: string;
	timeZone?: string
}

interface BirthData {
	date: string;
	time: string;
	timezoneOffset: number;
	latitude: number;
	longitude: number;
}