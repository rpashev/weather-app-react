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

export const useDeleteTrackedLocationMutate = () => {
  const { showSnackbar } = useSnackbarContext();
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { translations } = useSettingsContext();

  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<null>, AxiosError, string>({
    mutationFn: locationsService.deleteTrackedLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
      showSnackbar(translations?.messages.successRemoveLocaion!, 'success');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || translations?.messages.errRemoveLocation!, 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
