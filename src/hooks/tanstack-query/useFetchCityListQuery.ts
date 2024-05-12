// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
// TYPES & SCHEMAS
import { type AxiosError } from 'axios';
import {
  CityListWeatherApiResponseSchema,
  type CityListWeatherApiResponseData,
} from '../../schemas/CityListWeatherApiSchema';
// SERVICES
import weatherApiService from '../../services/weather-api.service';
// UTILS
import { zodParseResult } from '../../utils/zod-parse';
import { useSettingsContext } from '../../context/settings-context';

export const useFetchCityListQuery = (searchTerm: string) => {
  const { showSnackbar } = useSnackbarContext();
  const { translations } = useSettingsContext();

  return useQuery<CityListWeatherApiResponseData, AxiosError>({
    queryKey: ['search-city', searchTerm],
    queryFn: async () => {
      try {
        const response = await weatherApiService.getCitiesList(searchTerm);
        return zodParseResult(response.data, CityListWeatherApiResponseSchema);
      } catch (err) {
        showSnackbar(translations?.messages.errLoadList!, 'error');
      }
    },
    enabled: false,
  });
};
