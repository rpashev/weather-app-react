// REACT
import { useState } from 'react';
import { createPortal } from 'react-dom';
// HOOKS
import { useFetchCityDataQuery } from '../hooks/tanstack-query/useFetchCityDataQuery';
// COMPONENTS
import { Tooltip } from './UI/Tooltip';
import { WeatherDetailsDialog } from './WeatherDetailsDialog';
// LEAFLET
import { useMap } from 'react-leaflet';
// UTILS
import { formatTimezoneOffset, formatUnixTimestamp } from '../utils/formatters';

type PropsType = {
  coords: { lon: number; lat: number };
};
export const WeatherLocationMapPopup = ({ coords }: PropsType) => {
  const map = useMap();
  const { data: weatherData } = useFetchCityDataQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });

  const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);
  const [disableParentTooltip, setDisableParentTooltip] = useState(false);
  const toggleParentTooltip = () => {
    console.log(disableParentTooltip);
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
      <Tooltip content="View details" disable={disableParentTooltip}>
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
            <div className="w-16 h-auto">
              <img
                className="w-full h-full object-cover"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              />
            </div>
          </div>
          <div className="bg-white flex items-start gap-10 px-2 flex-1 rounded-b">
            <div
              style={{ fontFamily: 'Arial' }}
              className="text-3xl font-bold tracking-tight w-2/5 mt-6"
            >
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="w-3/5 mt-1">
              <label className="font-bold w-full border-b-2 border-gray-400 block mt-2 mb-1">
                Details
              </label>
              <ul className="text-[11px] pb-2 flex flex-col">
                <li className="flex justify-between items-end">
                  <label>Feels like</label>
                  <label className="font-bold text-[12px]">
                    {Math.round(weatherData.main.feels_like)}°C
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Wind</label>
                  <label className="font-bold text-[12px]">
                    {Math.round(weatherData.wind.speed)}m/s
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Humidity</label>
                  <label className="font-bold text-[12px]">{weatherData.main.humidity}%</label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Sunrise</label>
                  <label className="font-bold text-[12px]">
                    {formatUnixTimestamp(weatherData.sys?.sunrise, weatherData.timezone, true)}
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Sunset</label>
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
            <Tooltip content="Close popup">
              <button
                className="px-1 py-0 font-extrabold text-md text-slate-600 enabled:hover:bg-amber-300 transition-all"
                onClick={onClosePopup}
                onMouseEnter={toggleParentTooltip}
                onMouseLeave={toggleParentTooltip}
              >
                &#10005;
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
