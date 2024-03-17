import { useMutation } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { LoginResponseData, LoginInputData, ApiErrorResponse } from '../../common/types';
import authService from '../../services/auth.service';
import { useSnackbar } from '../../context/snackbar-context';
import { useSpinner } from '../../context/spinner-context';
import { useAuth } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';

export const useLoginMutate = () => {
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { hideSpinner } = useSpinner();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<LoginResponseData>, AxiosError, LoginInputData>({
    mutationFn: authService.login,
    onSuccess: (res: AxiosResponse<LoginResponseData>) => {
      login(res.data.token, res.data.userId);
      showSnackbar('Succesfully logged in', 'success');
      navigate('/');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || 'Could not log in!', 'error');
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
