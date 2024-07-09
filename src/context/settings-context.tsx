import React, { createContext, useState, useContext, useEffect } from 'react';
import { type LanguageMapType } from '../common/languages/en';
import { en, de, ru, bg, fr, es, cn, hi } from '../common/languages/index.ts';
import { useSnackbarContext } from './snackbar-context.tsx';

const languageMaps: { [key: string]: LanguageMapType } = { en, de, ru, cn, bg, fr, es, hi };

type SettingsStateType = {
  language: string;
  theme: 'dark' | 'light';
  units: 'metric' | 'imperial';
  userLocation?: { latitude: number; longitude: number };
};
type SettingsContextType = {
  settings: SettingsStateType;
  translations?: LanguageMapType;
  toggleDarkMode: () => void;
  onChangeUnits: (val: boolean) => void;
  onChangeLanguage: (val: string) => void;
  getUserLocation: () => void;
};

type SettingsProviderProps = {
  children: React.ReactNode;
};

type CoordinatesGeoBrowser = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: CoordinatesGeoBrowser;
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
  getUserLocation: () => {},
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

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settingsState, setSettingsState] = useState<SettingsStateType>(getInitialSettingsState());
  const { showSnackbar } = useSnackbarContext();

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
      return { ...prevState, units: val ? 'imperial' : 'metric' };
    });
  };

  const getUserLocation = async () => {
    try {
      let permissions = await navigator.permissions.query({ name: 'geolocation' });
      if (permissions.state === 'denied') {
        return showSnackbar(
          languageMaps[settingsState.language].messages.errGeoPermission,
          'error'
        );
      }
      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { coords } = position;

      setSettingsState((prevState) => {
        return {
          ...prevState,
          userLocation: { latitude: coords.latitude, longitude: coords.longitude },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    settings: settingsState,
    translations: languageMaps[settingsState.language],
    toggleDarkMode,
    onChangeLanguage,
    onChangeUnits,
    getUserLocation,
  };

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settingsState));
    if (settingsState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settingsState]);

  useEffect(() => {
    getUserLocation();
  }, []);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
