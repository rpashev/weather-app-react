import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';

export const useFetchCityListQuery = (searchTerm: string) => {
  return useQuery<any, AxiosError>({
    queryKey: ['search-city', searchTerm],
    queryFn: () => weatherApiService.getCitiesList(searchTerm),
    enabled: false,
  });
};
