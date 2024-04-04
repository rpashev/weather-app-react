import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from '../../common/types';
import { useSnackbar } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
import locationsService from '../../services/locations.service';

export const useReplaceTrackedLocationsMutate = () => {
  const { showSnackbar } = useSnackbar();
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