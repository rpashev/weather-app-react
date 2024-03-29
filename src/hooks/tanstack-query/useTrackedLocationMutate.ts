import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import {
  ApiErrorResponse,
  TrackedLocationInputData,
  TrackedLocationResponseData,
} from '../../common/types';
import { useSnackbar } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
import locationsService from '../../services/locations.service';

export const useTrackedLocationMutate = () => {
  const { showSnackbar } = useSnackbar();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<TrackedLocationResponseData>,
    AxiosError,
    TrackedLocationInputData
  >({
    mutationFn: locationsService.saveTrackedLocation,
    onSuccess: () => {
      showSnackbar('Successfully added location', 'success');
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || 'Could not add location!', 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
