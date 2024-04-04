import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
import { Backdrop } from './UI/Backdrop';
import { calculateDailyForecast } from '../utils/format-weather-forcast-data';
import { BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';
import { useEffect, useState } from 'react';
import { formatUnixTimestamp, getDateFromTimezone } from '../utils/formatters';

type PropsType = {
  setDetailsDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { lon: number; lat: number };
  currentWeatherData: BaseWeatherResponseData;
};
export const WeatherDetailsDialog = ({
  setDetailsDialogIsOpen,
  coords,
  currentWeatherData,
}: PropsType) => {
  const closeDialog = () => setDetailsDialogIsOpen(false);

  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  const { data: weatherForecastData } = useFetchWeatherForecastQuery({
    lon: coords?.lon!,
    lat: coords?.lat!,
  });

  const onClickDay = (date: string) => {
    setActiveDay(date);
    setActiveTimestamp(null);
  };
  useEffect(() => {
    if (weatherForecastData) {
      setActiveDay(
        getDateFromTimezone(weatherForecastData.list[0].dt, currentWeatherData.timezone)
      );
    }
  }, [weatherForecastData]);

  if (!weatherForecastData || !activeDay) return;

  const dailyForecastData = calculateDailyForecast(
    weatherForecastData.list,
    weatherForecastData.city.timezone
  );

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog
        open
        className="z-50 flex flex-col tw-fixed-center bg-red w-[900px] max-w-[95%] h-[700px] mx-auto "
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
        <div className="flex justify-between gap-5 px-6">
          {/* <div>left - first timestamp temp, icon + details(wind, feels like, pop)</div> */}
          <div className="flex gap-2 items-center">
            <div className="w-24 h-auto">
              {!activeTimestamp && (
                <img
                  className="w-full h-full object-cover"
                  src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay]?.mostCommonIconDay}@2x.png`}
                />
              )}
              {activeTimestamp && (
                <img
                  className="w-full h-full object-cover"
                  src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay].hourlyData[activeTimestamp]?.weather[0].icon}@2x.png`}
                />
              )}
            </div>
            <div style={{ fontFamily: 'Arial' }} className="text-5xl tracking-tight font-bold">
              {activeTimestamp &&
                Math.round(dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.temp)}
              {!activeTimestamp && Math.round(dailyForecastData[activeDay]?.avgTempDay || 0)}
              °C
            </div>
          </div>
          <div>
            <h2 className="text-xl">Weather</h2>
            <div>{`${dailyForecastData[activeDay]?.day} ${(activeTimestamp && formatUnixTimestamp(dailyForecastData[activeDay].hourlyData[activeTimestamp].dt, 0, true)) || ''}`}</div>

            <div>
              {!activeTimestamp && dailyForecastData[activeDay]?.avgDescriptionDay}
              {activeTimestamp &&
                dailyForecastData[activeDay].hourlyData[activeTimestamp].weather[0].description}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between gap-5">
          clickable graph with hourly temperatures and timestamps - on click changes upper section.
          Maybe toggle graph for wind
        </div>
        <div className="flex justify-between gap-5">
          list of clickable 5 days with min/max day/night, dayname and icon. On click it changes
          data above
        </div> */}
        <div className="flex justify-between flex-col gap-10 px-6 mt-6">
          <div className="flex items-center gap-10">
            {Object.keys(dailyForecastData[activeDay]?.hourlyData)?.map((timestamp) => {
              return (
                <div
                  key={timestamp}
                  onClick={() => setActiveTimestamp(timestamp)}
                  className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
                >
                  {formatUnixTimestamp(+timestamp, 0, true)}
                </div>
              );
            })}
          </div>
          <div className="flex gap-6">
            {Object.keys(dailyForecastData).map((date) => {
              return (
                <div
                  key={date}
                  className={`flex flex-col
                   items-center 
                   hover:bg-slate-200 cursor-pointer p-2 transition-all rounded ${activeDay === date && 'bg-slate-200'}`}
                  onClick={() => onClickDay(date)}
                >
                  <div>{dailyForecastData[date].day.substring(0, 3)}</div>
                  <div className="w-24 h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://openweathermap.org/img/wn/${dailyForecastData[date].mostCommonIconDay}@2x.png`}
                    />
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">
                      {dailyForecastData[date].maxTempDay}°
                    </span>
                    <span> | </span>
                    <span className="text-blue-600 font-semibold">
                      {dailyForecastData[date].minTempNight}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
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
