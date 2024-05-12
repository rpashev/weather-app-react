// HOOKS
import { useMutation } from '@tanstack/react-query';
import { useSnackbarContext } from '../../context/snackbar-context';
import { useAuthContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useSpinnerContext } from '../../context/spinner-context';
// SERVICES
import authService from '../../services/auth.service';
// TYPES
import { type AxiosResponse, type AxiosError } from 'axios';
import {
  type LoginResponseData,
  type ApiErrorResponse,
  type RegisterInputData,
} from '../../common/types';
import { useSettingsContext } from '../../context/settings-context';

export const useRegisterMutate = () => {
  const { login } = useAuthContext();
  const { showSnackbar } = useSnackbarContext();
  const { translations } = useSettingsContext();
  const navigate = useNavigate();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  return useMutation<AxiosResponse<LoginResponseData>, AxiosError, RegisterInputData>({
    mutationFn: authService.register,
    onSuccess: (res: AxiosResponse<LoginResponseData>) => {
      login(res.data.token, res.data.userId);
      showSnackbar(translations?.messages.successRegister!, 'success');
      navigate('/');
    },
    onError: (error) => {
      let err = error.response?.data as ApiErrorResponse;
      showSnackbar(err?.message || translations?.messages.errRegister!, 'error');
    },
    onMutate: () => {
      showSpinner();
    },
    onSettled: () => {
      hideSpinner();
    },
  });
};
