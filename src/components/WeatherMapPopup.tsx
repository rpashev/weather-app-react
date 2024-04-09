type PropsStype = {
  lat: number;
  lon: number;
  city: string;
};

export const WeatherMapPopup = ({ lat, lon, city }: PropsStype) => {
  return <div>{`${city} - ${lat} ${lon}`}</div>;
};
