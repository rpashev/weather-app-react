export type linkTitleType = 'Login' | 'Home' | 'Sign Up' | 'Logout' | 'Map' | 'Settings';
export type LanguageMapType = {
  linkTitles: {
    Login: string;
    Home: string;
    ['Sign Up']: string;
    Logout: string;
    Map: string;
    Settings: string;
  };
  pages: {
    login: {
      [key: string]: string;
    };
    home: {
      titleTracked: string;
      searchPlaceholder: string;
      noResultsLabel: string;
      noTrackedLocationsLabel: string;
    };
    signUp: {
      [key: string]: string;
    };
    settings: {
      title: string;
      units: string;
      lang: string;
      darMode: string;
      detectBtn: string;
      changeLoc: string;
    };
    map: {
      legTemp: string;
      legWind: string;
      legPrecip: string;
      legPressure: string;
      legClouds: string;
      checkbox: string;
      filtClouds: string;
      filtWind: string;
    };
  };
  locCard: {
    details: string;
    feelsLike: string;
    wind: string;
    humidity: string;
    sunrise: string;
    sunset: string;
    addTooltip: string;
    removeTooltip: string;
  };
  detDialog: {
    title: string;
    feelsLike: string;
    wind: string;
    precipitation: string;
    maxTemp: string;
    minTemp: string;
    avgTemp: string;
    weather: string;
    filtWind: string;
    filtPrecipitation: string;
    filtTemp: string;
    closeBtn: string;
    chartWind: string;
    chartTemp: string;
    chartRain: string;
  };
};
export const en: LanguageMapType = Object.freeze({
  linkTitles: {
    Login: 'Login',
    Home: 'Home',
    ['Sign Up']: 'Sign Up',
    Logout: 'Logout',
    Map: 'Map',
    Settings: 'Settings',
  },
  pages: {
    login: {
      title: 'Login',
    },
    signUp: {
      title: 'Sign Up',
    },
    home: {
      titleTracked: 'Tracked locations',
      searchPlaceholder: 'Search location...',
      noResultsLabel: 'No results found!',
      noTrackedLocationsLabel: 'No tracked locations yet.',
    },
    settings: {
      title: 'Settings',
      units: 'Imperial units',
      lang: 'Language',
      darMode: 'Dark mode',
      detectBtn: 'Detect location',
      changeLoc: 'Change location',
    },
    map: {
      legTemp: 'Temperature',
      legWind: 'Wind speed',
      legPrecip: 'Precipitation',
      legPressure: 'Pressure',
      legClouds: 'Clouds in',
      filtClouds: 'Clouds',
      filtWind: 'Wind',
      checkbox: 'Show tracked locations',
    },
  },
  locCard: {
    details: 'Details',
    feelsLike: 'Feels like',
    wind: 'Wind',
    humidity: 'Humidity',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    addTooltip: 'Add to tracked locations',
    removeTooltip: 'Remove from tracked locations',
  },
  detDialog: {
    title: 'Weather for',
    feelsLike: 'Feels like',
    wind: 'Wind',
    precipitation: 'Precipitation',
    maxTemp: 'Max Temp',
    minTemp: 'Min Temp',
    avgTemp: 'Avg Temp',
    weather: 'Weather',
    filtWind: 'Wind',
    filtPrecipitation: 'Precipitation',
    filtTemp: 'Temperature',
    closeBtn: 'Close',
    chartWind: 'Wind measured in m/s',
    chartTemp: 'Temperature measured in Celsius',
    chartRain: 'Probability of rainfall in %',
  },
});
