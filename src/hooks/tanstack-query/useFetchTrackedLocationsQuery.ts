// HOOKS
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../context/user-context';
import { useSpinnerContext } from '../../context/spinner-context';
import { useSnackbarContext } from '../../context/snackbar-context';
// TYPES & SCHEMAS
import { type AxiosError } from 'axios';
import {
  TrackedLocationListSchema,
  type TrackedLocationsType,
} from '../../schemas/TrackedLocationsSchema';
import { type ApiErrorResponse } from '../../common/types';
// SERVICES
import locationsService from '../../services/locations.service';
// UTILS
import { zodParseResult } from '../../utils/zod-parse';

export const useFetchTrackedLocationsQuery = () => {
  const { isLoggedIn } = useAuthContext();
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { showSnackbar } = useSnackbarContext();

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
