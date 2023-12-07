export const DIV_ID = "nav-footer"
export const WEATHER_API_KEY = '8af0858deb18454d8fa105418230512';
export const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';
export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const ICON_URL = '//cdn.weatherapi.com/weather/64x64/day/';

export const TEMP_MAP: { range: { min: number; max: number }; info: { icon: string; text: string } }[] = [
    { range: { min: -Infinity, max: 0 }, info: { icon: `${ICON_URL}338.png`, text: 'Snowy and Cold, Be Careful' } },
    { range: { min: 0, max: 10 }, info: { icon: `${ICON_URL}308.png`, text: 'Cold' } },
    { range: { min: 10, max: 17 }, info: { icon: `${ICON_URL}122.png`, text: 'Cloudy' } },
    { range: { min: 17, max: 25 }, info: { icon: `${ICON_URL}116.png`, text: 'Partly Cloudy' } },
    { range: { min: 25, max: 30 }, info: { icon: `${ICON_URL}374.png`, text: 'Nice Day' } },
    { range: { min: 30, max: 40 }, info: { icon: `${ICON_URL}113.png`, text: 'Sunny Day' } },
    { range: { min: 40, max: Infinity }, info: { icon: `${ICON_URL}113.png`, text: 'So Hot, Stay Home' } },
];
