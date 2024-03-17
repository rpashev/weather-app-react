import { useEffect, useRef, useState } from 'react';
import locationsService from '../services/locations.service';
import { useFetchCityListQuery } from '../hooks/tanstack-query/useFetchCityListQuery';
import { CityGeoData } from '../common/types';
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityGeoData | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const { data: cityListData, refetch: fetchCityList } = useFetchCityListQuery(searchTerm);
  const { data: selectedCityData, refetch: fetchSelectedCityData } =
    useFetchCityDataQuery(selectedCity);

  const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (value !== '') {
        fetchCityList();
      }
    }, 300);
  };

  const handleSelectCity = (city: CityGeoData) => {
    console.log(city);
    setSearchTerm(`${city.name}, ${city.country}`);
    setSelectedCity(city);
  };
  useEffect(() => {
    locationsService
      .getTrackedLocations()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    return () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchSelectedCityData();
    }
  }, [selectedCity]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Search city</label>
        <input
          type="search"
          id="search"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          className="tw-text-input"
        />
      </div>
      {cityListData?.data?.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1">
          {cityListData.data.map((city: any, index: number) => (
            <li
              key={index}
              className="px-4 py-1 cursor-pointer text-sm hover:bg-gray-100"
              onClick={() => handleSelectCity(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
      {cityListData?.data?.length === 0 && <p>No results found!</p>}

      {selectedCityData && <p>{selectedCityData.data?.main?.temp}</p>}
    </div>
  );
};
