import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/user-context';
import { useSnackbarContext } from '../context/snackbar-context';

export const Logout = () => {
  const { showSnackbar: show } = useSnackbarContext();
  const { logout } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
    show('You logged out successfully!', 'success');
  }, []);

  return null;
};
