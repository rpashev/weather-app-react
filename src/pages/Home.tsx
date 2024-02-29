import { useEffect, useState } from 'react';
import weatherApiService from '../services/weather-api.service';
import { useSpinner } from '../context/spinner-context';

export const Home = () => {
  const [weatherIconSrc, setWeatherIconSrc] = useState(null);

  useEffect(() => {
    weatherApiService.getCurrentWeather({ lat: '10.99', lon: '44.34' }).then((data: any) => {
      setWeatherIconSrc(data.data?.weather[0]?.icon);
    });
    weatherApiService
      .getFiveDaysHourlyWeather({ lat: '10.99', lon: '44.34' })
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      {weatherIconSrc && (
        <img src={`https://openweathermap.org/img/wn/${weatherIconSrc}@2x.png`}></img>
      )}
    </div>
  );
};
