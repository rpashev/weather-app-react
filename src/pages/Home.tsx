import { useEffect, useRef, useState } from 'react';
import locationsService from '../services/locations.service';
import { CityGeoDataResponse } from '../common/types';
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
import { useSpinnerContext } from '../context/spinner-context';
import { WeatherLocationCard } from '../components/WeatherLocationCard';
import { WeatherSearchLocationInput } from '../components/WeatherSearchLocationInput';

export const Home = () => {
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const [selectedCity, setSelectedCity] = useState<CityGeoDataResponse | null>(null);

  const { data: selectedCityData, refetch: fetchSelectedCityData } = useFetchCityDataQuery({
    lon: selectedCity?.lon!,
    lat: selectedCity?.lat!,
  });

  useEffect(() => {
    locationsService
      .getTrackedLocations()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      showSpinner();
      fetchSelectedCityData().finally(() => hideSpinner());
    }
  }, [selectedCity]);

  return (
    <div>
      <WeatherSearchLocationInput setSelectedCity={setSelectedCity} />

      <ul className="mt-6">
        {selectedCityData && <WeatherLocationCard weatherData={selectedCityData} />}
      </ul>
    </div>
  );
};
