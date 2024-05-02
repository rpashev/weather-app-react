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

export const WeatherMap = () => {
  const { isLoggedIn } = useAuthContext();

  const { data: trackedLocationList } = useFetchTrackedLocationsQuery();

  const [weatherLayer, setWeatherLayer] = useState<WeatherMapLayerType>('temp');
  const [showOnlyTrackedLocations, setShowOnlyTrackedLocations] = useState(false);
  const [filtersShowed, setFiltersShowed] = useState(true);

  if (!trackedLocationList && isLoggedIn) return;
  return (
    <div className="w-screen relative">
      <div className="absolute top-0 right-0 flex items-start opacity-70" style={{ zIndex: 1000 }}>
        <div className="overflow-hidden">
          <div
            className={`${filtersShowed ? 'translate-x-0' : 'translate-x-full'} relative transition-all ease-out duration-300`}
          >
            <div
              onClick={() => setWeatherLayer('temp')}
              className={`flex flex-col bg-white
                   items-center rounded-t
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'temp' && 'bg-slate-200'}`}
            >
              Temperature
            </div>
            <div
              onClick={() => setWeatherLayer('wind')}
              className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'wind' && 'bg-slate-200'}`}
            >
              Wind
            </div>
            <div
              onClick={() => setWeatherLayer('precipitation')}
              className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'precipitation' && 'bg-slate-200'}`}
            >
              Precipitation
            </div>
            <div
              onClick={() => setWeatherLayer('pressure')}
              className={`flex flex-col bg-white 
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'pressure' && 'bg-slate-200'}`}
            >
              Pressure
            </div>
            <div
              onClick={() => setWeatherLayer('clouds')}
              className={`flex flex-col bg-white 
                   items-center
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${weatherLayer === 'clouds' && 'bg-slate-200'}`}
            >
              Clouds
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
                Show tracked locations
              </label>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setFiltersShowed(!filtersShowed)}
              className="bg-white hover:bg-slate-200 transition-all w-10 h-10 flex items-center text-[27px] justify-center"
            >
              <span className={`${filtersShowed ? 'rotate-180' : ''} transition-all duration-200`}>
                {'<'}
              </span>
            </button>
          </div>
        </div>
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
