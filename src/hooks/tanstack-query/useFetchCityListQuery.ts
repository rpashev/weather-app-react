import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import {
  CityListWeatherApiResponseSchema,
  CityListWeatherApiResponseData,
} from '../../schemas/CityListWeatherApiSchema';
import { zodParseResult } from '../../utils/zod-parse';

export const useFetchCityListQuery = (searchTerm: string) => {
  return useQuery<CityListWeatherApiResponseData, AxiosError>({
    queryKey: ['search-city', searchTerm],
    queryFn: async () => {
      const response = await weatherApiService.getCitiesList(searchTerm);
      return zodParseResult(response.data, CityListWeatherApiResponseSchema);
    },
    enabled: false,
  });
};
