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
      title: string;
      email: string;
      password: string;
      errorEmail: string;
      errorPassword: string;
      submitBtn: string;
    };
    home: {
      titleTracked: string;
      searchPlaceholder: string;
      noResultsLabel: string;
      noTrackedLocationsLabel: string;
    };
    signUp: {
      title: string;
      email: string;
      password: string;
      repPassword: string;
      errorEmail: string;
      errorPassword: string;
      errorRepPassword: string;
      submitBtn: string;
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
    closePopup: string;
    viewDet: string;
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
  weatherLocEditDialog: {
    title: string;
    hint: string;
    submitBtn: string;
    close: string;
    removeTooltip: string;
  };
  messages: {
    successRegister: string;
    errRegister: string;
    successLogin: string;
    errLogin: string;
    successReplaceLocations: string;
    errReplaceLocations: string;
    successAddLocation: string;
    errAddLocation: string;
    errForecast: string;
    errFetchLocations: string;
    errLoadList: string;
    errLoadCity: string;
    successRemoveLocaion: string;
    errRemoveLocation: string;
    successLogout: string;
    errGeoPermission: string;
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
      email: 'Email',
      password: 'Password',
      errorEmail: 'Please enter a valid email!',
      errorPassword: 'Password should be at least 6 symbols!',
      submitBtn: 'Submit',
    },
    signUp: {
      title: 'Sign Up',
      email: 'email',
      password: 'password',
      errorEmail: 'Please enter a valid email!',
      errorPassword: 'Password should be at least 6 symbols!',
      repPassword: 'Repeat password',
      errorRepPassword: 'Passwords should match!',
      submitBtn: 'Submit',
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
    closePopup: 'Close popup',
    viewDet: 'View details',
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
  weatherLocEditDialog: {
    title: 'Your tracked locations',
    hint: '* Drag & drop to change locations order',
    submitBtn: 'Submit',
    close: 'Close',
    removeTooltip: 'Remove from tracked locations',
  },
  messages: {
    successRegister: 'Succesfully registered',
    errRegister: 'Could not register!',
    successLogin: 'Succesfully logged in',
    errLogin: 'Could not log in!',
    successReplaceLocations: 'Succesfully saved locations.',
    errReplaceLocations: 'Could not save locations!',
    successAddLocation: 'Successfully added location',
    errAddLocation: 'Could not add location!',
    errForecast: 'Failed to load forecast!',
    errFetchLocations: 'Could not fetch locations!',
    errLoadList: 'Failed to load list!',
    errLoadCity: 'Failed to load city!',
    successRemoveLocaion: 'Successfully removed location.',
    errRemoveLocation: 'Could not remove location!',
    successLogout: 'You logged out successfully!',
    errGeoPermission:
      'User denied Geolocation! You can reset the permission from the icon left of the URL.',
  },
});
