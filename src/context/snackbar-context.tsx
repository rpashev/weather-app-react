import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { Snackbar } from '../components/UI/Snackbar';

type SnackbarMode = 'warning' | 'success' | 'error';

type SnackbarContextType = {
  showSnackbar: (message: string, mode: SnackbarMode) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

type SnackbarProviderProps = {
  children: React.ReactNode;
};
export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarMode, setSnackbarMode] = useState<SnackbarMode>('success');
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const show = (message: string, mode: SnackbarMode) => {
    setSnackbarMessage(message);
    setSnackbarMode(mode);
    setShowSnackbar(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar: show }}>
      {children}
      {showSnackbar && <Snackbar message={snackbarMessage} mode={snackbarMode} />}
    </SnackbarContext.Provider>
  );
};
