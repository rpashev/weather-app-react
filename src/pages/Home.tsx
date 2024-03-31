import { useEffect, useState } from 'react';
import { CityGeoDataResponse } from '../common/types';
import { WeatherLocationCard } from '../components/WeatherLocationCard';
import { WeatherSearchLocationInput } from '../components/WeatherSearchLocationInput';
import { useFetchTrackedLocationsQuery } from '../hooks/tanstack-query/useFetchTrackedLocationsQuery';
import { useAuth } from '../context/user-context';

export const Home = () => {
  const { isLoggedIn } = useAuth();

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

  return (
    <section className="w-full">
      <section className="max-w-80 flex flex-col justify-center mx-auto">
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
          <h2 className="text-3xl text-slate-100 text-center">Tracked locations</h2>
          <ul className="w-full grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 mt-6 justify-items-center">
            {trackedLocationList &&
              trackedLocationList.locations?.length &&
              trackedLocationList.locations.map((location) => {
                return (
                  <WeatherLocationCard
                    key={location.id}
                    coords={{ lon: location.lon, lat: location.lat }}
                    id={location.id}
                  />
                );
              })}
          </ul>
          {!trackedLocationList?.locations?.length && (
            <p className="text-slate-100 text-center">No tracked locations yet. </p>
          )}
        </section>
      )}
    </section>
  );
};
