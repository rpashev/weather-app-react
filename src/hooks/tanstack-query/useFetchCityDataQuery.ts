import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import { CityGeoData } from '../../common/types';

export const useFetchCityDataQuery = (selectedCity: CityGeoData | null) => {
  return useQuery<any, AxiosError>({
    queryKey: ['selected-city', { lon: selectedCity?.lon!, lat: selectedCity?.lat! }],
    queryFn: () =>
      weatherApiService.getCurrentWeather({ lon: selectedCity?.lon!, lat: selectedCity?.lat! }),
    enabled: false,
  });
};
