import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/user-context';
import { useSnackbar } from '../context/snackbar-context';

export const Logout = () => {
  const { showSnackbar: show } = useSnackbar();
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
    show('You logged out successfully!', 'success');
  }, []);

  return null;
};
