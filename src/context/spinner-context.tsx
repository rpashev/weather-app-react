import { createContext, useContext, useState } from 'react';
import { Spinner } from '../components/UI/Spinner';
import { Backdrop } from '../components/UI/Backdrop';

type SpinnerContextType = {
  showSpinner: () => void;
  hideSpinner: () => void;
};

const SpinnerContext = createContext<SpinnerContextType>({
  showSpinner: () => {},
  hideSpinner: () => {},
});

export const useSpinnerContext = () => {
  return useContext(SpinnerContext);
};

type SpinnerProviderProps = {
  children: React.ReactNode;
};
export const SpinnerProvider = ({ children }: SpinnerProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);

  const hide = () => setIsLoading(false);

  const value: SpinnerContextType = {
    showSpinner: show,
    hideSpinner: hide,
  };

  return (
    <SpinnerContext.Provider value={value}>
      {children}
      {isLoading && (
        <>
          <Backdrop />
          <Spinner />
        </>
      )}
    </SpinnerContext.Provider>
  );
};
