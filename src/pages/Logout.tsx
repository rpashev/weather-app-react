import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/user-context';
import { useSnackbarContext } from '../context/snackbar-context';
import { useSettingsContext } from '../context/settings-context';

export const Logout = () => {
  const { showSnackbar: show } = useSnackbarContext();
  const { logout } = useAuthContext();
  const { translations } = useSettingsContext();

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
    show(translations?.messages.successLogout!, 'success');
  }, []);

  return null;
};
