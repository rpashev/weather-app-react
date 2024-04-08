import { useState } from 'react';
import { WeatherMapComponent } from '../components/WeatherMapComponent';
import { WeatherMapLegend } from '../components/WeatherMapLegend';
import { type WeatherMapLayerType } from '../common/types';

export const WeatherMap = () => {
  const [weatherLayer, setWeatherLayer] = useState<WeatherMapLayerType>('temp');
  return (
    <div className="w-screen relative">
      <div className="absolute top-0 right-0 w-[200px] z-50 bg-white opacity-85">
        <div
          onClick={() => setWeatherLayer('temp')}
          className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'temp' && 'bg-slate-200'}`}
        >
          Temperature
        </div>
        <div
          onClick={() => setWeatherLayer('wind')}
          className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'wind' && 'bg-slate-200'}`}
        >
          Wind
        </div>
        <div
          onClick={() => setWeatherLayer('precipitation')}
          className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'precipitation' && 'bg-slate-200'}`}
        >
          Precipitation
        </div>
        <div
          onClick={() => setWeatherLayer('pressure')}
          className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'pressure' && 'bg-slate-200'}`}
        >
          Pressure
        </div>
        <div
          onClick={() => setWeatherLayer('clouds')}
          className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'clouds' && 'bg-slate-200'}`}
        >
          Clouds
        </div>
      </div>
      <WeatherMapLegend weatherLayer={weatherLayer} />
      <WeatherMapComponent weatherLayer={weatherLayer} />
    </div>
  );
};
