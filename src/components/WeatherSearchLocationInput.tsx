import { useState, useRef, useEffect } from 'react';
import { type CityGeoDataResponse } from '../common/types';
import { useFetchCityListQuery } from '../hooks/tanstack-query/useFetchCityListQuery';

type WeatherSearchLocationInputProps = {
  setSelectedCity: React.Dispatch<React.SetStateAction<CityGeoDataResponse | null>>;
};

export const WeatherSearchLocationInput = ({
  setSelectedCity,
}: WeatherSearchLocationInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimerRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { data: cityListData, refetch: fetchCityList } = useFetchCityListQuery(searchTerm);

  const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
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

  const handleSelectCity = (city: CityGeoDataResponse) => {
    setSearchTerm(`${city.name}, ${city.country}`);
    setSelectedCity(city);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!cityListData?.length) return;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, cityListData.length - 1));
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex !== -1 && cityListData) {
          handleSelectCity(cityListData[selectedIndex] as CityGeoDataResponse);
          setSelectedIndex(-1); // Reset selectedIndex after selection
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <input
          type="search"
          id="search"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          className="tw-text-input border-slate-200"
          autoComplete="off"
          placeholder="Search location..."
          onKeyDown={handleKeyDown}
        />
        {cityListData && cityListData.length > 0 && (
          <ul className="absolute top-full z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full">
            {cityListData.map((city: any, index: number) => (
              <li
                key={index}
                className={`px-4 py-1 cursor-pointer text-sm hover:bg-gray-100 ${
                  index === selectedIndex ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSelectCity(city)}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      {cityListData?.length === 0 && (
        <p className="text-slate-100 text-sm mt-1">No results found!</p>
      )}
    </>
  );
};
