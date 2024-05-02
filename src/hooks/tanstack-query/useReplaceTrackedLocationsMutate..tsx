// HOOKS
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
// SERVICES
import locationsService from '../../services/locations.service';
// TYPES
import { type AxiosResponse, type AxiosError } from 'axios';
import { type ApiErrorResponse } from '../../common/types';

export const useReplaceTrackedLocationsMutate = () => {
  const { showSnackbar } = useSnackbarContext();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<{ message: string }>, AxiosError, { locations: string[] }>({
    mutationFn: locationsService.replaceTrackedLocations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
      showSnackbar('Succesfully saved locations.', 'success');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || 'Could not save locations!', 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
