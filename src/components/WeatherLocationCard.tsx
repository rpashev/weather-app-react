// REACT
import { useState } from 'react';
// HOOKS
import { useAuthContext } from '../context/user-context';
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
import { useTrackedLocationMutate } from '../hooks/tanstack-query/useTrackedLocationMutate';
import { useDeleteTrackedLocationMutate } from '../hooks/tanstack-query/useDeleteTrackedLocationMutate';
// COMPONENTS
import { Tooltip } from './UI/Tooltip';
import { WeatherDetailsDialog } from './WeatherDetailsDialog';
// UTILS
import { formatTimezoneOffset, formatUnixTimestamp } from '../utils/formatters';
import { useSettingsContext } from '../context/settings-context';

type WeatherLocationCardProps = {
  coords: { lon: number; lat: number };
  id?: string;
  locationAlreadyTracked?: boolean;
};
export const WeatherLocationCard = ({
  coords,
  id,
  locationAlreadyTracked,
}: WeatherLocationCardProps) => {
  const { isLoggedIn } = useAuthContext();
  const { translations } = useSettingsContext();

  const { data: weatherData } = useFetchCityDataQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });
  const { mutate: saveLocation } = useTrackedLocationMutate();
  const { mutate: deleteLocation } = useDeleteTrackedLocationMutate();

  const [disableParentTooltip, setDisableParentTooltip] = useState(false);
  const toggleParentTooltip = () => {
    setDisableParentTooltip((prev) => !prev);
  };

  const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);
  const openDetailsDialog = () => {
    console.log('dialog');
    setDetailsDialogIsOpen(true);
  };

  if (!weatherData) return;

  const onAddLocation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let data = {
      lat: coords.lat,
      lon: coords.lon,
      country: weatherData.sys.country,
      city: weatherData.name,
    };
    saveLocation(data);
  };

  const onDeleteLocation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteLocation(id!);
  };

  return (
    <>
      <Tooltip content={translations?.locCard.viewDet!} disable={disableParentTooltip}>
        <li
          onClick={openDetailsDialog}
          className="mx-auto w-80 min-h-64 max-w-[90%] sm:max-w-full shadow-md rounded relative cursor-pointer cursor-pointer-children hover:translate-y-[-8px] transition-all duration-200"
        >
          <div className="rounded-t flex justify-between items-center min-h-20 px-4 tw-gradient-main">
            <div className="flex flex-col py-4">
              <h2 className="text-2xl font-bold">{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
              <label className="text-sm text-gray-700 font-medium">
                {weatherData.weather[0].description}
              </label>
            </div>
            <div className="w-32 h-auto">
              <img
                className="w-full h-full object-cover"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              />
            </div>
          </div>
          <div className="bg-white min-h-36 flex items-center gap-10 px-4">
            <div
              style={{ fontFamily: 'Arial' }}
              className="text-6xl font-bold tracking-[-5px] w-1/2"
            >
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="w-1/2">
              <label className="font-bold w-full border-b-2 border-gray-400 block mt-2 mb-1">
                {translations?.locCard?.details}
              </label>
              <ul className="text-xs pb-2 flex flex-col gap-[4px]">
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard?.feelsLike}</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(weatherData.main.feels_like)}°C
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>{translations?.locCard?.wind}</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(weatherData.wind.speed)}m/s
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>{translations?.locCard?.humidity}</label>
                  <label className="font-bold text-[13px]">{weatherData.main.humidity}%</label>
                </li>
                <li className="flex justify-between items-end">
                  <label>{translations?.locCard?.sunrise}</label>
                  <label className="font-bold text-[13px]">
                    {formatUnixTimestamp(weatherData.sys?.sunrise, weatherData.timezone, true)}
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>{translations?.locCard?.sunset}</label>
                  <label className="font-bold text-[13px]">
                    {formatUnixTimestamp(weatherData.sys?.sunset, weatherData.timezone, true)}
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-b text-xs h-8 tw-gradient-main flex justify-end items-center p-2">
            <label className="text-[12px]">
              {formatUnixTimestamp(weatherData.dt, weatherData.timezone)}, &nbsp;
              {formatTimezoneOffset(weatherData.timezone)}
            </label>
          </div>
          {isLoggedIn && (
            <div className="absolute top-0 right-0">
              {!id && !locationAlreadyTracked && (
                <Tooltip content={translations!.locCard?.addTooltip}>
                  <button
                    onMouseEnter={toggleParentTooltip}
                    onMouseLeave={toggleParentTooltip}
                    onClick={onAddLocation}
                    className="px-1 py-0 font-semibold text-2xl enabled:hover:bg-amber-300 transition-all"
                  >
                    +
                  </button>
                </Tooltip>
              )}
              {id && (
                <Tooltip content={translations!.locCard?.removeTooltip}>
                  <button
                    className="px-1 py-0 font-extrabold text-md text-red-600 enabled:hover:bg-amber-300 transition-all"
                    onMouseEnter={toggleParentTooltip}
                    onMouseLeave={toggleParentTooltip}
                    onClick={onDeleteLocation}
                  >
                    &#10005;
                  </button>
                </Tooltip>
              )}
            </div>
          )}
        </li>
      </Tooltip>
      {detailsDialogIsOpen && (
        <WeatherDetailsDialog
          coords={coords}
          setDetailsDialogIsOpen={setDetailsDialogIsOpen}
          currentWeatherData={weatherData}
        />
      )}
    </>
  );
};
