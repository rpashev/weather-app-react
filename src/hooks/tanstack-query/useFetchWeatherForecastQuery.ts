// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbar } from '../../context/snackbar-context';
// SERVICES
import weatherApiService from '../../services/weather-api.service';
// TYPES & SCHEMAS
import { type AxiosError } from 'axios';
import { type CoordinatesWeatherApi } from '../../common/types';
import {
  WeatherForecastSchema,
  type WeatherForecastResponseData,
} from '../../schemas/WeatherForecastSchema';
// UTILS
import { zodParseResult } from '../../utils/zod-parse';

export const useFetchWeatherForecastQuery = (coordinates: CoordinatesWeatherApi | null) => {
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { showSnackbar } = useSnackbar();

  return useQuery<WeatherForecastResponseData, AxiosError>({
    queryKey: ['forecast-city', { lon: coordinates?.lon!, lat: coordinates?.lat! }],
    queryFn: async () => {
      showSpinner();
      try {
        const response = await weatherApiService.getFiveDaysHourlyWeather({
          lon: coordinates?.lon!,
          lat: coordinates?.lat!,
        });
        return zodParseResult(response.data, WeatherForecastSchema);
      } catch (err) {
        showSnackbar('Failed to load forecast!', 'error');
      } finally {
        hideSpinner();
      }
    },
  });
};
