import axios from 'axios';
type CurrentWeatherType = {
  lat: string;
  lon: string;
};
export default {
  // TODO: add units
  getCurrentWeather(coordinates: CurrentWeatherType) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
  getCurrentWeatherIcon(iconCode: string) {
    return axios.get(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
  },

  getFiveDaysHourlyWeather(coordinates: CurrentWeatherType) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
  // TODO: leaflet
  getWeatherMap() {
    return axios.get(
      `https://tile.openweathermap.org/map/clouds_new/0/0/0.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
  },
};
