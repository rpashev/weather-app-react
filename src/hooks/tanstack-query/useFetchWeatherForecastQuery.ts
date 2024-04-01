import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import { CoordinatesWeatherApi } from '../../common/types';
import { zodParseResult } from '../../utils/zod-parse';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbar } from '../../context/snackbar-context';
import {
  WeatherForecastSchema,
  WeatherForecastResponseData,
} from '../../schemas/WeatherForecastSchema';

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
