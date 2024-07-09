// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
// SERVICES
import weatherApiService from '../../services/weather-api.service';
// TYPES & SCHEMAS
import { WeatherSchema, type BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';
import { type CoordinatesWeatherApi } from '../../common/types';
import { type AxiosError } from 'axios';
// UTILS
import { zodParseResult } from '../../utils/zod-parse';
import { useSettingsContext } from '../../context/settings-context';

export const useFetchCityDataQuery = (
  coordinates: CoordinatesWeatherApi | null,
  enabled = true
) => {
  const { showSnackbar } = useSnackbarContext();
  const { translations, settings } = useSettingsContext();

  return useQuery<BaseWeatherResponseData, AxiosError>({
    queryKey: ['selected-city', { lon: coordinates?.lon!, lat: coordinates?.lat! }],
    queryFn: async () => {
      try {
        const response = await weatherApiService.getCurrentWeather(
          {
            lon: coordinates?.lon!,
            lat: coordinates?.lat!,
          },
          settings.units
        );
        return zodParseResult(response.data, WeatherSchema);
      } catch (err) {
        showSnackbar(translations?.messages.errLoadCity!, 'error');
      } finally {
      }
    },
    enabled,
  });
};
