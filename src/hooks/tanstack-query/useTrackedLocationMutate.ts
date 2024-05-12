// HOOKS
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
// SERVICES
import locationsService from '../../services/locations.service';
// TYPES
import { type AxiosResponse, type AxiosError } from 'axios';
import {
  type ApiErrorResponse,
  type TrackedLocationInputData,
  type TrackedLocationResponseData,
} from '../../common/types';
import { useSettingsContext } from '../../context/settings-context';

export const useTrackedLocationMutate = () => {
  const { showSnackbar } = useSnackbarContext();
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { translations } = useSettingsContext();

  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<TrackedLocationResponseData>,
    AxiosError,
    TrackedLocationInputData
  >({
    mutationFn: locationsService.saveTrackedLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
      showSnackbar(translations?.messages.successAddLocation!, 'success');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || translations?.messages.errAddLocation!, 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
