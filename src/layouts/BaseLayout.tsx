import { Outlet } from 'react-router-dom';
import { BaseHeader } from '../components/layout/BaseHeader';
import { BaseFooter } from '../components/layout/BaseFooter';
import { useState, useEffect } from 'react';
import { useSnackbar } from '../context/snackbar-context';
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
import { useSpinnerContext } from '../context/spinner-context';

type CoordinatesGeoBrowser = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: CoordinatesGeoBrowser;
};

export const BaseLayout = () => {
  const [userLocation, setUserLocation] = useState<CoordinatesGeoBrowser | null>(null);

  const { showSnackbar } = useSnackbar();
  const { hideSpinner, showSpinner } = useSpinnerContext();

  const { data: localCityData, refetch: fetchLocalCityData } = useFetchCityDataQuery({
    lon: userLocation?.longitude!,
    lat: userLocation?.latitude!,
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
      showSpinner();
      fetchLocalCityData().finally(() => hideSpinner());
    }
  }, [userLocation]);
  return (
    <div className="flex min-h-screen flex-col items-center bg-cyan-800">
      <BaseHeader />
      {localCityData && <p>{localCityData.main?.temp} local</p>}

      <main className="max-container flex flex-1 justify-center">
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  );
};
