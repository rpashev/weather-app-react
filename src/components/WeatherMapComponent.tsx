import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileImage from 'ol/source/TileImage';
import { transform } from 'ol/proj';
import { WeatherMapLayerType } from '../common/types';

type MapProps = {
  weatherLayer: WeatherMapLayerType;
};

export const WeatherMapComponent = ({ weatherLayer }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  console.log(weatherLayer);
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

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2,
      }),
    });

    const layerName = getLayerName(weatherLayer);

    map.addLayer(
      new TileLayer({
        source: new TileImage({
          url: `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
          crossOrigin: 'anonymous',
          wrapX: true,
        }),
      })
    );

    return () => {
      map.dispose();
    };
  }, [weatherLayer]);

  return <div ref={mapRef} className="h-full w-full"></div>;
};
