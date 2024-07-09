// REACT
import { useState } from 'react';
// COMPONENTS
import { WeatherMapComponent } from '../components/WeatherMapComponent';
import { WeatherMapLegend } from '../components/WeatherMapLegend';
// HOOKS
import { useFetchTrackedLocationsQuery } from '../hooks/tanstack-query/useFetchTrackedLocationsQuery';
import { useAuthContext } from '../context/user-context';
// TYPES
import { type WeatherMapLayerType } from '../common/types';
import { useSettingsContext } from '../context/settings-context';

export const WeatherMap = () => {
  const { translations } = useSettingsContext();
  const { isLoggedIn } = useAuthContext();

  const { data: trackedLocationList } = useFetchTrackedLocationsQuery();

  const [weatherLayer, setWeatherLayer] = useState<WeatherMapLayerType>('temp');
  const [showOnlyTrackedLocations, setShowOnlyTrackedLocations] = useState(false);
  const [filtersShowed, setFiltersShowed] = useState(true);

  if (!trackedLocationList && isLoggedIn) return;
  return (
    <div className="w-screen relative overflow-hidden">
      <div
        className={`${filtersShowed ? 'translate-x-0' : 'translate-x-full'} transition-all ease-out duration-300 absolute top-0 right-0 opacity-70`}
        style={{ zIndex: 1000 }}
      >
        <div
          onClick={() => setWeatherLayer('temp')}
          className={`flex flex-col bg-white
                   items-center rounded-t
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'temp' && 'bg-stone-200'}`}
        >
          {translations?.pages.map.legTemp}
        </div>
        <div
          onClick={() => setWeatherLayer('wind')}
          className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'wind' && 'bg-stone-200'}`}
        >
          {translations?.pages.map.filtWind}
        </div>
        <div
          onClick={() => setWeatherLayer('precipitation')}
          className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'precipitation' && 'bg-stone-200'}`}
        >
          {translations?.pages.map.legPrecip}
        </div>
        <div
          onClick={() => setWeatherLayer('pressure')}
          className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'pressure' && 'bg-stone-200'}`}
        >
          {translations?.pages.map.legPressure}
        </div>
        <div
          onClick={() => setWeatherLayer('clouds')}
          className={`flex flex-col bg-white 
                   items-center
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'clouds' && 'bg-stone-200'}`}
        >
          {translations?.pages.map.filtClouds}
        </div>
        {isLoggedIn && (
          <label
            htmlFor="checkboxTracked"
            className="text-xs border border-t-gray-200 bg-white px-2 py-[10px] flex items-center gap-2 rounded-b cursor-pointer cursor-pointer-children"
          >
            <input
              type="checkbox"
              id="checkboxTracked"
              className="h-[14px] w-[14px] accent-blue-500 cursor-pointer"
              checked={showOnlyTrackedLocations}
              onChange={() => setShowOnlyTrackedLocations((prev) => !prev)}
            />
            {translations?.pages.map.checkbox}
          </label>
        )}
      </div>
      <div className="flex justify-end absolute right-0 top-[240px]" style={{ zIndex: 1000 }}>
        <button
          onClick={() => setFiltersShowed(!filtersShowed)}
          className="bg-white hover:bg-slate-200 transition-all w-10 h-10 flex items-center text-[27px] justify-center"
        >
          <span className={`${filtersShowed ? 'rotate-180' : ''} transition-all duration-200`}>
            {'<'}
          </span>
        </button>
      </div>
      <WeatherMapLegend weatherLayer={weatherLayer} />
      <WeatherMapComponent
        weatherLayer={weatherLayer}
        locations={trackedLocationList ? trackedLocationList : undefined}
        showOnlyTrackedLocations={showOnlyTrackedLocations}
      />
    </div>
  );
};
