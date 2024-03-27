import { BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';
import { formatTimezoneOffset, formatUnixTimestamp } from '../utils/formatters';

type WeatherLocationCardProps = { weatherData: BaseWeatherResponseData };
export const WeatherLocationCard = ({ weatherData }: WeatherLocationCardProps) => {
  return (
    <li className="w-80 min-h-64 shadow-md rounded">
      <div className="rounded-t flex justify-between items-center min-h-20 px-4 bg-gradient-to-r from-amber-500 to-amber-400">
        <div className="flex flex-col py-4">
          <h2 className="text-2xl font-bold">{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
          <label className="text-sm text-gray-700 font-medium">
            {weatherData.weather[0].description}
          </label>
        </div>
        <div className="w-32 h-auto">
          <img
            className="w-full h-full object-cover"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
        </div>
      </div>
      <div className="bg-white min-h-36 flex items-center gap-10 px-4">
        <div style={{ fontFamily: 'Arial' }} className="text-6xl font-bold tracking-[-5px] w-1/2">
          {Math.round(weatherData.main.temp)}°C
        </div>
        <div className="w-1/2">
          <label className="font-bold w-full border-b-2 border-gray-400 block my-2">Details</label>
          <ul className="text-xs pb-2 flex flex-col gap-[4px]">
            <li className="flex justify-between items-end">
              <label>Feels like</label>
              <label className="font-bold text-[13px]">
                {Math.round(weatherData.main.feels_like)}°C
              </label>
            </li>
            <li className="flex justify-between items-end">
              <label>Wind</label>
              <label className="font-bold text-[13px]">
                {Math.round(weatherData.wind.speed)}m/s
              </label>
            </li>
            <li className="flex justify-between items-end">
              <label>Humidity</label>
              <label className="font-bold text-[13px]">{weatherData.main.humidity}%</label>
            </li>
            <li className="flex justify-between items-end">
              <label>Min Temp</label>
              <label className="font-bold text-[13px]">
                {Math.round(weatherData.main.temp_min)}°C
              </label>
            </li>
            <li className="flex justify-between items-end">
              <label>Max Temp</label>
              <label className="font-bold text-[13px]">
                {Math.round(weatherData.main.temp_max)}°C
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="rounded-b text-xs h-8 bg-gradient-to-r from-amber-500 to-amber-400 flex justify-end items-center p-2">
        <label className="text-[12px]">
          {formatUnixTimestamp(weatherData.dt, weatherData.timezone)}, &nbsp;
          {formatTimezoneOffset(weatherData.timezone)}
        </label>
      </div>
    </li>
  );
};
