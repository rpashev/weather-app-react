import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
import { Backdrop } from './UI/Backdrop';
import { calculateDailyForecast } from '../utils/format-weather-forcast-data';
import { BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';

type WeatherDetailsDialogProps = {
  setDetailsDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { lon: number; lat: number };
  currentWeatherData: BaseWeatherResponseData;
};
export const WeatherDetailsDialog = ({
  setDetailsDialogIsOpen,
  coords,
  currentWeatherData,
}: WeatherDetailsDialogProps) => {
  const closeDialog = () => setDetailsDialogIsOpen(false);

  const { data: weatherForecastData } = useFetchWeatherForecastQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });
  if (!weatherForecastData) return;

  const dailyForecastData = calculateDailyForecast(weatherForecastData.list);
  console.log(dailyForecastData);
  console.log(currentWeatherData);

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog
        open
        className="z-50 flex flex-col tw-fixed-center bg-red w-[900px] h-[500px] mx-auto "
      >
        <header className="relative flex justify-between items-center tw-gradient-main py-3 px-4 text-xl font-bold">
          <h2>Weather for {`${currentWeatherData.name}, ${currentWeatherData.sys.country}`}</h2>
          <button
            className="px-1 py-0 font-extrabold text-2xl text-grey-600 enabled:hover:bg-amber-300 transition-all"
            onClick={closeDialog}
          >
            &#10005;
          </button>
        </header>
        <div className="flex justify-between gap-5">
          <div>left - first timestamp temp, icon + details(wind, feels like, pop)</div>
          <div>
            right - 'Weather' title, day name + local timestamp if hourly below, description below{' '}
          </div>
        </div>
        <div className="flex justify-between gap-5">
          clickable graph with hourly temperatures and timestamps - on click changes upper section.
          Maybe toggle graph for wind
        </div>
        <div className="flex justify-between gap-5">
          list of clickable 5 days with min/max day/night, dayname and icon. On click it changes
          data above
        </div>

        <div className="flex justify-end items-center mt-auto px-4 py-3">
          <button
            className="bg-slate-200 hover:bg-slate-300 transition-all text-slate-600 px-4 py-2 rounded"
            onClick={closeDialog}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};
