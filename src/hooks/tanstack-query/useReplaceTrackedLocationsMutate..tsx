// HOOKS
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
// SERVICES
import locationsService from '../../services/locations.service';
// TYPES
import { type AxiosResponse, type AxiosError } from 'axios';
import { type ApiErrorResponse } from '../../common/types';
import { useSettingsContext } from '../../context/settings-context';

export const useReplaceTrackedLocationsMutate = () => {
  const { showSnackbar } = useSnackbarContext();
  const { translations } = useSettingsContext();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<{ message: string }>, AxiosError, { locations: string[] }>({
    mutationFn: locationsService.replaceTrackedLocations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
      showSnackbar(translations?.messages.successReplaceLocations!, 'success');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || translations?.messages.errReplaceLocations!, 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
