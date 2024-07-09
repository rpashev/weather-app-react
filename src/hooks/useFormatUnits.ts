import { useSettingsContext } from '../context/settings-context';

export const useFormatUnits = () => {
  const { settings } = useSettingsContext();
  return {
    tempUnits: settings.units === 'metric' ? '°C' : '°F',
    speedUnits: settings.units === 'metric' ? 'm/s' : 'mph',
  };
};
