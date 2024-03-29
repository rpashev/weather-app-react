import { useState } from 'react';
import { CityGeoDataResponse } from '../common/types';
import { WeatherLocationCard } from '../components/WeatherLocationCard';
import { WeatherSearchLocationInput } from '../components/WeatherSearchLocationInput';
import { useFetchTrackedLocationsQuery } from '../hooks/tanstack-query/useFetchTrackedLocationsQuery';
import { useAuth } from '../context/user-context';

export const Home = () => {
  const { isLoggedIn } = useAuth();

  const [selectedCity, setSelectedCity] = useState<CityGeoDataResponse | null>(null);

  const { data: trackedLocationList } = useFetchTrackedLocationsQuery();

  return (
    <section className="w-full">
      <section className="max-w-80 flex flex-col justify-center mx-auto">
        <WeatherSearchLocationInput setSelectedCity={setSelectedCity} />

        <ul className="mt-6">
          {selectedCity && (
            <WeatherLocationCard coords={{ lon: selectedCity.lon, lat: selectedCity.lat }} />
          )}
        </ul>
      </section>
      {isLoggedIn && (
        <section className="mt-4 mx-auto">
          <h2 className="text-3xl text-slate-100 text-center">Tracked locations</h2>
          <ul className="w-full grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10 mt-6 justify-items-center">
            {trackedLocationList &&
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
          {trackedLocationList?.locations.length === 0 && (
            <p className="text-slate-100 text-center mt-4">No tracked locations yet. </p>
          )}
        </section>
      )}
    </section>
  );
};
