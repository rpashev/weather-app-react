import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import weatherApiService from '../../services/weather-api.service';
import { CoordinatesWeatherApi } from '../../common/types';
import { WeatherSchema, BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';
import { zodParseResult } from '../../utils/zod-parse';

export const useFetchCityDataQuery = (coordinates: CoordinatesWeatherApi | null) => {
  return useQuery<BaseWeatherResponseData, AxiosError>({
    queryKey: ['selected-city', { lon: coordinates?.lon!, lat: coordinates?.lat! }],
    queryFn: async () => {
      const response = await weatherApiService.getCurrentWeather({
        lon: coordinates?.lon!,
        lat: coordinates?.lat!,
      });
      return zodParseResult(response.data, WeatherSchema);
    },
    // enabled: false,
  });
};
