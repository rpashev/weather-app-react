import axios from 'axios';
type Coordinates = {
  lat: number;
  lon: number;
};

export default {
  // TODO: add units
  getCurrentWeather(coordinates: Coordinates, units: string) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
  getCurrentWeatherIcon(iconCode: string) {
    return axios.get(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
  },

  getFiveDaysHourlyWeather(coordinates: Coordinates, units: string) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
  // TODO: leaflet
  getWeatherMap() {
    return axios.get(
      `https://tile.openweathermap.org/map/clouds_new/0/0/0.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
  getCitiesList(query: string) {
    return axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
};
