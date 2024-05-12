// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbarContext } from '../../context/snackbar-context';
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
import { useSettingsContext } from '../../context/settings-context';

export const useFetchWeatherForecastQuery = (coordinates: CoordinatesWeatherApi | null) => {
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { showSnackbar } = useSnackbarContext();
  const { translations } = useSettingsContext();

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
        showSnackbar(translations?.messages.errForecast!, 'error');
      } finally {
        hideSpinner();
      }
    },
  });
};
