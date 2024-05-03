import React, { createContext, useState, useContext, useEffect } from 'react';
import { type LanguageMapType } from '../common/languages/en';
import { en, de, ru, bg, fr, es, cn } from '../common/languages/index.ts';
const languageMaps: { [key: string]: LanguageMapType } = { en, de, ru, cn, bg, fr, es };

type SettingsStateType = {
  language: string;
  theme: 'dark' | 'light';
  units: 'metric' | 'imperial';
  userLocation?: { latitude: number; longitude: number };
};
type SettingsContextType = {
  settings: SettingsStateType;
  toggleDarkMode: () => void;
  onChangeUnits: (val: boolean) => void;
  onChangeLanguage: (val: string) => void;
  translations?: LanguageMapType;
};

const initialContext: SettingsContextType = {
  settings: {
    language: 'en',
    theme: 'dark',
    units: 'metric',
  },
  toggleDarkMode: () => {},
  onChangeUnits: () => {},
  onChangeLanguage: () => {},
  translations: languageMaps.en,
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

  const onChangeLanguage = (val: string) => {
    setSettingsState((prevState) => {
      return { ...prevState, language: val };
    });
  };

  const onChangeUnits = (val: boolean) => {
    setSettingsState((prevState) => {
      return { ...prevState, units: val ? 'metric' : 'imperial' };
    });
  };

  const value = {
    settings: settingsState,
    translations: languageMaps[settingsState.language],
    toggleDarkMode,
    onChangeLanguage,
    onChangeUnits,
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
