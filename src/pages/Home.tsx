// REACT
import { useEffect, useState } from 'react';
// COMPONENTS
import { WeatherLocationCard } from '../components/WeatherLocationCard';
import { WeatherSearchLocationInput } from '../components/WeatherSearchLocationInput';
import { WeatherLocationsEditDialog } from '../components/WeatherLocationsEditDialog';
import { PencilIcon } from '@heroicons/react/24/solid';
// HOOKS
import { useFetchTrackedLocationsQuery } from '../hooks/tanstack-query/useFetchTrackedLocationsQuery';
import { useAuthContext } from '../context/user-context';
// TYPES
import { type CityGeoDataResponse } from '../common/types';
import { useSettingsContext } from '../context/settings-context';
import { Tooltip } from '../components/UI/Tooltip';

export const Home = () => {
  const { isLoggedIn } = useAuthContext();
  const { translations } = useSettingsContext();
  const [selectedCity, setSelectedCity] = useState<CityGeoDataResponse | null>(null);

  const { data: trackedLocationList } = useFetchTrackedLocationsQuery();

  const [locationAlreadyTracked, setLocationAlreadyAdded] = useState(false);

  useEffect(() => {
    if (!trackedLocationList || !selectedCity) return;
    if (
      trackedLocationList?.locations?.some(
        (location) => location.lat === selectedCity.lat && location.lon === selectedCity.lon
      )
    ) {
      setLocationAlreadyAdded(true);
    } else {
      setLocationAlreadyAdded(false);
    }
  }, [selectedCity, trackedLocationList]);

  const [locationsEditDialogIsOpen, setLocationsEditDialogIsOpen] = useState(false);
  const openLocationsEditDialog = () => {
    setLocationsEditDialogIsOpen(true);
  };

  return (
    <div className="max-container py-4">
      <section className="w-full">
        <section className="max-w-80 w-80 flex flex-col justify-center mx-auto mt-3">
          <WeatherSearchLocationInput setSelectedCity={setSelectedCity} />

          <ul className="my-6">
            {selectedCity && (
              <WeatherLocationCard
                coords={{ lon: selectedCity.lon, lat: selectedCity.lat }}
                locationAlreadyTracked={locationAlreadyTracked}
              />
            )}
          </ul>
        </section>
        {isLoggedIn && (
          <section className="mt-4 mx-auto">
            <h2 className="text-3xl dark:text-slate-100 text-slate-800 text-center flex items-center justify-center">
              <span>{translations?.pages.home?.titleTracked}</span>
              <Tooltip
                content={translations?.pages.home?.editLocationsTooltip!}
                positionClasses="-top-12 right-0"
              >
                <button
                  onClick={openLocationsEditDialog}
                  className="block ml-1 p-1 -mt-5 hover:bg-slate-500 transition-all"
                >
                  <PencilIcon className="w-[18px] text-amber-500" />
                </button>
              </Tooltip>
            </h2>
            <ul className="w-full flex gap-12 my-6 place-items-center place-content-center flex-wrap">
              {(trackedLocationList &&
                trackedLocationList.locations?.length &&
                trackedLocationList.locations.map((location) => {
                  return (
                    <WeatherLocationCard
                      key={location.id}
                      coords={{ lon: location.lon, lat: location.lat }}
                      id={location.id}
                    />
                  );
                })) ||
                null}
            </ul>
            {!trackedLocationList?.locations?.length && (
              <p className="dark:text-slate-100 text-slate-800 text-center">
                {translations?.pages.home?.noTrackedLocationsLabel}
              </p>
            )}
          </section>
        )}
      </section>
      {locationsEditDialogIsOpen && trackedLocationList?.locations.length && (
        <WeatherLocationsEditDialog
          setLocationsEditDialogIsOpen={setLocationsEditDialogIsOpen}
          trackedLocationList={trackedLocationList}
        />
      )}
    </div>
  );
};
