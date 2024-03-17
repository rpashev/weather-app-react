import { useMutation } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { LoginResponseData, ApiErrorResponse, RegisterInputData } from '../../common/types';
import authService from '../../services/auth.service';
import { useSnackbar } from '../../context/snackbar-context';
import { useAuth } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useSpinnerContext } from '../../context/spinner-context';

export const useRegisterMutate = () => {
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  return useMutation<AxiosResponse<LoginResponseData>, AxiosError, RegisterInputData>({
    mutationFn: authService.register,
    onSuccess: (res: AxiosResponse<LoginResponseData>) => {
      login(res.data.token, res.data.userId);
      showSnackbar('Succesfully registered', 'success');
      navigate('/');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || 'Could not log in!', 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
