// REACT
import { useEffect, useState } from 'react';
// HOOKS
import { useFetchWeatherForecastQuery } from '../hooks/tanstack-query/useFetchWeatherForecastQuery';
// COMPONENTS
import { Backdrop } from './UI/Backdrop';
import { LineChart } from './UI/LineChart';
// TYPES
import { type HourlyForecastType } from '../schemas/WeatherForecastSchema';
import { type WeatherChartFilterType } from '../common/types';
import { type BaseWeatherResponseData } from '../schemas/BaseWeatherSchema';
// UTILS
import { formatUnixTimestamp, getDateFromTimezone } from '../utils/formatters';
import { calculateDailyForecast } from '../utils/format-weather-forcast-data';

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
        className="overflow-y-auto flex flex-col tw-fixed-center bg-red w-[850px] max-w-[95%] h-[780px] mx-auto"
        style={{ zIndex: 3000 }}
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
        <div className="flex  justify-between items-center flex-wrap gap-5 px-6">
          <div className="flex items-center flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <div className="w-24 h-auto">
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
              <div style={{ fontFamily: 'Arial' }} className="text-5xl tracking-tight font-bold">
                {activeTimestamp &&
                  Math.round(dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.temp)}
                {!activeTimestamp && Math.round(dailyForecastData[activeDay]?.maxTemp || 0)}
                °C
              </div>
            </div>
            {activeTimestamp && (
              <ul className="text-xs pb-2 flex flex-col gap-[4px]">
                <li className="flex justify-between items-end gap-6">
                  <label>Feels like</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(
                      Math.round(
                        dailyForecastData[activeDay]?.hourlyData[activeTimestamp]?.main?.feels_like
                      )
                    )}
                    °C
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Wind</label>
                  <label className="font-bold text-[13px]">
                    {Math.round(
                      dailyForecastData[activeDay]?.hourlyData[activeTimestamp].wind.speed
                    )}
                    m/s
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Precipitation</label>
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
              <ul className="text-xs pb-2 flex flex-col gap-[4px]">
                <li className="flex justify-between items-end">
                  <label>Max Temp</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.maxTemp}
                    °C
                  </label>
                </li>
                <li className="flex justify-between items-end">
                  <label>Min Temp</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.minTemp}
                    °C
                  </label>
                </li>
                <li className="flex justify-between items-end gap-6">
                  <label>Avg Temp</label>
                  <label className="font-bold text-[13px]">
                    {dailyForecastData[activeDay]?.avgTemp}
                    °C
                  </label>
                </li>
              </ul>
            )}
          </div>

          <div className="min-w-32">
            <h2 className="text-xl">Weather</h2>
            <div>{`${dailyForecastData[activeDay]?.day} ${(activeTimestamp && formatUnixTimestamp(dailyForecastData[activeDay].hourlyData[activeTimestamp].dt, 0, true)) || ''}`}</div>

            <div>
              {!activeTimestamp && dailyForecastData[activeDay]?.avgDescription}
              {activeTimestamp &&
                dailyForecastData[activeDay].hourlyData[activeTimestamp].weather[0].description}
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-6 mx-auto flex-wrap">
          <div
            onClick={() => setActiveFilter('Temp')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Temp' && 'bg-slate-200'}`}
          >
            Temperature
          </div>
          <div
            onClick={() => setActiveFilter('Wind')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Wind' && 'bg-slate-200'}`}
          >
            Wind
          </div>
          <div
            onClick={() => setActiveFilter('Rain')}
            className={`flex flex-col
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeFilter === 'Rain' && 'bg-slate-200'}`}
          >
            Precipitation
          </div>
        </div>

        {getdefaultActiveHourlyChartData() && (
          <LineChart datasetValues={getdefaultActiveHourlyChartData()} mode={activeFilter} />
        )}

        <div className="flex justify-between flex-col gap-10 px-6 mt-6">
          <div className="flex items-center justify-between gap-10 flex-wrap">
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
                   items-center rounded
                   hover:bg-slate-200 cursor-pointer p-2 transition-all ${activeTimestamp === timestamp && 'bg-slate-200'}`}
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
                   hover:bg-slate-200 cursor-pointer p-2 transition-all rounded ${activeDay === date && 'bg-slate-200'}`}
                  onClick={() => onClickDay(date)}
                >
                  <div>{dailyForecastData[date].day.substring(0, 3)}</div>
                  <div className="w-24 h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://openweathermap.org/img/wn/${dailyForecastData[date].mostCommonIcon}@2x.png`}
                    />
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">
                      {dailyForecastData[date].maxTemp}°
                    </span>
                    <span> | </span>
                    <span className="text-blue-600 font-semibold">
                      {dailyForecastData[date].minTemp}°
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
