import { Outlet } from 'react-router-dom';
import { BaseHeader } from '../components/layout/BaseHeader';
import { BaseFooter } from '../components/layout/BaseFooter';
import { useState, useEffect } from 'react';
import weatherApiService from '../services/weather-api.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from '../context/snackbar-context';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: Coordinates;
};

export const BaseLayout = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const { showSnackbar } = useSnackbar();

  const { data: localCityData, refetch: fetchLocalCityData } = useQuery<any, AxiosError>({
    queryKey: ['local-data', { lon: userLocation?.longitude!, lat: userLocation?.latitude! }],
    queryFn: () =>
      weatherApiService.getCurrentWeather({
        lon: userLocation?.longitude!,
        lat: userLocation?.latitude!,
      }),
    enabled: false,
  });

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
          setUserLocation(JSON.parse(savedLocation));
          return;
        }
        const position = await new Promise<Position>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { coords } = position;

        localStorage.setItem(
          'userLocation',
          JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude })
        );
        setUserLocation(coords);
      } catch (error) {
        showSnackbar('Error getting location!', 'error');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchLocalCityData();
    }
  }, [userLocation]);
  return (
    <div className="flex min-h-screen flex-col items-center bg-cyan-800">
      <BaseHeader />
      {localCityData && <p>{localCityData.data?.main?.temp} local</p>}

      <main className="max-container flex flex-1 justify-center">
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  );
};
