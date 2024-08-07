// REACT
import { useEffect, useState } from 'react';
// HOOKS
import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
import { useFormatUnits } from '../hooks/useFormatUnits';
// COMPONENTS
import { Backdrop } from './UI/Backdrop';
import { LineChart } from './UI/LineChart';
import { XMarkIcon } from '@heroicons/react/16/solid';
// TYPES
import { type HourlyForecastType } from '../schemas/WeatherForecastSchema';
import { type WeatherChartFilterType } from '../common/types';
import { type BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';
// UTILS
import { formatUnixTimestamp, getDateFromTimezone } from '../utils/formatters';
import { calculateDailyForecast } from '../utils/format-weather-forcast-data';
import { useSettingsContext } from '../context/settings-context';

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
  const { translations } = useSettingsContext();
  const { tempUnits, speedUnits } = useFormatUnits();

  const closeDialog = () => setDetailsDialogIsOpen(false);

  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<WeatherChartFilterType>('Temp');

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
      let defaultActiveDay = getDateFromTimezone(
        weatherForecastData.list[0].dt,
        currentWeatherData.timezone
      );
      setActiveDay(defaultActiveDay);
    }
  }, [weatherForecastData]);

  if (!weatherForecastData || !activeDay) return;

  const dailyForecastData = calculateDailyForecast(
    weatherForecastData.list,
    weatherForecastData.city.timezone
  );

  let dateKeys = Object.keys(dailyForecastData);

  const mapFilteredHourlyDataForChart = (
    data: HourlyForecastType,
    filter: WeatherChartFilterType
  ) => {
    if (filter === 'Temp') {
      return Math.round(data.main.temp);
    }
    if (filter === 'Rain') {
      return Math.round(data.pop * 100);
    }
    if (filter === 'Wind') {
      return Math.round(data.wind.speed);
    }
  };

  const getdefaultActiveHourlyChartData = () => {
    let defaultActiveHourlyChartData = Object.values(dailyForecastData[activeDay]?.hourlyData).map(
      (data) => mapFilteredHourlyDataForChart(data, activeFilter)
    );

    if (defaultActiveHourlyChartData.length !== 8) {
      defaultActiveHourlyChartData = defaultActiveHourlyChartData.concat(
        Object.values(dailyForecastData[dateKeys[1]]?.hourlyData)
          .map((data) => mapFilteredHourlyDataForChart(data, activeFilter))
          .slice(0, 8 - defaultActiveHourlyChartData.length)
      );
    }

    return defaultActiveHourlyChartData;
  };

  const getAdditionalTimestampsFromNextDay = () => {
    if (Object.keys(dailyForecastData[activeDay]?.hourlyData).length !== 8) {
      return Object.keys(dailyForecastData[dateKeys[1]]?.hourlyData)?.slice(
        0,
        8 - Object.keys(dailyForecastData[activeDay]?.hourlyData).length
      );
    }
    return;
  };

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog
        open
        className=" flex flex-col sm:tw-fixed-center fixed top-0 w-[850px] max-w-[100%] sm:max-w-[95%] md:h-[780px] h-screen  overflow-y-auto"
        style={{ zIndex: 3000 }}
      >
        <header className="relative flex justify-between items-center tw-gradient-main py-3 px-4 pr-1 text-xl font-bold">
          <h2>
            {translations?.detDialog.title}{' '}
            {`${currentWeatherData.name}, ${currentWeatherData.sys.country}`}
          </h2>
          <button className="enabled:hover:bg-amber-300 transition-all" onClick={closeDialog}>
            <XMarkIcon className="w-9 text-slate-800" />
          </button>
        </header>
        <div className="flex  justify-between items-center flex-wrap gap-5 px-2 md:px-6">
          <div className="flex items-center flex-wrap gap-6  justify-between w-full md:w-auto pr-2 md:pr-none">
            <div className="flex md:gap-2 gap-1 items-center">
              <div className="md:w-24 w-16 h-auto">
                {!activeTimestamp && (
                  <img
                    className="w-full h-full object-cover"
                    src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay]?.mostCommonIcon}@2x.png`}
                  />
                )}
                {activeTimestamp && (
                  <img
                    className="w-full h-full object-cover"
                    src={`https://openweathermap.org/img/wn/${dailyForecastData[activeDay].hourlyData[activeTimestamp]?.weather[0].icon}@2x.png`}
                  />
                )}
              </div>
              <div
                style={{ fontFamily: 'Arial' }}
                className="md:text-5xl text-3xl tracking-tight font-bold"
              >
                {activeTimestamp &&
                  Math.round(dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.temp)}
                {!activeTimestamp && Math.round(dailyForecastData[activeDay]?.maxTemp || 0)}
                {tempUnits}
              </div>
            </div>
            {activeTimestamp && (
              <ul className="text-xs pb-2 pt-2 md:pt-none flex flex-col gap-[4px]">
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.feelsLike}</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(
                      Math.round(
                        dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.feels_like
                      )
                    )}
                    {tempUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.wind}</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(
                      dailyForecastData[activeDay]?.hourlyData[activeTimestamp].wind.speed
                    )}
                    {speedUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.precipitation}</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(
                      dailyForecastData[activeDay]?.hourlyData[activeTimestamp].pop * 100
                    )}
                    %
                  </label>
                </li>
              </ul>
            )}

            {!activeTimestamp && (
              <ul className="text-xs pb-2 pt-2 md:pt-none flex flex-col gap-[4px]">
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.maxTemp}</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.maxTemp}
                    {tempUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.minTemp}</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.minTemp}
                    {tempUnits}
                  </label>
                </li>
                <li className="flex justify-between items-end gap-4">
                  <label>{translations?.detDialog.avgTemp}</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.avgTemp}
                    {tempUnits}
                  </label>
                </li>
              </ul>
            )}
          </div>

          <div className="min-w-32 mb-4 md:mb-none pl-4 md:pl-none">
            <h2 className="md:text-xl text-md">{translations?.detDialog.weather}</h2>
            <div className="md:text-md text-xs">{`${dailyForecastData[activeDay]?.day} ${(activeTimestamp && formatUnixTimestamp(dailyForecastData[activeDay].hourlyData[activeTimestamp].dt, 0, true)) || ''}`}</div>

            <div className="md:text-md text-xs">
              {!activeTimestamp && dailyForecastData[activeDay]?.avgDescription}
              {activeTimestamp &&
                dailyForecastData[activeDay].hourlyData[activeTimestamp].weather[0].description}
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 md:px-6 px-3 mx-auto flex-wrap text-sm md:text-md">
          <div
            onClick={() => setActiveFilter('Temp')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Temp' && 'bg-slate-200'}`}
          >
            {translations?.detDialog.filtTemp}
          </div>
          <div
            onClick={() => setActiveFilter('Wind')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Wind' && 'bg-slate-200'}`}
          >
            {translations?.detDialog.wind}
          </div>
          <div
            onClick={() => setActiveFilter('Rain')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Rain' && 'bg-slate-200'}`}
          >
            {translations?.detDialog.precipitation}
          </div>
        </div>

        {getdefaultActiveHourlyChartData() && (
          <LineChart datasetValues={getdefaultActiveHourlyChartData()} mode={activeFilter} />
        )}

        <div className="flex justify-between flex-col gap-10 md:px-6 px-4 mt-6">
          <div className="flex items-center justify-between md:gap-6 lg:gap-10 flex-wrap">
            {Object.keys(dailyForecastData[activeDay]?.hourlyData)?.map((timestamp) => {
              return (
                <div
                  key={timestamp}
                  onClick={() => setActiveTimestamp(timestamp)}
                  className={`flex flex-col
                   items-center rounded text-[10px] sm:text-sm
                   hover:bg-slate-200 cursor-pointer p-1 sm:p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
                >
                  {formatUnixTimestamp(+timestamp, 0, true)}
                </div>
              );
            })}
            {getAdditionalTimestampsFromNextDay() &&
              getAdditionalTimestampsFromNextDay()
                ?.slice(0, 8 - Object.keys(dailyForecastData[activeDay]?.hourlyData).length)
                .map((timestamp) => {
                  return (
                    <div
                      key={timestamp}
                      onClick={() => {
                        setActiveTimestamp(timestamp);
                        setActiveDay(dateKeys[1]);
                      }}
                      className={`flex flex-col
                   items-center rounded text-[10px] sm:text-sm
                   hover:bg-slate-200 cursor-pointer p-1 sm:p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
                    >
                      {formatUnixTimestamp(+timestamp, 0, true)}
                    </div>
                  );
                })}
          </div>
          <div className="flex justify-between flex-wrap">
            {Object.keys(dailyForecastData).map((date) => {
              return (
                <div
                  key={date}
                  className={`flex flex-col
                   items-center 
                   hover:bg-slate-200 cursor-pointer mb-8 md:mb-none p-1 md:p-2 transition-all rounded ${activeDay === date && 'bg-slate-200'}`}
                  onClick={() => onClickDay(date)}
                >
                  <div>{dailyForecastData[date].day.substring(0, 3)}</div>
                  <div className="md:w-24 w-12 h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://openweathermap.org/img/wn/${dailyForecastData[date].mostCommonIcon}@2x.png`}
                    />
                  </div>
                  <div>
                    <span className="text-red-600 text-sm md:text-md font-semibold">
                      {dailyForecastData[date].maxTemp}
                      {tempUnits}
                    </span>
                    <span> | </span>
                    <span className="text-blue-600 text-sm md:text-md font-semibold">
                      {dailyForecastData[date].minTemp}
                      {tempUnits}
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
            {translations?.detDialog.closeBtn}
          </button>
        </div>
      </dialog>
    </>
  );
};
