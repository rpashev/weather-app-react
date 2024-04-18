import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import { WeatherMapLayerType } from '../common/types';

import { useEffect } from 'react';
import L, { LatLngBounds, Icon, divIcon, DivIconOptions, point, DivIcon } from 'leaflet';

import { WeatherLocationMapPopup } from './WeatherLocationMapPopup';
import { TrackedLocationsType } from '../schemas/TrackedLocationsSchema';
import MarkerClusterGroup from 'react-leaflet-cluster';

const markersDataHardocedList = [
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
  locations?: TrackedLocationsType;
  showOnlyTrackedLocations: boolean;
};

const defaultIcon = new Icon({
  iconUrl: '/location-pin-svgrepo-com.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

const createClusterCustomIcon = (cluster: any): DivIcon => {
  const iconOptions: DivIconOptions = {
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    iconSize: point(33, 33, true),
  };
  return divIcon(iconOptions);
};

export const WeatherMapComponent = ({
  weatherLayer,
  locations,
  showOnlyTrackedLocations,
}: MapProps) => {
  const markersData = showOnlyTrackedLocations ? locations?.locations : markersDataHardocedList;

  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      map.setMaxBounds(initialBounds);
    }, [map]);

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

  const initialBounds = new LatLngBounds(
    [-90, -180], // Southwest coordinates
    [90, 180] // Northeast coordinates
  );
  console.log('here');
  if (!weatherLayer) return;

  return (
    <MapContainer
      center={[45, 45]}
      zoom={2.5}
      minZoom={2.5}
      style={{ height: '100%', width: '100%' }}
      bounds={initialBounds}
      boundsOptions={{ padding: [50, 50] }}
      maxBoundsViscosity={1}
      crs={L.CRS.EPSG3857}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={18}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/${getLayerName(weatherLayer)}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
        attribution='Weather data © <a href="https://openweathermap.org">OpenWeatherMap</a>'
        maxZoom={18}
      />
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {markersData?.map(({ lat, lon, city, country }) => (
          <Marker key={city} position={[lat, lon]} icon={defaultIcon}>
            <Tooltip direction="top" offset={[0, -32]}>{`${city}, ${country}`}</Tooltip>
            <Popup className="w-60 z-50" autoPan autoPanPaddingTopLeft={[0, 50]}>
              <ul className="w-full">
                <WeatherLocationMapPopup coords={{ lat, lon }} />
              </ul>
            </Popup>
            ,
          </Marker>
        ))}
      </MarkerClusterGroup>

      <MapController />
    </MapContainer>
  );
};
