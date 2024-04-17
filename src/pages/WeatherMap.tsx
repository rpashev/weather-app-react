import { useState } from 'react';
import { WeatherMapComponent } from '../components/WeatherMapComponent';
import { WeatherMapLegend } from '../components/WeatherMapLegend';
import { type WeatherMapLayerType } from '../common/types';
import { useFetchTrackedLocationsQuery } from '../hooks/tanstack-query/useFetchTrackedLocationsQuery';

export const WeatherMap = () => {
  const { data: trackedLocationList } = useFetchTrackedLocationsQuery();

  const [weatherLayer, setWeatherLayer] = useState<WeatherMapLayerType>('temp');
  const [showOnlyTrackedLocations, setShowOnlyTrackedLocations] = useState(false);
  if (!trackedLocationList) return;
  return (
    <div className="w-screen relative">
      <div
        className="absolute top-0 right-0 z-50 flex items-start opacity-85"
        style={{ zIndex: 1000 }}
      >
        <label
          htmlFor="checkboxTracked"
          className="text-sm bg-white px-2 py-[10px] flex items-center gap-2 rounded-l cursor-pointer cursor-pointer-children mr-1"
        >
          <input
            type="checkbox"
            id="checkboxTracked"
            className="h-[14px] w-[14px] accent-blue-500 cursor-pointer"
            checked={showOnlyTrackedLocations}
            onChange={() => setShowOnlyTrackedLocations((prev) => !prev)}
          />
          Show only tracked locations
        </label>
        <div className="bg-white">
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
      </div>
      <WeatherMapLegend weatherLayer={weatherLayer} />
      {trackedLocationList?.locations && (
        <WeatherMapComponent
          weatherLayer={weatherLayer}
          locations={trackedLocationList}
          showOnlyTrackedLocations={showOnlyTrackedLocations}
        />
      )}
    </div>
  );
};
