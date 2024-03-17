export type ApiErrorResponse = {
  message: string;
};

// auth
export type LoginInputData = {
  email: string;
  password: string;
};

export type RegisterInputData = {
  email: string;
  password: string;
  repeatPassword?: string;
  firstName: string;
  lastName: string;
};

export type LoginResponseData = {
  firstName: string;
  userId: string;
  token: string;
  journals: string[];
  email: string;
};

// locations

export type CityGeoData = {
  country: string;
  name: string;
  lat: number;
  lon: number;
  local_names: string[];
};

export type TrackedLocationInputData = {
  lat: number;
  lon: number;
  country: string;
  city: string;
};

export type TrackedLocationResponseData = TrackedLocationInputData & {
  id: string;
};

export type TrackedLocationsListResponseData = TrackedLocationResponseData[];

// weather components props
export type BaseSingleLocationWeather = TrackedLocationInputData & {
  time: string;
  id: number;
  feelsLike: number;
  humidity: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  wind: number;
  sunrise: string;
  sunset: string;
  descriptionWeather: string;
  weatherIcon: string;
};
