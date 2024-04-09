import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { WeatherMapLayerType } from '../common/types';

import 'leaflet/dist/leaflet.css';
import { WeatherMapPopup } from './WeatherMapPopup';
import { useEffect } from 'react';

const markersData = [
  { lat: 35.6895, lon: 139.6917, city: 'Tokyo', country: 'JP' },
  { lat: 41.8781, lon: -87.6298, city: 'Chicago', country: 'US' },
  { lat: 40.7128, lon: -74.006, city: 'New York', country: 'US' },
  { lat: 51.5074, lon: -0.1278, city: 'London', country: 'GB' },
  { lat: 34.0522, lon: -118.2437, city: 'Los Angeles', country: 'US' },
  { lat: 48.8566, lon: 2.3522, city: 'Paris', country: 'FR' },
  { lat: 55.7558, lon: 37.6176, city: 'Moscow', country: 'RU' },
  { lat: 37.7749, lon: -122.4194, city: 'San Francisco', country: 'US' },
  { lat: 40.4168, lon: -3.7038, city: 'Madrid', country: 'ES' },
  { lat: 41.9028, lon: 12.4964, city: 'Rome', country: 'IT' },
  { lat: 52.52, lon: 13.405, city: 'Berlin', country: 'DE' },
  { lat: 28.6139, lon: 77.209, city: 'Delhi', country: 'IN' },
  { lat: 31.2304, lon: 121.4737, city: 'Shanghai', country: 'CN' },
  { lat: 22.3193, lon: 114.1694, city: 'Hong Kong', country: 'HK' },
  { lat: 37.5665, lon: 126.978, city: 'Seoul', country: 'KR' },
  { lat: 39.9042, lon: 116.4074, city: 'Beijing', country: 'CN' },
  { lat: 19.076, lon: 72.8777, city: 'Mumbai', country: 'IN' },
  { lat: 1.3521, lon: 103.8198, city: 'Singapore', country: 'SG' },
  { lat: 52.3676, lon: 4.9041, city: 'Amsterdam', country: 'NL' },
  { lat: 50.8503, lon: 4.3517, city: 'Brussels', country: 'BE' },
];

type MapProps = {
  weatherLayer: WeatherMapLayerType;
};

export const WeatherMapComponent = ({ weatherLayer }: MapProps) => {
  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      console.log('here');
      map.invalidateSize();
    }, [map]);
    // do something with map, in a useEffect hook, for example.

    return <></>;
  };

  const getLayerName = (layerType: string) => {
    switch (layerType) {
      case 'temp':
        return 'temp_new';
      case 'wind':
        return 'wind_new';
      case 'clouds':
        return 'clouds_new';
      case 'precipitation':
        return 'precipitation_new';
      case 'pressure':
        return 'pressure_new';
      default:
        return 'temp_new';
    }
  };

  if (!weatherLayer) return;

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      style={{ height: '100%', width: '100%' }}
      className="!w-full !h-full"
      dragging={false}
    >
      <TileLayer
        url={`https://tile.openweathermap.org/map/${getLayerName(weatherLayer)}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
        attribution='Weather data © <a href="https://openweathermap.org">OpenWeatherMap</a>'
        maxZoom={18}
        noWrap={true}
      />
      {markersData.map(({ lat, lon, city }) => (
        <Marker key={city} position={[lat, lon]}>
          <Popup>
            <WeatherMapPopup lon={lon} lat={lat} city={city} />
          </Popup>
        </Marker>
      ))}
      <MapController />
    </MapContainer>
  );
};
