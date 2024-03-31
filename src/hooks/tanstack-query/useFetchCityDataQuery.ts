import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import { CoordinatesWeatherApi } from '../../common/types';
import { WeatherSchema, BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';
import { zodParseResult } from '../../utils/zod-parse';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbar } from '../../context/snackbar-context';

export const useFetchCityDataQuery = (
  coordinates: CoordinatesWeatherApi | null,
  enabled = true
) => {
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { showSnackbar } = useSnackbar();

  return useQuery<BaseWeatherResponseData, AxiosError>({
    queryKey: ['selected-city', { lon: coordinates?.lon!, lat: coordinates?.lat! }],
    queryFn: async () => {
      showSpinner();
      try {
        const response = await weatherApiService.getCurrentWeather({
          lon: coordinates?.lon!,
          lat: coordinates?.lat!,
        });
        return zodParseResult(response.data, WeatherSchema);
      } catch (err) {
        showSnackbar('Failed to load city!', 'error');
      } finally {
        hideSpinner();
      }
    },
    enabled,
  });
};
