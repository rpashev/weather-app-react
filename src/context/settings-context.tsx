import React, { createContext, useState, useContext, useEffect } from 'react';

type SettingsStateType = {
  language: string;
  theme: 'dark' | 'light';
  units: 'metric' | 'imperial';
  userLocation?: { latitude: number; longitude: number };
};
type SettingsContextType = {
  settings: SettingsStateType;
  toggleDarkMode: () => void;
};

const initialContext: SettingsContextType = {
  settings: {
    language: 'en',
    theme: 'dark',
    units: 'metric',
  },
  toggleDarkMode: () => {},
};

const getInitialSettingsState = (): SettingsStateType => {
  let settingsStateFromLocalStorage = localStorage.getItem('settings');
  let settingsState = settingsStateFromLocalStorage
    ? JSON.parse(settingsStateFromLocalStorage)
    : initialContext.settings;

  return settingsState;
};

const SettingsContext = createContext<SettingsContextType>(initialContext);

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
type SettingsProviderProps = {
  children: React.ReactNode;
};
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settingsState, setSettingsState] = useState<SettingsStateType>(getInitialSettingsState());

  const toggleDarkMode = () => {
    setSettingsState((prevState) => {
      return { ...prevState, theme: prevState.theme === 'dark' ? 'light' : 'dark' };
    });
  };

  const value = {
    settings: settingsState,
    toggleDarkMode,
  };

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settingsState));
    if (settingsState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settingsState]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
