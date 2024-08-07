// REACT
import { useState } from 'react';
import { createPortal } from 'react-dom';
// HOOKS
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
import { useFormatUnits } from '../hooks/useFormatUnits';
// COMPONENTS
import { Tooltip } from './UI/Tooltip';
import { WeatherDetailsDialog } from './WeatherDetailsDialog';
import { XMarkIcon } from '@heroicons/react/16/solid';
// LEAFLET
import { useMap } from 'react-leaflet';
// UTILS
import { formatTimezoneOffset, formatUnixTimestamp } from '../utils/formatters';
import { useSettingsContext } from '../context/settings-context';

type PropsType = {
  coords: { lon: number; lat: number };
};
export const WeatherLocationMapPopup = ({ coords }: PropsType) => {
  const { translations } = useSettingsContext();
  const { tempUnits, speedUnits } = useFormatUnits();

  const map = useMap();
  const { data: weatherData } = useFetchCityDataQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });

  const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);
  const [disableParentTooltip, setDisableParentTooltip] = useState(false);
  const toggleParentTooltip = () => {
    setDisableParentTooltip((prev) => !prev);
  };

  const openDetailsDialog = () => {
    setDetailsDialogIsOpen(true);
  };

  const onClosePopup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    map.closePopup();
  };

  if (!weatherData) return;

  return (
    <>
      <Tooltip content={translations?.locCard.viewDet!} disable={disableParentTooltip}>
        <li
          onClick={openDetailsDialog}
          className="mx-auto w-60 min-h-44 max-w-[90%] sm:max-w-full shadow-lg rounded relative cursor-pointer cursor-pointer-children flex-col flex"
        >
          <div className="popup-arrow"></div>
          <div className="rounded-t flex justify-between items-center min-h-10 px-2 tw-gradient-main">
            <div className="flex flex-col py-2">
              <h2 className="text-md font-bold">{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
              <label className="text-xs text-gray-700 font-medium">
                {weatherData.weather[0].description}
              </label>
            </div>
            <div className="w-16 h-auto" onClick={openDetailsDialog}>
              <img
                className="w-full h-full object-cover"
                onClick={openDetailsDialog}
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              />
            </div>
          </div>
          <div className="bg-white flex items-start gap-10 px-2 flex-1 rounded-b">
            <div
              style={{ fontFamily: 'Arial' }}
              className="text-3xl font-bold tracking-tight w-1/3 mt-6"
            >
              {Math.round(weatherData.main.temp)}
              {tempUnits}
            </div>
            <div className="w-2/3 mt-1">
              <label className="font-bold w-full border-b-2 border-gray-400 block mt-2 mb-1">
                {translations?.locCard.details}
              </label>
              <ul className="text-[11px] pb-2 flex flex-col">
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard.feelsLike}</label>
                  <label className="font-bold text-[12px]">
                    {Math.round(weatherData.main.feels_like)}
                    {tempUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard.wind}</label>
                  <label className="font-bold text-[12px]">
                    {Math.round(weatherData.wind.speed)}
                    {speedUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard.humidity}</label>
                  <label className="font-bold text-[12px]">{weatherData.main.humidity}%</label>
                </li>
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard.sunrise}</label>
                  <label className="font-bold text-[12px]">
                    {formatUnixTimestamp(weatherData.sys?.sunrise, weatherData.timezone, true)}
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label> {translations?.locCard.sunset}</label>
                  <label className="font-bold text-[12px]">
                    {formatUnixTimestamp(weatherData.sys?.sunset, weatherData.timezone, true)}
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 rounded-b text-xs flex p-2">
            <label className="text-[10px] flex flex-col gap-0">
              <span>{formatUnixTimestamp(weatherData.dt, weatherData.timezone)},</span>
              <span>{formatTimezoneOffset(weatherData.timezone)}</span>
            </label>
          </div>
          <div className="absolute top-0 right-0">
            <Tooltip content={translations?.locCard.closePopup!} positionClasses="right-0">
              <button
                className="enabled:hover:bg-amber-300 transition-all"
                onClick={onClosePopup}
                onMouseEnter={toggleParentTooltip}
                onMouseLeave={toggleParentTooltip}
              >
                <XMarkIcon className="w-5 text-slate-800" />
              </button>
            </Tooltip>
          </div>
        </li>
      </Tooltip>
      {detailsDialogIsOpen &&
        createPortal(
          <WeatherDetailsDialog
            coords={coords}
            setDetailsDialogIsOpen={setDetailsDialogIsOpen}
            currentWeatherData={weatherData}
          />,
          document.body
        )}
    </>
  );
};
