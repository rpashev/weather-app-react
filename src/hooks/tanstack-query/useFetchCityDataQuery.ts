// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from '../../context/snackbar-context';
// SERVICES
import weatherApiService from '../../services/weather-api.service';
// TYPES & SCHEMAS
import { WeatherSchema, type BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';
import { type CoordinatesWeatherApi } from '../../common/types';
import { type AxiosError } from 'axios';
// UTILS
import { zodParseResult } from '../../utils/zod-parse';

export const useFetchCityDataQuery = (
  coordinates: CoordinatesWeatherApi | null,
  enabled = true
) => {
  const { showSnackbar } = useSnackbar();

  return useQuery<BaseWeatherResponseData, AxiosError>({
    queryKey: ['selected-city', { lon: coordinates?.lon!, lat: coordinates?.lat! }],
    queryFn: async () => {
      try {
        const response = await weatherApiService.getCurrentWeather({
          lon: coordinates?.lon!,
          lat: coordinates?.lat!,
        });
        return zodParseResult(response.data, WeatherSchema);
      } catch (err) {
        showSnackbar('Failed to load city!', 'error');
      } finally {
      }
    },
    enabled,
  });
};
