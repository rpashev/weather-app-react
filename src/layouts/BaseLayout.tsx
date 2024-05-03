// REACT
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
// COMPONENTS
import { BaseHeader } from '../components/layout/BaseHeader';
import { BaseFooter } from '../components/layout/BaseFooter';
// HOOKS
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
import { useSpinnerContext } from '../context/spinner-context';
import { useSettingsContext } from '../context/settings-context';

export const BaseLayout = () => {
  const { hideSpinner, showSpinner } = useSpinnerContext();
  const { settings } = useSettingsContext();
  const { data: localCityData, refetch: fetchLocalCityData } = useFetchCityDataQuery(
    {
      lon: settings?.userLocation?.longitude!,
      lat: settings?.userLocation?.latitude!,
    },
    false
  );

  useEffect(() => {
    if (settings.userLocation) {
      showSpinner();
      fetchLocalCityData().finally(() => hideSpinner());
    }
  }, [settings.userLocation]);
  return (
    <div className="flex min-h-screen flex-col items-center dark:bg-slate-600 bg-white">
      <BaseHeader localCityData={localCityData || null} />
      <main className="w-full flex flex-1 justify-center">
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  );
};
