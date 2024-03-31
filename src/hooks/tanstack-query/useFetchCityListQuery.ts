import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import {
  CityListWeatherApiResponseSchema,
  CityListWeatherApiResponseData,
} from '../../schemas/CityListWeatherApiSchema';
import { zodParseResult } from '../../utils/zod-parse';
import { useSnackbar } from '../../context/snackbar-context';

export const useFetchCityListQuery = (searchTerm: string) => {
  const { showSnackbar } = useSnackbar();

  return useQuery<CityListWeatherApiResponseData, AxiosError>({
    queryKey: ['search-city', searchTerm],
    queryFn: async () => {
      try {
        const response = await weatherApiService.getCitiesList(searchTerm);
        return zodParseResult(response.data, CityListWeatherApiResponseSchema);
      } catch (err) {
        showSnackbar('Failed to load list!', 'error');
      }
    },
    enabled: false,
  });
};
