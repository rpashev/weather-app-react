import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from '../../common/types';
import { useSnackbar } from '../../context/snackbar-context';
import { useSpinnerContext } from '../../context/spinner-context';
import locationsService from '../../services/locations.service';

export const useDeleteTrackedLocationMutate = () => {
  const { showSnackbar } = useSnackbar();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<null>, AxiosError, string>({
    mutationFn: locationsService.deleteTrackedLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-tracked-locations'] });
      showSnackbar('Successfully removed location.', 'success');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || 'Could not remove location!', 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
