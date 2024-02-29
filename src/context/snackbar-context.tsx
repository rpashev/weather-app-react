import React, { createContext, useState, useContext } from 'react';
import { Snackbar } from '../components/UI/Snackbar';

type SnackbarMode = 'warning' | 'success' | 'error';

type SnackbarContextType = {
  show: (message: string, mode: SnackbarMode) => void;
};

// Create the Snackbar context
const SnackbarContext = createContext<SnackbarContextType>({
  show: () => {},
});

// Custom hook to access the Snackbar context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
// Snackbar provider component
type SnackbarProviderProps = {
  children: React.ReactNode;
};
export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarMode, setSnackbarMode] = useState<SnackbarMode>('success');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const show = (message: string, mode: SnackbarMode) => {
    setSnackbarMessage(message);
    setSnackbarMode(mode);
    setShowSnackbar(true);

    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      {showSnackbar && <Snackbar message={snackbarMessage} mode={snackbarMode} />}
    </SnackbarContext.Provider>
  );
};
