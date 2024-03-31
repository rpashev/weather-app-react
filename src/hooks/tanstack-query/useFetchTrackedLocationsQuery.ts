import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { zodParseResult } from '../../utils/zod-parse';
import locationsService from '../../services/locations.service';
import {
  TrackedLocationListSchema,
  TrackedLocationsType,
} from '../../schemas/TrackedLocationsSchema';
import { useAuth } from '../../context/user-context';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbar } from '../../context/snackbar-context';
import { ApiErrorResponse } from '../../common/types';

export const useFetchTrackedLocationsQuery = () => {
  const { isLoggedIn } = useAuth();
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { showSnackbar } = useSnackbar();

  return useQuery<TrackedLocationsType, AxiosError>({
    queryKey: ['fetch-tracked-locations'],
    queryFn: async () => {
      showSpinner();
      try {
        const response = await locationsService.getTrackedLocations();
        return zodParseResult(response.data, TrackedLocationListSchema);
      } catch (error: any) {
        let err = error.response?.data as ApiErrorResponse;
        showSnackbar(err?.message || 'Could not fetch locations!', 'error');
      } finally {
        hideSpinner();
      }
    },
    enabled: isLoggedIn,
  });
};
