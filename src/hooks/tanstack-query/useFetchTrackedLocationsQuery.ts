import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodParseResult } from '../../utils/zod-parse';
import locationsService from '../../services/locations.service';
import {
  TrackedLocationListSchema,
  TrackedLocationsType,
} from '../../schemas/TrackedLocationsSchema';
import { useAuth } from '../../context/user-context';

export const useFetchTrackedLocationsQuery = () => {
  const { isLoggedIn } = useAuth();
  return useQuery<TrackedLocationsType, AxiosError>({
    queryKey: ['fetch-tracked-locations'],
    queryFn: async () => {
      const response = await locationsService.getTrackedLocations();
      return zodParseResult(response.data, TrackedLocationListSchema);
    },
    enabled: isLoggedIn,
  });
};
